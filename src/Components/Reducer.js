// rootReducer.js
import { combineReducers } from "redux";
import AppReducer from "./AppReducer";
import DataReducer from "./DataReducer";

const Reducer = combineReducers({
  app: AppReducer,
  items: DataReducer,
});

export default Reducer;
