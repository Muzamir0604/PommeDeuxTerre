import { FETCH_POST_SUCCESS, FETCH_POST_FAILURE } from "../actions/types";

const postReducer = (
  state = {
    post: [],
    isLoading: false,
    error:[]
  },
  action
) => {
  switch (action.type) {
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "CHANGE_POST":
      return {
        ...state,
        post: action.payload,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
      };
    case FETCH_POST_FAILURE:
      return{
        ...state,
        error: action.payload,
      }
    default:
      return { ...state };
  }
};
export default postReducer;
