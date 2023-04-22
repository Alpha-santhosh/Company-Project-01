import { combineReducers } from "redux";
import { setDataReducer } from "./setDataReducer";

const rootReducer = combineReducers({ setData: setDataReducer });

export default rootReducer;
