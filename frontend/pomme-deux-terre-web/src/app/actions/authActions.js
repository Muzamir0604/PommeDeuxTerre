import { SET_AUTH } from "./types";
//Deprecated
export const setAuth = token => dispatch => {
  dispatch({
    type: SET_AUTH,
    payload: token
  });
};
