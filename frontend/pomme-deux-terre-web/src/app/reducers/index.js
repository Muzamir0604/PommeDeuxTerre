import { combineReducers } from "redux";

import userReducer from "./userReducer";
import mathReducer from "./mathReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import reviewReducer from "./reviewReducer";

const rootReducer = combineReducers({
  userReducer,
  mathReducer,
  postReducer,
  authReducer,
  categoryReducer,
  reviewReducer,
});
export default rootReducer;
