import {
  CREATE_UPDATE_REVIEW_FAILURE,
  CREATE_UPDATE_REVIEW_REQUEST,
  CREATE_UPDATE_REVIEW_SUCCESS,
} from "../actions/types";

const initialState = {
  isLoading: false,
  data: [],
  error: [],
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_UPDATE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case CREATE_UPDATE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        data: action.data,
        error: null,
      };
    case CREATE_UPDATE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default user;
