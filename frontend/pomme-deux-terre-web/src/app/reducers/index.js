import { combineReducers } from "redux";

import userReducer from "./userReducer";
import mathReducer from "./mathReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  userReducer,
  mathReducer,
  postReducer
});
export default rootReducer;
