import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import LockIcon from '@mui/icons-material/Lock';
import { FormEvent } from "react";
import { ApiLogin } from "@/services/AccountService";
import { JsonBody, LoginResponse } from "@/types";
import { useCookies } from "react-cookie";
import PersonIcon from '@mui/icons-material/Person';
const Page = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userVerify']);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = event.currentTarget.username.value.trim();
        const password = event.currentTarget.password.value.trim();
        const result = await ApiLogin(username,password) as JsonBody;
        if(result){
            if(result.code=='01'){
                setCookieUser("userInfoCookie", result.data, {path: "/"});
                location.href = "../";
            }else if(result.code=='03'){
                setCookie('userVerify',{
                    email: result.message,
                    username,
                    password
                },{path: '/'});
                location.href="../signup/verify";
            }
            else {
                alert(result.message);
            }
        }else{
            alert("Login failed");
        }
    }
    return (
            <div className="row p-0 m-0 bg-white" style={{height:'100vh'}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{padding:100,backgroundImage:'url(materials/bg_login_left.svg)'}}>
                        {/* <p style={{color: '#3665C5',fontSize:18}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum suspendisse gravida dictumst eget. 
                            Tincidunt a placerat orci, lobortis quam. 
                            Eget sit rhoncus sed lobortis aenean et pretium. 
                            Etiam nulla elementum aenean nec. 
                            Viverra a porttitor posuere ornare velit vestibulum enim. Suscipit ac elit a vel ut. 
                            Id fames amet ipsum eu.
                        </p> */}
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end my-5" style={{fontSize:14}}>Don't have account? <a href="../signup" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h1 className="pt-3"style={{fontSize:46}}><b>Welcome</b></h1>
                        <h5 className="pt-3">Login to continue</h5>
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
                                <a href="#" style={{color:'#3665C5'}}>Forgot Password?</a>
                            </div>
                        </div>
                        <button className="btn text-light w-100 mb-3" style={{backgroundColor:'#3665C5'}} onClick={()=>document.getElementById('btn_submit_login')?.click()}>Login</button>
                        <div className="w-100 bg-info d-flex justify-content-center" style={{position:'relative'}}>
                            <hr style={{position:'absolute',top:0,left:0,width:'100%'}}/>
                            <p style={{position:'absolute',top:2}} className="text-center bg-white px-2">or continue with</p>
                        </div>
                        <div className="d-flex justify-content-center mt-5">
                            <button className="btn btn-outline-light my-2 mx-4" style={{width:60,height:60,border:'1px solid lightgray'}}>
                                <Image src="/materials/icon_fb.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
                            </button>
                            <button className="btn btn-outline-light my-2 mx-4" style={{width:60,height:60,border:'1px solid lightgray'}}>
                                <Image src="/materials/icon_google.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
                            </button>
                            <button className="btn btn-outline-light my-2 mx-4" style={{width:60,height:60,border:'1px solid lightgray'}}>
                                <Image src="/materials/icon_In.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default Page;