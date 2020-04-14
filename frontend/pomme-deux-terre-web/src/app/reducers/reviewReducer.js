import {
  CREATE_UPDATE_REVIEW_FAILURE,
  CREATE_UPDATE_REVIEW_REQUEST,
  CREATE_UPDATE_REVIEW_SUCCESS,
  FETCH_USER_POST_REVIEW_SUCCESS,
  FETCH_USER_POST_REVIEW_REQUEST,
  FETCH_USER_POST_REVIEW_FAILURE,
} from "../actions/types";

const initialState = {
  isLoading: false,
  data: {
    stars: {},
    title: {},
    description: {},
  },
  error: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
      };
    case CREATE_UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case FETCH_USER_POST_REVIEW_SUCCESS:
      return {
        isLoading: false,
        data: action.data,
        error: null,
      };
    case FETCH_USER_POST_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_USER_POST_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reviewReducer;
