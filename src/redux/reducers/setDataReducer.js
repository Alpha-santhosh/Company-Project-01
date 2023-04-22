export const setDataReducer = (state = 0, { type, payload }) => {
  switch (type) {
    case "SET_REPO_DATA":
      return (state = payload);
    default:
      return "No Data";
  }
};
