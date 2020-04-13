import { createUpdateReviewApi } from "../api/review";
import { apiErrorHandler } from "../utils/errorhandler";
import {
  CREATE_UPDATE_REVIEW_FAILURE,
  CREATE_UPDATE_REVIEW_SUCCESS,
  CREATE_UPDATE_REVIEW_REQUEST,
} from "../actions/types";

export const createUpdateReview = (id, review) => (dispatch) => {
  dispatch(createUpdateReviewRequest());
  createUpdateReviewApi(id, review)
    .then((response) => {
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
