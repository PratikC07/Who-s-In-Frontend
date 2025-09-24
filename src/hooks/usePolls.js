import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getAllUserPolls,
  createPoll,
  closePoll,
  getPollForVoting,
  getPollResults, // We use this for the initial fetch for closed polls
  submitVote,
} from "../api/polls";

const baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

// =================================================================
// STANDARD QUERIES (for non-real-time data)
// =================================================================

/**
 * Hook to fetch all polls for the current user.
 * Used in DashboardPage for the initial list.
 */
export const useUserPolls = () => {
  return useQuery({
    queryKey: ["polls"],
    queryFn: getAllUserPolls,
    staleTime: 1000 * 60 * 2, // 2 minutes - shorter than default since poll lists change frequently
    cacheTime: 1000 * 60 * 10, // 10 minutes - shorter cache since this is main navigation data
    refetchOnWindowFocus: true, // Keep this for fresh data when returning to dashboard
    refetchOnMount: true, // Refetch when the component mounts

    retry: 2, // Retry more since this is critical navigation data
  });
};

/**
 * Hook to fetch a single poll for the voting page.
 * @param {string} pollId
 */
export const usePollForVoting = (pollId) => {
  return useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollForVoting(pollId),
    enabled: !!pollId,
    staleTime: 1000 * 30, // 30 seconds - very fresh for voting accuracy
    cacheTime: 1000 * 60 * 5, // 5 minutes - shorter cache since voting data changes often
    refetchOnWindowFocus: true, // Always get fresh data when user focuses to vote
    retry: 3, // Retry more aggressively since voting is critical
  });
};

/**
 * Hook to fetch the final, static results for a closed poll.
 * @param {string} pollId
 */
export const usePollResults = (pollId) => {
  return useQuery({
    queryKey: ["pollResults", pollId], // This key is now correctly associated with a query
    queryFn: () => getPollResults(pollId),
    enabled: !!pollId,
    staleTime: 1000 * 60 * 15, // 15 minutes - longer since closed poll results don't change
    cacheTime: 1000 * 60 * 60, // 1 hour - much longer cache for static results
    refetchOnWindowFocus: false, // Don't refetch closed poll results when window focus changes
    retry: 1, // Less aggressive retry since it's not time-sensitive
  });
};

// =================================================================
// REAL-TIME & HYBRID HOOKS
// =================================================================

/**
 * Intelligent hook for fetching poll results.
 * - If poll is active, it sets up a real-time SSE connection.
 * - If poll is closed, it performs a one-time fetch.
 * @param {string} pollId
 */
export const useRealtimePollResults = (pollId) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!pollId) {
      setState({
        data: null,
        isLoading: false,
        error: new Error("No poll ID provided."),
      });
      return;
    }

    let isActive = true;
    let eventSource;

    // Reset state and start loading on pollId change
    setState({ data: null, isLoading: true, error: null });

    getPollResults(pollId)
      .then((initialResults) => {
        if (!isActive) return;

        if (initialResults.status === "closed") {
          setState({ data: initialResults, isLoading: false, error: null });
          return;
        }

        // 3. If poll is OPEN, immediately place the fetched data into state.
        //    The UI can now render with this data while the SSE connection is established.
        setState({ data: initialResults, isLoading: true, error: null });

        eventSource = new EventSource(
          `${baseURL}/public/polls/${pollId}/results/stream`
        );

        // 5.The connection is open.
        eventSource.onopen = () => {
          if (isActive) {
            console.log("Connection is opened for useRealtimePollResults hook");
          }
        };

        eventSource.addEventListener("initialState", (event) => {
          if (!isActive) return;
          const parsedData = JSON.parse(event.data);
          console.log("Initial Data of useRealtimePollResults", parsedData);
          setState({ data: parsedData, isLoading: false, error: null });
        });

        eventSource.addEventListener("newVote", (event) => {
          if (!isActive) return;
          const newVote = JSON.parse(event.data);
          console.log("New Vote of useRealtimePollResults", newVote);
          setState((currentState) => {
            if (!currentState.data) return currentState;
            const updatedOptions = currentState.data.options.map((option) => {
              if (option.id === newVote.optionId) {
                return {
                  ...option,
                  votes: option.votes + 1,
                  voters: [...option.voters, { name: newVote.voterName }],
                };
              }
              return option;
            });
            return {
              ...currentState,
              data: { ...currentState.data, options: updatedOptions },
            };
          });
        });

        // Listen for poll closure events
        eventSource.addEventListener("pollClosed", (event) => {
          if (!isActive) return;
          const closedPollData = JSON.parse(event.data);
          console.log("Poll closed event received:", closedPollData);

          // Update state to reflect closed status - this will trigger redirect in PollResultPage
          if (closedPollData.pollId === pollId) {
            setState((currentState) => ({
              ...currentState,
              data: { ...currentState.data, status: "closed" },
            }));
          }
        });

        eventSource.onerror = (err) => {
          if (!isActive) return;
          console.error("EventSource failed:", err);
          setState({
            data: null,
            isLoading: false,
            error: new Error("Real-time connection failed."),
          });
          eventSource.close();
        };
      })
      .catch((err) => {
        if (isActive) {
          setState({ data: null, isLoading: false, error: err });
        }
      });

    return () => {
      isActive = false;
      if (eventSource) {
        eventSource.close();

        console.log("Closing the connection for useRealtimePollResults");
      }
    };
  }, [pollId]);

  return state;
};

/**
 * Hook to listen for vote count updates for ALL user polls.
 * This should be used ONCE in the DashboardPage.
 * It directly updates the TanStack Query cache.
 */
export const usePollsVoteUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // console.log("usePollsVoteUpdates");
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const eventSource = new EventSource(
      `${baseURL}/polls/updates?token=${token}`
    );
    // console.log("eventSource of usePollsVoteUpdates", eventSource);

    eventSource.addEventListener("voteCountUpdate", (event) => {
      const data = JSON.parse(event.data); // { pollId, totalVotes }
      console.log("voteCountUpdate", data);

      // Surgically update the 'polls' query cache
      queryClient.setQueryData(["polls"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((poll) =>
          poll.id === data.pollId
            ? { ...poll, totalVotes: data.totalVotes }
            : poll
        );
      });
    });

    eventSource.onerror = (err) => {
      console.error("Polls update EventSource failed:", err);
      eventSource.close();
    };

    // Cleanup on component unmount
    return () => {
      console.log("Closing the connection for usePollsVoteUpdates");
      eventSource.close();

      // Mark polls cache as stale since we're no longer getting live updates
      // This ensures fresh data when user returns to dashboard
      queryClient.invalidateQueries({ queryKey: ["polls"] });
    };
  }, [queryClient]);
};

// =================================================================
// MUTATIONS (Changing Data)
// =================================================================

/**
 * Hook to create a new poll.
 */
export const useCreatePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPoll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["polls"] });
    },
  });
};

/**
 * Hook to submit a vote.
 */
export const useSubmitVote = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitVote,
    onSuccess: () => {},
  });
};

/**
 * Hook to close a poll.
 */
export const useClosePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closePoll,
    onSuccess: (data, pollId) => {
      // Invalidate the polls list to show updated status
      queryClient.invalidateQueries({ queryKey: ["polls"] });

      // Invalidate the specific poll's result data to force fresh fetch
      queryClient.invalidateQueries({ queryKey: ["pollResults", pollId] });

      // Also invalidate any poll data for voting (in case user is on voting page)
      queryClient.invalidateQueries({ queryKey: ["poll", pollId] });

      // Optionally, remove all poll-related queries for this specific poll
      // This ensures any cached data for this poll is cleared
      queryClient.removeQueries({ queryKey: ["pollResults", pollId] });
      queryClient.removeQueries({ queryKey: ["poll", pollId] });
    },
  });
};
