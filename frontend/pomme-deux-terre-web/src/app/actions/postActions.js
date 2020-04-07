import { getPost } from "../api/post";
import { apiErrorHandler } from "../utils/errorhandler";
import { FETCH_POST } from "../actions/types";

export function setPost(post) {
  return {
    type: "SET_POST",
    payload: post,
  };
}

export const fetchPost = (id) => (dispatch) => {
  //   dispatch(fetchUsersRequest());
  getPost(id)
    .then((response) => {
      dispatch(fetchPostSuccess(response.data));
    })
    .catch((error) => {
      const errorMessage = apiErrorHandler(error);
      console.log(errorMessage);
      //   dispatch(fetchUsersFailure(errorMessage));
    });
};
export const fetchPostSuccess = (data) => {
  return {
    type: FETCH_POST,
    payload: data,
  };
};
