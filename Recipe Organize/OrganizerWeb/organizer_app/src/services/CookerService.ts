import * as Constant from "@/common/constant";
import { Cooker, Customer, JsonBody, LoginResponse } from "@/types";
import { FormEvent } from "react";
import { Form } from "react-bootstrap";

export const ApiGetCookerCountLoved = async (cookerId: number) => {
    const res = await fetch(Constant.API_GET_COOKER_COUNT_LOVED+cookerId);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody as JsonBody;
        }
    }
    return null;
}

export const ApiGetCookerByUsername = async (username: string) => {
    const res = await fetch(Constant.API_GET_COOKER_BY_USERNAME+username);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody.data as Cooker;
        }
    }
    return null;
}


export const ApiGetCookerById = async (id: string) => {
    const res = await fetch(Constant.API_GET_COOKER_BY_ID+id);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody.data as Cooker;
        }
    }
    return null;
}

export const ApiGetCookerByKeySearch = async (keySearch: string, page: number = 1,  size: number = 12) => {
    const data = new FormData();
    data.append("keyword",keySearch);
    data.append("page",page+"");
    data.append("size",size+"");
    const res = await fetch(Constant.API_GET_COOKER_BY_KEY_SEARCH,{
        method: 'post',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody as JsonBody;
        }
    }
    return null;
}

export const ApiGetCookerByDishCountDesc = async (page: number = 1,  size: number = 12) => {
    const data = new FormData();
    data.append("page",page+"");
    data.append("size",size+"");
    const res = await fetch(Constant.API_GET_COOKER_BY_DISH_COUNT_DESC,{
        method: 'post',
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody as JsonBody;
        }
    }
    return null;
}

export const ApiAcceptCookerById = async (username: string, id: string) => {
    const res = await fetch(Constant.API_ACCEPT_COOKER_BY_ID+username+"/"+id);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}

export const ApiEditAccountStatusCookerById = async (username : string,id: string,status: string) => {
    const res = await fetch(Constant.API_EDIT_STATUS_ACCOUNT_COOKER_BY_ID+username+"/"+id+"/"+status);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
};



export const ApiGetCookerByStatus = async (accountStatus: string, status: boolean) => {
    const res = await fetch(Constant.API_GET_COOKER_BY_STATUS+accountStatus+"/"+status);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return jsonBody.data as Cooker[];
        }
    }
    return null;
}

export const ApiEditCookerProfile = async (event: FormEvent<HTMLFormElement>,id: number) => {
    const data = new FormData();
    const firstName = event.currentTarget.firstname.value.trim();
    const lastname = event.currentTarget.lastname.value.trim();
    const fullName = firstName+" "+lastname;
    const fileAvt = event.currentTarget.fileAvt.files;
    const email = event.currentTarget.email.value.trim(); 
    const address = event.currentTarget.address.value.trim(); 
    const phone = event.currentTarget.phone.value.trim(); 
    const city = event.currentTarget.city.value.trim(); 
    const state = event.currentTarget.state.value.trim(); 

    for (const file of fileAvt) {
        data.append("fileAvt", file);
    }
    data.append("fullName",fullName);
    data.append("email",email);
    data.append("phone",phone);
    data.append("city",city);
    data.append("state",state);
    data.append("address",address);
    const res = await fetch(Constant.API_EDIT_COOKER_PROFILE+id,{
        method: "PUT",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }else{
        return null;
    }
}
