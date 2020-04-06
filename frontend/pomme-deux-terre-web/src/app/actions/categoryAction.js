import { getCategoryShortList, getCategory } from "../api/category";
import { apiErrorHandler } from "../utils/errorhandler";
import { FETCH_SHORTLIST_SUCCESS, FETCH_CATEGORY } from "../actions/types";

export const fetchShortList = () => (dispatch) => {
  //   dispatch(fetchUsersRequest());
  getCategoryShortList()
    .then((response) => {
      dispatch(fetchShortListSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      console.log(errorMessage);
      //   dispatch(fetchUsersFailure(errorMessage));
    });
};
export const fetchCategory = (category) => (dispatch) => {
  getCategory(category)
    .then((response) => {
      dispatch(fetchCategorySuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      console.log(errorMessage);
      console.log(error.category);
    });
};

export const fetchCategorySuccess = (data) => {
  return {
    type: FETCH_CATEGORY,
    payload: data,
  };
};
// export const fetchUsersRequest = () => {
//   return {
//     type: FETCH_USERS_REQUEST
//   };
// };

export const fetchShortListSuccess = (data) => {
  return {
    type: FETCH_SHORTLIST_SUCCESS,
    payload: data,
  };
};

// export const fetchUsersFailure = error => {
//   return {
//     type: FETCH_USERS_FAILURE,
//     error
//   };
// };
