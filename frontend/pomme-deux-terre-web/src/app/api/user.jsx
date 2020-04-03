import axios from "axios";
import { API_AUTH, CREATE_USER, USER_LIST_DETAIL } from "./constant";
import { getConfig } from "../utils/config";

export const loginApi = credentials => {
  return axios.post(API_AUTH, credentials, {
    headers: {
      "content-type": "application/json"
    }
  });
};

export const createUser = credentials => {
  return axios.post(CREATE_USER, credentials, {
    headers: { "content-type": "application/json" }
  });
};

export const updateUserApi = (id, userDetails) => {
  return axios.put(USER_LIST_DETAIL + id, userDetails, getConfig());
};

export const fetchUserApi = userId => {
  return axios.get(USER_LIST_DETAIL + userId, getConfig());
};
