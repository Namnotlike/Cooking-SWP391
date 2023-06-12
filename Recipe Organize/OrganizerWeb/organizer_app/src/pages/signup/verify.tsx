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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Page = () => {
    const [cookie, setCookie, removeCookie] = useCookies(['userVerify']);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const [email,setEmail] = React.useState('');

    const [timer, setTimer] = React.useState(60);
    const countdownIntervalRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
    countdownIntervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(countdownIntervalRef.current);
          return prevTimer;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdownIntervalRef.current);
    };
  }, []);

    React.useEffect(()=>
    {
        if(cookie && cookie.userVerify){
            setEmail(cookie.userVerify.email);
        }
    });
    const handleSubmitVerify = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var digit = "";
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement).value.trim();
            digit+=item;
        }
        const username = cookie.userVerify.username;
        const password = cookie.userVerify.password;
        const result = await ApiVerifyEmail(username, password, digit) as LoginResponse;
        if(result){
            removeCookie('userVerify',{path:"/"});
            setCookieUser("userInfoCookie", result, {path: "/"});
            location.href = "../";
        }else{
            alert("Verify failed");
        }
    } 
    return (
            <div className="row m-0 bg-white" style={{height:'100vh',paddingInline:200}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex align-items-center h-100 w-100" style={{position:'relative'}}>
                        <Image src="/materials/bg_login_left.svg" width={0} height={0} style={{position:'absolute',top:0,left:0,width:'100%',height:'auto'}} alt="Picture of the author" />
                        <div className="d-flex align-items-center hover_text_green" style={{position:'absolute',top:30,left:30}} onClick={()=>{location.href="../login"}}>
                            <ArrowBackIcon />
                            <span className="ms-2">Back to login page</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end mt-5 mb-3" style={{fontSize:14}}>Step 2 of 2 <a href="#" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h4 className="pt-3">Check your Mail</h4>
                        <p className="pt-3" style={{color:'#8692A6'}}>We,ve sent a 6-digit confirmation code to <a href="#" style={{color:'#3665C5'}}>{email && email || 'user@gmail.com'}.</a> Make sure you enter correct code within ({timer}s).</p>
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