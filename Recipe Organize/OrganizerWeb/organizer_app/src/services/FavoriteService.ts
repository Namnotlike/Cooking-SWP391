import * as Constant from "@/common/constant";
import { Favorite, JsonBody } from "@/types";

export const ApiGetFavoriteByAccountId = async (accountId: string) => {
    const res = await fetch(Constant.API_GET_FAVORITE_BY_ACCOUNT_ID+accountId);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Favorite[];
    }
    return false;
}

export const ApiGetFavoriteByAccountAndDishId = async (accountId: string,dishId: string) => {
    const res = await fetch(Constant.API_GET_FAVORITE_BY_ACCOUNT_AND_DISH_ID+accountId+"/"+dishId);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Favorite;
    }
    return false;
}

export const ApiCheckLoved = async (accountId: string,dishId: string) => {
    const data = new FormData();
    data.append("accountId",accountId);
    data.append("dishId",dishId);
    const res = await fetch(Constant.API_CHECK_LOVED,{
        method:'POST',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as boolean;
    }
    return false;
}

export const ApiAddOrRemoveFavorite = async (role: string, accountId: string,dishId: string) => {
    const data = new FormData();
    data.append("role",role);
    data.append("accountId",accountId);
    data.append("dishId",dishId);
    const res = await fetch(Constant.API_ADD_OR_REMOVE_FAVORITE,{
        method:'POST',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}