export const URL_BACKEND = "http://localhost:9000";
export const URL_FONTEND = "http://localhost:3000";

export const IMAGE_PATH = URL_FONTEND+"/images/";

/*
 ** PAGINATION 
 */
export const ITEM_PER_PAGE = "12";

/*
 ** DISH API
 */
export const API_GET_DISH_BY_ID = URL_BACKEND + "/api/v1/dish/getById/";
export const API_GET_DISH_BY_CATEGORY_ID = URL_BACKEND + "/api/v1/dish/getByCategoryId/";
export const API_CREATE_DISH = URL_BACKEND + "/api/v1/dish/create";

/*
 ** TAG API
 */
export const API_GET_ALL_TAG = URL_BACKEND + "/api/v1/tag/getAll";
export const API_GET_TAG_TOP_VIEWED = URL_BACKEND + "/api/v1/tag/getTopViewed";

/*
 ** CATEGORY API
 */
export const API_GET_ALL_CATEGORY = URL_BACKEND + "/api/v1/category/getAll";

/*
 ** ACCOUNT API
 */
export const API_REGISTRY = URL_BACKEND + "/api/v1/account/registry";
export const API_LOGIN = URL_BACKEND + "/api/v1/account/login";
export const API_VERIFY_EMAIL = URL_BACKEND + "/api/v1/account/verify";

/*
 ** CATEGORY DETAIL API
 */
export const API_GET_ALL_CATEGORY_DETAIL = URL_BACKEND + "/api/v1/category-detail/getAll";


/*
 ** CUSTOMER API
 */
export const API_GET_CUSTOMER_BY_USERNAME = URL_BACKEND + "/api/v1/customer/getByUsername/";
export const API_EDIT_CUSTOMER_PROFILE = URL_BACKEND + "/api/v1/customer/update/";
