import { combineReducers } from "redux";

import userReducer from "./userReducer";
import mathReducer from "./mathReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  userReducer,
  mathReducer,
  postReducer,
  authReducer,
  categoryReducer,
});
export default rootReducer;
