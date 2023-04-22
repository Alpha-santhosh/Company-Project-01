import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { SET_REPO_DATA_SAGA } from "./Action";

const current = new Date();
let date = (current.getDate() - 1).toString();
let month = (current.getMonth() + 1).toString();
if (month.length <= 1) {
  month = "0" + (current.getMonth() + 1).toString();
}
let year = current.getFullYear().toString();

// const API_KEY = `https://api.github.com/search/repositories?q=created:>${year}-${month}-${date}&sort=stars&order=desc&page=1`;
// const token =
//   "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";
function* getGitData({ payload }) {
  console.log(payload);
  try {
    const gitData = yield call(
      axios.get,
      `https://api.github.com/search/repositories?q=created:>${year}-${month}-${date}&sort=stars&order=desc&page=${payload}`
    );
    yield put({
      type: "SET_REPO_DATA",
      payload: gitData.data.items,
    });
  } catch (error) {
    yield put({
      type: "SET_REPO_DATA",
      payload: error,
    });
  }
}

export default function* saga() {
  yield takeLatest(SET_REPO_DATA_SAGA, getGitData);
}
