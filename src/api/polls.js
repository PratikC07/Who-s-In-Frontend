import apiClient from "./apiClient";

// =================================================================
// AUTHENTICATED ROUTES (for the user's own polls)
// =================================================================

/**
 * Fetches all polls for the logged-in user.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of poll objects.
 */
export const getAllUserPolls = async () => {
  console.log("Fetching all polls for the logged-in user");
  const data = await apiClient.get("/polls/");
  return data.polls; // The API returns { polls: [...] }
};

/**
 * Creates a new poll.
 * @param {{title: string, options: Array<string>}} pollData - The poll data.
 * @returns {Promise<object>} A promise that resolves to the new poll object.
 */
export const createPoll = async ({ title, options }) => {
  const data = await apiClient.post("/polls/", { title, options });
  return data; // The API returns the new poll object directly in the data property
};

/**
 * Closes a specific poll.
 * @param {string} pollId - The ID of the poll to close.
 * @returns {Promise<object>} A promise that resolves to the updated poll object.
 */
export const closePoll = async (pollId) => {
  const data = await apiClient.put(`/polls/${pollId}/close`);
  return data.poll; // The API returns { poll: {...} }
};

// =================================================================
// PUBLIC ROUTES (for voting and viewing results)
// =================================================================

/**
 * Fetches a poll's details for voting.
 * @param {string} pollId - The ID of the poll.
 * @returns {Promise<object>} A promise that resolves to the poll object with options.
 */
export const getPollForVoting = async (pollId) => {
  const data = await apiClient.get(`/public/polls/${pollId}`);
  return data.poll; // The API returns { poll: {...} }
};

/**
 * Fetches the final results for a closed poll.
 * @param {string} pollId - The ID of the poll.
 * @returns {Promise<object>} A promise that resolves to the poll results object.
 */
export const getPollResults = async (pollId) => {
  const data = await apiClient.get(`/public/polls/${pollId}/results`);
  return data.pollResults; // The API returns { pollResults: {...} }
};

/**
 * Submits a vote for a poll.
 * @param {{pollId: string, optionId: string, voterName: string}} voteData
 * @returns {Promise<object>} A promise that resolves to the created vote object.
 */
export const submitVote = async ({ pollId, optionId, voterName }) => {
  const data = await apiClient.post(`/public/polls/${pollId}/vote`, {
    optionId,
    voterName,
  });
  return data.vote; // The API returns { vote: {...} }
};
