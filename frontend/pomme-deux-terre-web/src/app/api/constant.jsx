export const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;

export const API_AUTH = API_URL + "/accounts/token/";

export const CREATE_USER = API_URL + "/accounts/create/";

// POST,GET,PUT,DELETE
export const USER_LIST_DETAIL = API_URL + "/accounts/me/";
export const POST_LIST_DETAIL = API_URL + "/blog/posts/";
export const REVIEW_LIST_DETAIL = API_URL + "/blog/reviews/";

//GET
export const CATEGORIES_SHORTLIST = API_URL + "/blog/categories/";

// ----------------------------Filtered Query-------------------
export const CATEGORY_QUERY = POST_LIST_DETAIL + "?category=";

export const POST_REVIEWS_QUERY = REVIEW_LIST_DETAIL + "?post=";
//or   POST_LIST_DETAIL +"<postID>" + REVIEWS
export const REVIEWS = "/reviews";

export const USER_POST_QUERY = POST_LIST_DETAIL + "?user=";

export const USER_REVIEWS_QUERY = REVIEW_LIST_DETAIL + "?user=";
//or USER_LIST_DETAIL + "<userID>" + REVIEWS

// sub post actions
// POST_LIST_DETAIL + postID + REVIEW_POST
export const REVIEW_POST = "/review_post/";

//SUB GET ACTIONS
// POST_LIST_DETAIL + postID + USER_REVIEW
export const USER_REVIEW = "/user_review/";

//Upload Image
export const UPLOAD_IMAGE_ONLY = API_URL + "/blog/image/";

//Search action place suffix with search term
export const POST_SEARCH = POST_LIST_DETAIL + "?search=";
