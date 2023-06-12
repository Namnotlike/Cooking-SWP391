export const URL_BACKEND = "http://localhost:9000";
export const URL_FONTEND = "http://localhost:3000";

export const IMAGE_PATH = URL_FONTEND+"/images/";
export const MATERIAL_PATH = URL_FONTEND+"/materials/";

/*
 ** PAGINATION 
 */
export const ITEM_PER_PAGE = 12;
export const ITEM_PER_PAGE_TABLE = 6;

/*
 ** DISH API
 */
export const API_GET_DISH_BY_ID = URL_BACKEND + "/api/v1/dish/getById/";
export const API_GET_DISH_SEARCH_BY_KEYWORD = URL_BACKEND + "/api/v1/dish/getByKeySearch/";
export const API_GET_DISH_BY_CATEGORY_ID = URL_BACKEND + "/api/v1/dish/getByCategoryId/";
export const API_GET_DISH_BY_FAVORITE = URL_BACKEND + "/api/v1/dish/getByFavorite/";
export const API_CREATE_DISH = URL_BACKEND + "/api/v1/dish/create";
export const API_UPDATE_DISH = URL_BACKEND + "/api/v1/dish/edit/";
export const API_DELETE_DISH = URL_BACKEND + "/api/v1/dish/deleteById/";

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
 ** NOTIFICATION API
 */
export const API_GET_NOTIFICATION_BY_OWNER = URL_BACKEND + "/api/v1/notification/getByOwner/";
export const API_UPDATE_STATUS_NOTIFICATION_BY_ID = URL_BACKEND + "/api/v1/notification/changeStatus/";
export const API_GET_NOTIFICATION_BY_OWNER_AND_STATUS = URL_BACKEND + "/api/v1/notification/getByOwner/";

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
export const API_EDIT_STATUS_ACCOUNT_CUSTOMER_BY_ID = URL_BACKEND + "/api/v1/customer/editAccountStatus/";
export const API_GET_CUSTOMER_BY_STATUS = URL_BACKEND + "/api/v1/customer/getByAccountStatus/";

/*
 ** COOKER API
 */
 export const API_GET_COOKER_BY_USERNAME = URL_BACKEND + "/api/v1/cooker/getByUsername/";
 export const API_ACCEPT_COOKER_BY_ID = URL_BACKEND + "/api/v1/cooker/acceptCooker/";
 export const API_EDIT_STATUS_ACCOUNT_COOKER_BY_ID = URL_BACKEND + "/api/v1/cooker/editAccountStatus/";
 export const API_GET_COOKER_BY_STATUS = URL_BACKEND + "/api/v1/cooker/getByStatus/";
 export const API_EDIT_COOKER_PROFILE = URL_BACKEND + "/api/v1/cooker/update/";
 
/*
 ** EMPLOYEE API
 */
export const API_GET_EMPLOYEE_BY_USERNAME = URL_BACKEND + "/api/v1/employee/getByUsername/";
export const API_EDIT_EMPLOYEE_PROFILE = URL_BACKEND + "/api/v1/employee/update/";

/*
 ** FAVORITE API
 */
 export const API_CHECK_LOVED = URL_BACKEND + "/api/v1/favorite/checkLoved";
 export const API_GET_FAVORITE_BY_ACCOUNT_ID = URL_BACKEND + "/api/v1/favorite/getByAccountId/";
 export const API_GET_FAVORITE_BY_ACCOUNT_AND_DISH_ID = URL_BACKEND + "/api/v1/favorite/getByAccountAndDishId/";
 export const API_ADD_OR_REMOVE_FAVORITE = URL_BACKEND + "/api/v1/favorite/changeFavorite";

 /*
 ** CUSTOMIZE API
 */
 export const API_CREATE_OR_UPDATE_CUSTOMIZE = URL_BACKEND + "/api/v1/customize/save";
 export const API_DELETE_CUSTOMIZE = URL_BACKEND + "/api/v1/customize/delete";