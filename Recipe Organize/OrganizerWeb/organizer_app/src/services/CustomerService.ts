import * as Constant from "@/common/constant";
import { Customer, JsonBody, LoginResponse } from "@/types";
import { FormEvent } from "react";
import { Form } from "react-bootstrap";

export const ApiGetCustomerByUsername = async (username: string) => {
    const res = await fetch(Constant.API_GET_CUSTOMER_BY_USERNAME+username);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Customer;
    }else{
        return null;
    }
}

export const ApiEditCustomerProfile = async (event: FormEvent<HTMLFormElement>,id: number) => {
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
    const res = await fetch(Constant.API_EDIT_CUSTOMER_PROFILE+id,{
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
