import * as Constant from "@/common/constant";
import { JsonBody, LoginResponse, Notification } from "@/types";
import { FormEvent } from "react";
import { Form } from "react-bootstrap";
import moment from "moment";

export const ApiGetNotificationByOwner = async (owner: string) => {
    const res = await fetch(Constant.API_GET_NOTIFICATION_BY_OWNER+owner);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Notification[];
    }
};

export const ApiGetNotificationByOwnerAndStatus = async (owner: string,status: string) => {
    const res = await fetch(Constant.API_GET_NOTIFICATION_BY_OWNER+owner+"/status/"+status);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Notification[];
    }
};

export const ApiGetNotificationByUsername = async (username: string) => {
    const res = await fetch(Constant.API_GET_NOTIFICATION_BY_USERNAME+username);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Notification[];
    }
};

export const ApiUpdateStatusNotification = async (id: string,status: string) => {
    const res = await fetch(Constant.API_UPDATE_STATUS_NOTIFICATION_BY_ID+id+"/"+status,{
        method: 'PUT'
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
};