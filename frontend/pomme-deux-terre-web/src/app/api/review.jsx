import axios from "axios";
import { POST_LIST_DETAIL, REVIEW_POST } from "./constant";
import { getConfig } from "../utils/config";

export const createUpdateReviewApi = (postId, review) => {
  return axios.post(
    POST_LIST_DETAIL + postId + REVIEW_POST,
    review,
    getConfig()
  );
};
