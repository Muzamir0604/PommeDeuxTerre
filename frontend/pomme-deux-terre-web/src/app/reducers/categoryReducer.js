import {
  FETCH_SHORTLIST_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  FETCH_SHORTLIST_FAILURE,
  FETCH_SHORTLIST_REQUEST,
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
} from "../actions/types";

const initialState = {
  shortList: [],
  categories: {},
  isLoading: false,
  error: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortList: action.payload,
      };
    case FETCH_SHORTLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_SHORTLIST_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default categoryReducer;
