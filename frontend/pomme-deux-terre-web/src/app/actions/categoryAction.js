import { getCategoryShortList } from "../api/category";
import { apiErrorHandler } from "../utils/errorhandler";
import { FETCH_SHORTLIST_SUCCESS } from "../actions/types";

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
