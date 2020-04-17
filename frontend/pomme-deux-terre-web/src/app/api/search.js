import axios from "axios";
import { POST_SEARCH } from "./constant";
import { getConfig } from "../utils/config";

export const getPostSearchApi = async (searchTerm) => {
  return await axios.get(POST_SEARCH + searchTerm, getConfig());
};
