export const URL_BACKEND = "http://localhost:9000";
export const URL_FONTEND = "http://localhost:3000";

export const IMAGE_PATH = URL_FONTEND+"/images/";
// export const IMAGE_PATH = "C:/Users/hoang/OneDrive/Desktop/ghep_vpp/organic_cooking/OrganizerWeb/organizer_app/public/images/";
export const MATERIAL_PATH = URL_FONTEND+"/materials/";

/*
 ** PAGINATION 
 */
export const ITEM_PER_PAGE = 12;
export const ITEM_PER_PAGE_TABLE = 6;
export const ITEM_PER_FEEDBACK = 5;

/*
 ** DISH API
 */
export const API_GET_ALL_DISH_PAGING = URL_BACKEND + "/api/v1/dish/getAllPaging";
export const API_GET_TOPVIEW_CATEOGRY_PAGING = URL_BACKEND + "/api/v1/dish/getTopViewByCategory/";
export const API_GET_TOPRATING_CATEOGRY_PAGING = URL_BACKEND + "/api/v1/dish/getTopRatingByCategory/";
export const API_UPDATE_DISH_STATUS = URL_BACKEND + "/api/v1/dish/updateStatus";
export const API_UPDATE_DISH_MEAL_PLANNING = URL_BACKEND + "/api/v1/dish/updateMealPlanning/";
export const API_GET_DISH_BY_STATUS_PAGING = URL_BACKEND + "/api/v1/dish/getByStatusPaging/";
export const API_GET_DISH_BY_ID = URL_BACKEND + "/api/v1/dish/getById/";
export const API_GET_DISH_BY_MEAL_TIME = URL_BACKEND + "/api/v1/dish/getDishRandByMealTime/";
export const API_GET_DISH_BY_COOKER_ID_PAGING = URL_BACKEND + "/api/v1/dish/getByCookerIdPaging/";
export const API_GET_DISH_TOP_VIEWED = URL_BACKEND + "/api/v1/dish/getTopViewed";
export const API_GET_DISH_SEARCH_BY_KEYWORD = URL_BACKEND + "/api/v1/dish/getByKeySearch/";
export const API_GET_DISH_BY_CATEGORY_ID = URL_BACKEND + "/api/v1/dish/getByCategoryId/";
export const API_GET_DISH_BY_FAVORITE = URL_BACKEND + "/api/v1/dish/getByFavorite/";
export const API_GET_DISH_BY_FULL_MEALS = URL_BACKEND + "/api/v1/dish/getDishFullMealsByCalories/";
export const API_GET_LIST_DISH_BY_MEAL_TIME = URL_BACKEND + "/api/v1/dish/getDishByMealTime/";
export const API_CREATE_DISH = URL_BACKEND + "/api/v1/dish/create";
export const API_UPDATE_DISH = URL_BACKEND + "/api/v1/dish/edit/";
export const API_DELETE_DISH = URL_BACKEND + "/api/v1/dish/deleteById/";
export const API_UPDATE_VIEWED = URL_BACKEND + "/api/v1/dish/updateViewed/";
export const API_GET_DISH_BY_TAG_ID_PAGING = URL_BACKEND + "/api/v1/dish/getByTagPaging/";

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
export const API_GET_NOTIFICATION_BY_USERNAME = URL_BACKEND + "/api/v1/notification/getByUsername/";
export const API_UPDATE_STATUS_NOTIFICATION_BY_ID = URL_BACKEND + "/api/v1/notification/changeStatus/";
export const API_GET_NOTIFICATION_BY_OWNER_AND_STATUS = URL_BACKEND + "/api/v1/notification/getByOwner/";

/*
 ** ACCOUNT API
 */
export const API_REGISTRY = URL_BACKEND + "/api/v1/account/registry";
export const API_LOGIN = URL_BACKEND + "/api/v1/account/login";
export const API_VERIFY_EMAIL = URL_BACKEND + "/api/v1/account/verify";
export const API_FORGOT_SEND_EMAIL = URL_BACKEND + "/api/v1/account/forgot/sendEmail";
export const API_FORGOT_VERIFY = URL_BACKEND + "/api/v1/account/forgot/verify";
export const API_FORGOT_NEW_PASSWORD = URL_BACKEND + "/api/v1/account/forgot/newPassword";

/*
 ** CATEGORY DETAIL API
 */
export const API_GET_ALL_CATEGORY_DETAIL = URL_BACKEND + "/api/v1/category-detail/getAll";


/*
 ** RATING API
 */
 export const API_CREATE_RATING = URL_BACKEND + "/api/v1/rating/create";
 export const API_GET_RATING_BY_DISH_AND_ACCOUNT = URL_BACKEND + "/api/v1/rating/getByDishAndAccountId/";

/*
 ** CUSTOMER API
 */
export const API_GET_CUSTOMER_BY_USERNAME = URL_BACKEND + "/api/v1/customer/getByUsername/";
export const API_UPDATE_CUSTOMER_HEIGHT_WEIGHT = URL_BACKEND + "/api/v1/customer/updateHeightWeight";
export const API_EDIT_CUSTOMER_PROFILE = URL_BACKEND + "/api/v1/customer/update/";
export const API_EDIT_STATUS_ACCOUNT_CUSTOMER_BY_ID = URL_BACKEND + "/api/v1/customer/editAccountStatus/";
export const API_GET_CUSTOMER_BY_STATUS = URL_BACKEND + "/api/v1/customer/getByAccountStatus/";

/*
 ** COOKER API
 */
 export const API_GET_COOKER_COUNT_LOVED = URL_BACKEND + "/api/v1/cooker/getCountLoved/";
 export const API_GET_COOKER_BY_ID = URL_BACKEND + "/api/v1/cooker/getById/";
 export const API_GET_COOKER_BY_DISH_COUNT_DESC = URL_BACKEND + "/api/v1/cooker/getByDishCountDesc/";
 export const API_GET_COOKER_BY_USERNAME = URL_BACKEND + "/api/v1/cooker/getByUsername/";
 export const API_GET_COOKER_BY_KEY_SEARCH = URL_BACKEND + "/api/v1/cooker/getByKeySearch";
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
 ** FEEDBACK API
 */
 export const API_GET_FEEDBACK_BY_DISH_ID = URL_BACKEND + "/api/v1/feedback/getByDishId/";
 export const API_CREATE_FEEDBACK = URL_BACKEND + "/api/v1/feedback/create";

 /*
 ** CUSTOMIZE API
 */
 export const API_CREATE_OR_UPDATE_CUSTOMIZE = URL_BACKEND + "/api/v1/customize/save";
 export const API_DELETE_CUSTOMIZE = URL_BACKEND + "/api/v1/customize/delete";


 /*
  ** REPORT API
  */
 export const API_CREATE_REPORT = URL_BACKEND + "/api/v1/report/create";
 export const API_GET_ALL_PAGING = URL_BACKEND + "/api/v1/report/getAllPaging";

  /*
  ** VIEWED API
  */
  export const API_GET_VIEWED_BY_YEAR = URL_BACKEND + "/api/v1/viewed/getByYear/";
  export const API_GET_VIEWED_BY_DAY = URL_BACKEND + "/api/v1/viewed/getByDay";