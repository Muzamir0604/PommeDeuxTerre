import { FETCH_SHORTLIST_SUCCESS, FETCH_CATEGORY } from "../actions/types";

const initialState = {
  shortList: {},
  categories: {},
  isLoading: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHORTLIST_SUCCESS:
      return {
        ...state,
        shortList: action.payload,
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
