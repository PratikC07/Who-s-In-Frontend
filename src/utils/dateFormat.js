const formatDate = (isoString, options = {}) => {
  try {
    const defaultOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    };

    return new Date(isoString).toLocaleDateString("en-US", defaultOptions);
  } catch (error) {
    console.error("Invalid date: ", isoString);
    console.error("Error: ", error);
    return "Invalid Date";
  }
};

export default formatDate;
