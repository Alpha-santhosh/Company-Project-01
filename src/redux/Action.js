export const SET_REPO_DATA_SAGA = "SET_REPO_DATA_SAGA";

export const getSagaData = (p) => {
  return {
    type: SET_REPO_DATA_SAGA,
    payload: p,
  };
};
