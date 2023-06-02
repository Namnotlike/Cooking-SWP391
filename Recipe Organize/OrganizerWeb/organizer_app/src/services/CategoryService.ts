import * as Constant from "@/common/constant";
import { Category, Dish, JsonBody, Tag } from "@/types";
import { FormEvent } from "react";

export const ApiGetAllCategory = async () => {
    const res = await fetch(Constant.API_GET_ALL_CATEGORY);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Category[];
    }
}
