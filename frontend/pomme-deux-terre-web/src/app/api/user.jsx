import axios from "axios";
import { API_AUTH, CREATE_USER, USER_LIST_DETAIL } from "./constant";
import { getConfig } from "../utils/config";

export const loginApi = (credentials) => {
  console.log(credentials)
  return axios.post(API_AUTH, 
  {"email":credentials.email, 
  "password":credentials.password},
  {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createUser = (credentials) => {
  return axios.post(CREATE_USER, credentials, {
    headers: { "content-type": "application/json" },
  });
};

export const updateUserApi = (id, userDetails) => {
  return axios.patch(USER_LIST_DETAIL, userDetails, getConfig());
};

export const fetchUserApi = (userId) => {
  return axios.get(USER_LIST_DETAIL, getConfig());
};
