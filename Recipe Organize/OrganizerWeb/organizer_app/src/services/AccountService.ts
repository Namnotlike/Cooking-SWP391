import * as Constant from "@/common/constant";
import { JsonBody, LoginResponse } from "@/types";
import { FormEvent } from "react";
import { Form } from "react-bootstrap";
import moment from "moment";

export const ApiVerifyEmail = async (username: string, password: string, digitCode: string) => {
    const data = new FormData();
    data.append("username",username);
    data.append("password",password);
    data.append("digitCode",digitCode);
    const res = await fetch(Constant.API_VERIFY_EMAIL,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        if(jsonBody.code=='01')
            return jsonBody.data as LoginResponse;
        else return null;
    }else{
        return null;
    }
}

export const ApiForgotSendEmail = async (email: string) => {
    const data = new FormData();
    data.append("email",email);
    const res = await fetch(Constant.API_FORGOT_SEND_EMAIL,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}

export const ApiForgotVerifyDigit = async (email: string, digitCode: string) => {
    const data = new FormData();
    data.append("email",email);
    data.append("digitCode",digitCode);
    const res = await fetch(Constant.API_FORGOT_VERIFY,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}


export const ApiForgotNewPassword = async (email: string, password: string) => {
    const data = new FormData();
    data.append("email",email);
    data.append("password",password);
    const res = await fetch(Constant.API_FORGOT_NEW_PASSWORD,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}

export const ApiLogin = async (username: string, password: string) => {
    const data = new FormData();
    data.append("username",username);
    data.append("password",password);
    const res = await fetch(Constant.API_LOGIN,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }else{
        return null;
    }
}

export const ApiRegistry = async (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData();
    const username = event.currentTarget.username.value.trim();
    const password = event.currentTarget.password.value.trim();
    const email = event.currentTarget.email.value.trim();
    const firstname = event.currentTarget.firstname.value.trim();
    const lastname = event.currentTarget.lastname.value.trim();
    const fullName = firstname+" "+lastname;
    const gender = event.currentTarget.gender.value.trim();
    const dateOfBirth = event.currentTarget.dateOfBirth.value;
    const formattedDate = moment(dateOfBirth).format('DD/MM/YYYY');
    const phone = event.currentTarget.phone.value.trim();
    const roleCheck = event.currentTarget.isCooker.checked;
    const fileAvt = event.currentTarget.fileAvt.files;
    if(!fileAvt || fileAvt.length==0){
        alert("Avatar can not empty.")
        return;
    }
    if(username.length<6){
        alert("Username must be at least 6 characters long.")
        return;
    }
    if(password.length<6){
        alert("Password must be at least 6 characters long.")
        return;
    }
    if(phone.length<9 || phone.length>13){
        alert("Phone number must be between 9 and 13 digits.");
        return;
    }
    if(roleCheck){
        data.append("role","COOKER");
    }else{
        data.append("role","CUSTOMER");
    }
    for (const file of fileAvt) {
        data.append("fileAvt", file);
    }
    data.append("username",username);
    data.append("password",password);
    data.append("email",email);
    data.append("fullName",fullName);
    data.append("gender",gender);
    data.append("dateOfBirth",formattedDate);
    data.append("phone",phone);
    const res = await fetch(Constant.API_REGISTRY,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}