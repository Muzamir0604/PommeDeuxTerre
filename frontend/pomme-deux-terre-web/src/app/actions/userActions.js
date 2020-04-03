import { fetchUserApi, updateUserApi } from "../api/user";
import { apiErrorHandler } from "../utils/errorhandler";
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  SET_USER_SUCCESS,
  SET_USER_REQUEST,
  SET_USER_FAILURE,
  RELEASE_USER
} from "../actions/types";

export const fetchUsers = id => dispatch => {
  dispatch(fetchUsersRequest());
  fetchUserApi(id)
    .then(response => {
      dispatch(fetchUsersSuccess(response.data));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(fetchUsersFailure(errorMessage));
    });
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  };
};

export const fetchUsersSuccess = data => {
  return {
    type: FETCH_USERS_SUCCESS,
    user: data
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    error
  };
};

export const updateUser = (id, user) => dispatch => {
  dispatch(updateUserRequest());
  updateUserApi(id, user)
    .then(response => {
      console.log("SUCCESS::", response);
      dispatch(updateUserSuccess(user));
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(updateUserFailure(errorMessage));
    });
};

export const updateUserRequest = () => {
  return {
    type: SET_USER_REQUEST
  };
};

export const updateUserSuccess = data => {
  return {
    type: SET_USER_SUCCESS,
    user: data
  };
};

export const updateUserFailure = error => {
  return {
    type: SET_USER_FAILURE,
    error
  };
};

export const releaseUser = () => {
  return {
    type: RELEASE_USER
  };
};
