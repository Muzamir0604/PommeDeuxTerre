import axios from "axios";

import { CATEGORIES_SHORTLIST, CATEGORY_QUERY } from "./constant";
import { getConfig } from "../utils/config";

export const getCategoryShortList = () => {
  return axios.get(CATEGORIES_SHORTLIST, getConfig());
};

export const getCategory = (category) => {
  return axios.get(CATEGORY_QUERY + category, getConfig());
};
