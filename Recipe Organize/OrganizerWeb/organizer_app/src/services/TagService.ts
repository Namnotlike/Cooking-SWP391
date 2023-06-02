import * as Constant from "@/common/constant";
import { Tag, JsonBody } from "@/types";

export const getAllTag = async () => {
    const res = await fetch(Constant.API_GET_ALL_TAG);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Tag[];
    }
}


export const ApiGetTopViewedTags = async (size: number) => {
    const res = await fetch(Constant.API_GET_TAG_TOP_VIEWED+"?size="+size);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Tag[];
    }
}