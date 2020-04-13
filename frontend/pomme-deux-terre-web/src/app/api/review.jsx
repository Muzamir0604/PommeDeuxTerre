import axios from "axios";
import { POST_LIST_DETAIL, REVIEW_POST } from "./constant";
import { getConfig } from "../utils/config";

export const createUpdateReviewApi = (id, review) => {
  return axios.post(POST_LIST_DETAIL + id + REVIEW_POST, review, getConfig());
};
