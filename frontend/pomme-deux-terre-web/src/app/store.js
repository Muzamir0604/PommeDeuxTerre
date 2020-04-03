import { compose, createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
// import thunk from "redux-thunk";

// Redux dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//TODO:  add blacklisted navigation
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,

  composeEnhancers(applyMiddleware(logger, thunkMiddleware))
  // applyMiddleware(logger, thunkMiddleware)
);
export const persistor = persistStore(store);
export default store;
