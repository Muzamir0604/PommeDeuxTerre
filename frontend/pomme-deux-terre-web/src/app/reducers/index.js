import { combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import reviewReducer from "./reviewReducer";
import searchReducer from "./searchReducer";

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  authReducer,
  categoryReducer,
  reviewReducer,
  searchReducer,
});
export default rootReducer;
