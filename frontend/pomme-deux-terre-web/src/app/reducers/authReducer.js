import { SET_AUTH } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        isAuthenticated: true,
        token: action.payload
      };
    default:
      return state;
  }
};

export default auth;
