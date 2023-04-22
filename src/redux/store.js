import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const mySaga = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(mySaga));

mySaga.run(saga);

export default store;
