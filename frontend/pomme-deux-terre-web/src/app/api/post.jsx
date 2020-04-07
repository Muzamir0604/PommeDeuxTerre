import axios from "axios";

import { POST_LIST_DETAIL } from "./constant";
import { getConfig } from "../utils/config";

export const getPostList = () => {
  return axios.get(POST_LIST_DETAIL, getConfig());
};

export const getPost = (id) => {
  return axios.get(POST_LIST_DETAIL + id, getConfig());
};
