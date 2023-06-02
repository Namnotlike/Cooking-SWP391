'use client';
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import OptInput from "@/components/OptInput";
import { GetServerSideProps } from "next";
import { useCookies } from "react-cookie";
import { ApiVerifyEmail } from "@/services/AccountService";
import { LoginResponse } from "@/types";

type Params = {
    email: string,
}

const Page = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userVerify']);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const [email,setEmail] = React.useState('');
    React.useEffect(()=>setEmail(cookies.userVerify.email))

    const handleSubmitVerify = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var digit = "";
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement).value.trim();
            digit+=item;
        }
        const username = cookies.userVerify.username;
        const password = cookies.userVerify.password;
        console.log(username);
        const result = await ApiVerifyEmail(username, password, digit) as LoginResponse;
        if(result){
            removeCookie("userVerify");
            setCookieUser("userInfoCookie", result, {path: "/"});
            location.href = "../";
        }else{
            alert("Verify failed");
        }
    } 
    return (
            <div className="row p-0 m-0 bg-white" style={{height:'100vh'}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{padding:100,backgroundImage:'url(../materials/bg_login_left.svg)'}}>
                        
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end mt-5 mb-3" style={{fontSize:14}}>Step 2 of 2 <a href="#" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h4 className="pt-3">Check your Mail</h4>
                        <p className="pt-3" style={{color:'#8692A6'}}>We,ve sent a 6-digit confirmation code to <a href="#" style={{color:'#3665C5'}}>{email && email}.</a> Make sure you enter correct code.</p>
                        <form onSubmit={handleSubmitVerify}>
                            <OptInput />
                            <button type="submit" className="btn text-light w-100 my-3" style={{backgroundColor:'#3665C5'}}>Verify</button>
                        </form>
                        <div className="d-flex justify-content-center mt-5">
                            <p>Already have account? <a href="../login" style={{color:'#3665C5'}}>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;

    return { 
        props: { 
        } 
    };
};

export default Page;