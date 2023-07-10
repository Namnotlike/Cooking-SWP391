import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import LockIcon from '@mui/icons-material/Lock';
import { FormEvent } from "react";
import { ApiLogin } from "@/services/AccountService";
import { JsonBody, LoginResponse, UserInfoCookie } from "@/types";
import { useCookies } from "react-cookie";
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

type Params = {
    returnUrl: string
}

const LoginPage = ({returnUrl}: Params) => {
    const [cookies, setCookie, removeCookie] = useCookies(['userVerify']);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const router = useRouter();

    const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = event.currentTarget.username.value.trim();
        const password = event.currentTarget.password.value.trim();
        const result = await ApiLogin(username,password) as JsonBody;
        if(result){
            if(result.code=='01'){
                setCookieUser("userInfoCookie", result.data, {path: "/"});
                if(returnUrl && returnUrl.length>0 && returnUrl!='undefined'){
                    location.href = returnUrl;
                }
                else {
                    const userInfoCookie = result.data as UserInfoCookie;
                    var url = "/";
                    if(userInfoCookie.userInfo.role.roleName=='Employee'){
                        url = "/dashboard";
                    }
                    router.push(url);
                }
            }else if(result.code=='03'){
                setCookie('userVerify',{
                    email: result.message,
                    username,
                    password
                },{path: '/'});
                router.push("/signup/verify");
            }
            else {
                alert(result.message);
            }
        }else{
            alert("Login failed");
        }
    }
    return (
            <div className="row m-0 bg-white" style={{height:'100vh',paddingInline:200}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{position:'relative'}}>
                        <Image src="/materials/bg_login_left.svg" width={0} height={0} style={{position:'absolute',top:0,left:0,width:'100%',height:'100vh'}} alt="Picture of the author" />
                        <div className="d-flex align-items-center hover_text_green" style={{position:'absolute',top:30,left:30}} onClick={()=>{router.push("/");}}>
                            <ArrowBackIcon />
                            <span  className="ms-2">Back to main page</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8 d-flex align-items-center">
                        <div className="w-100 mb-5 pb-5">
                        <h1 style={{fontSize:46}}><b>Welcome</b></h1>
                        <h5>Login to continue</h5>
                        <form onSubmit={handleSubmitLogin}>
                            <div className="form-group pt-3">
                                <p>Username</p>
                                <TextFieldCustom id="username" type="text" placeholder="Your username" required>
                                    <PersonIcon />
                                </TextFieldCustom>                        
                            </div>
                            <div className="form-group pt-3">
                                <p>Password</p>
                                <TextFieldCustom id="password" type="password" placeholder="Your password" required>
                                    <LockIcon />
                                </TextFieldCustom>
                            </div>
                            <input type="submit" id="btn_submit_login" hidden ></input>
                        </form>
                        <div className="d-flex py-3 align-items-center">
                            <div className='form-group'>
                                <FormControlLabel control={<Checkbox />} label="Remember Me" id="remember" />
                            </div>
                            <div className="flex-grow-1 text-end">
                                <Link href="/forgot-password" style={{color:'#3665C5'}}>Forgot Password?</Link>
                            </div>
                        </div>
                        <button className="btn text-light w-100 mb-3" style={{backgroundColor:'#3665C5'}} onClick={()=>document.getElementById('btn_submit_login')?.click()}>Login</button>
                        <p className="text-center mt-3 f-size-18">Don't have account? <Link href="/signup" style={{color:'#3665C5'}}>Sign Up</Link></p>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    var returnUrlData="../";
    if(query){
        const {returnUrl} = query;
        returnUrlData = returnUrl+"";
    }
    return { 
        props: { 
            returnUrl: returnUrlData
        } 
    };
}

export default LoginPage;