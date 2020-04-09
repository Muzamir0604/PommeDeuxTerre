import { getCategoryShortList, getCategory } from "../api/category";
import { apiErrorHandler } from "../utils/errorhandler";
import {
  FETCH_SHORTLIST_SUCCESS,
  FETCH_SHORTLIST_FAILURE,
  FETCH_SHORTLIST_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
} from "../actions/types";

export const fetchShortList = () => (dispatch) => {
  dispatch(fetchShortListRequest());
  getCategoryShortList()
    .then((response) => {
      dispatch(fetchShortListSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchShortListFailure(errorMessage));
    });
};

export const fetchShortListRequest = () => {
  return {
    type: FETCH_SHORTLIST_REQUEST,
  };
};

export const fetchShortListSuccess = (data) => {
  return {
    type: FETCH_SHORTLIST_SUCCESS,
    payload: data,
  };
};

export const fetchShortListFailure = (error) => {
  return {
    type: FETCH_SHORTLIST_FAILURE,
    error,
  };
};

export const fetchCategory = (category) => (dispatch) => {
  dispatch(fetchCategoryRequest());
  getCategory(category)
    .then((response) => {
      dispatch(fetchCategorySuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchCategoryFailure(errorMessage));
    });
};

export const fetchCategorySuccess = (data) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const fetchCategoryFailure = (error) => {
  return {
    type: FETCH_CATEGORY_FAILURE,
    error,
  };
};
export const fetchCategoryRequest = () => {
  return {
    type: FETCH_CATEGORY_REQUEST,
  };
};
