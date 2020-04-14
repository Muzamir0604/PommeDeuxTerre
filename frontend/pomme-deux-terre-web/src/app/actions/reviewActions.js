import { createUpdateReviewApi, getUserPostReviewApi } from "../api/review";
import { apiErrorHandler } from "../utils/errorhandler";

import {
  CREATE_UPDATE_REVIEW_FAILURE,
  CREATE_UPDATE_REVIEW_SUCCESS,
  CREATE_UPDATE_REVIEW_REQUEST,
  FETCH_USER_POST_REVIEW_SUCCESS,
  FETCH_USER_POST_REVIEW_REQUEST,
  FETCH_USER_POST_REVIEW_FAILURE,
} from "../actions/types";

export const createUpdateReview = (id, review) => (dispatch) => {
  dispatch(createUpdateReviewRequest());
  createUpdateReviewApi(id, review)
    .then((response) => {
      console.log(response);
      dispatch(createUpdateReviewSuccess(response));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(createUpdateReviewFailure(errorMessage));
    });
};
export const createUpdateReviewRequest = () => {
  return {
    type: CREATE_UPDATE_REVIEW_REQUEST,
  };
};
export const createUpdateReviewSuccess = (data) => {
  return {
    type: CREATE_UPDATE_REVIEW_SUCCESS,
    data: data,
  };
};
export const createUpdateReviewFailure = (error) => {
  return {
    type: CREATE_UPDATE_REVIEW_FAILURE,
    error,
  };
};

export const getUserPostReview = (id) => (dispatch) => {
  dispatch(getUserPostReviewRequest());
  getUserPostReviewApi(id)
    .then((response) => {
      dispatch(getUserPostReviewSuccess(response.data.user_review));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      dispatch(getUserPostReviewFailure(errorMessage));
    });
};

export const getUserPostReviewRequest = () => {
  return {
    type: FETCH_USER_POST_REVIEW_REQUEST,
  };
};
export const getUserPostReviewSuccess = (data) => {
  return {
    type: FETCH_USER_POST_REVIEW_SUCCESS,
    data: data,
  };
};
export const getUserPostReviewFailure = (error) => {
  return {
    type: FETCH_USER_POST_REVIEW_FAILURE,
    error,
  };
};
