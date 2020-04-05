import axios from "axios";

import { CATEGORIES_SHORTLIST } from "./constant";
import { getConfig } from "../utils/config";

export const getCategoryShortList = () => {
  return axios.get(CATEGORIES_SHORTLIST, getConfig());
};
