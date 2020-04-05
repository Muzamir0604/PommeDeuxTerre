import { FETCH_SHORTLIST_SUCCESS } from "../actions/types";

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
    default:
      return state;
  }
};

export default categoryReducer;
