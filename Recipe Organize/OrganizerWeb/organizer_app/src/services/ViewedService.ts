import * as Constant from "@/common/constant";
import { Tag, JsonBody } from "@/types";

export const ApiGetViewedByYear = async () => {
    const res = await fetch(Constant.API_GET_VIEWED_BY_YEAR+"2023");
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}
export const ApiGetViewedByDay = async () => {
    const res = await fetch(Constant.API_GET_VIEWED_BY_DAY);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}
