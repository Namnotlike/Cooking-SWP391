import * as Constant from "@/common/constant";
import { Category, CategoryDetail, Dish, JsonBody, Tag } from "@/types";
import { FormEvent } from "react";

export const ApiGetAllCategoryDetail = async () => {
    const res = await fetch(Constant.API_GET_ALL_CATEGORY_DETAIL);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as CategoryDetail[];
    }
}
