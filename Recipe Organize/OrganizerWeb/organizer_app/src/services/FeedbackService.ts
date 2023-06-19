import * as Constant from "@/common/constant";
import {  Feedback, JsonBody } from "@/types";

export const ApiGetFeedbackByDishId = async (dishId: string) => {
    const res = await fetch(Constant.API_GET_FEEDBACK_BY_DISH_ID+dishId);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Feedback[];
    }
    return false;
}

export const ApiCreateFeedback = async (feedBackContent: string, dishId: string, ratingPoint: string,username: string, role: string) => {
    const data = new FormData();
    data.append("feedBackContent", feedBackContent.trim());
    data.append("dishId", dishId);
    data.append("ratingPoint", ratingPoint);
    data.append("username", username);
    data.append("role", role);
    const res = await fetch(Constant.API_CREATE_FEEDBACK,{
        method: 'POST',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return false;
}
