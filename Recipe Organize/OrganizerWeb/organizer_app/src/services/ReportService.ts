import * as Constant from "@/common/constant";
import {  Feedback, JsonBody } from "@/types";

export const ApiCreateReport = async (dishId: number, username: string, description: string, reason: string) => {
    const data = new FormData();
    data.append("dishId",dishId+"");
    data.append("username",username);
    data.append("description",description);
    data.append("reason",reason);
    const res = await fetch(Constant.API_CREATE_REPORT,{
        method: 'POST',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}

export const ApiGetAllReportPaging = async (page: number, size: number) => {
    const res = await fetch(Constant.API_GET_ALL_PAGING+"?page="+page+"&size="+size);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}
