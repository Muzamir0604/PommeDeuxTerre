import {
  FETCH_POST_SEARCH_SUCCESS,
  FETCH_POST_SEARCH_REQUEST,
  FETCH_POST_SEARCH_FAILURE,
} from "../actions/types";

const initialState = {
  isLoading: false,
  data: {},
  error: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_POST_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null,
      };
    case FETCH_POST_SEARCH_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default searchReducer;
