export const API_URL = process.env.REACT_APP_DEV_API_URL;
//   process.env.NODE_ENV === "production"
//     ? process.env.REACT_APP_PROD_API_URL

export const API_AUTH = API_URL + "/auth/";

export const CREATE_USER = API_URL + "/accounts/users/";
export const USER_LIST_DETAIL = API_URL + "/accounts/users/";
export const POST_LIST_DETAIL = API_URL + "/blog/posts/";
export const REVIEW_LIST_DETAIL = API_URL + "/blog/reviews/";

// Filtered Query
export const CATEGORY_QUERY = POST_LIST_DETAIL + "?category=";
export const POST_REVIEWS_QUERY = REVIEW_LIST_DETAIL + "?post=";

// sub post actions
export const REVIEW_POST = "/review_post/";
