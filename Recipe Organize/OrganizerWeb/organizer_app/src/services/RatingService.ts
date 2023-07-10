import {  JsonBody } from "@/types";

import * as Constant from "@/common/constant";
export const ApiCreateRating = async (dishId: string, accountId: string, rating: string) => {
    const data = new FormData();
    data.append("dishId",dishId);
    data.append("accountId",accountId);
    data.append("ratingPoint",rating);
    const res = await fetch(Constant.API_CREATE_RATING,{
        method:'POST',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}
export const ApiGetRatingByDishAndAccountId = async (dishId: string, accountId: string) => {
    const res = await fetch(Constant.API_GET_RATING_BY_DISH_AND_ACCOUNT+dishId+"/"+accountId);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}