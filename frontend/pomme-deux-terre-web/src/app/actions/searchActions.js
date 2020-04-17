import { getPostSearchApi } from "../api/search";
import { apiErrorHandler } from "../utils/errorhandler";

import {
  FETCH_POST_SEARCH_FAILURE,
  FETCH_POST_SEARCH_REQUEST,
  FETCH_POST_SEARCH_SUCCESS,
} from "../actions/types";

export const getPostSearch = (searchTerm) => (dispatch) => {
  dispatch(getPostSearchRequest());
  getPostSearchApi(searchTerm)
    .then((response) => {
      dispatch(getPostSearchSuccess(response));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(getPostSearchFailure(errorMessage));
    });
};
export const getPostSearchRequest = () => {
  return {
    type: FETCH_POST_SEARCH_REQUEST,
  };
};
export const getPostSearchSuccess = (data) => {
  return {
    type: FETCH_POST_SEARCH_SUCCESS,
    data: data,
  };
};
export const getPostSearchFailure = (error) => {
  return {
    type: FETCH_POST_SEARCH_FAILURE,
    error,
  };
};
