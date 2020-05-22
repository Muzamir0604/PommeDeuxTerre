import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_USER_REQUEST,
  SET_USER_FAILURE,
  SET_USER_SUCCESS,
  RELEASE_USER
} from "../actions/types";

const initialState = {
  isLoading: false,
  user: {
    id: {},
    name: {},
    email: {}
  },
  error: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case FETCH_USERS_SUCCESS:
      return {
        isLoading: false,
        user: action.user,
        error: null
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case SET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case SET_USER_SUCCESS:
      return {
        isLoading: false,

        user: {
          ...state.user,
          name: action.user.name,
          email: action.user.email
        },
        error: null
      };
    case SET_USER_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case RELEASE_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default user;
