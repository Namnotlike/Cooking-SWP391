import Image from "next/image";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { FormEvent } from "react";
import Link from "next/link";
import TextFieldCustom from "@/components/TextFieldCustom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Button } from "@mui/material";
import { ApiForgotNewPassword, ApiForgotSendEmail, ApiForgotVerifyDigit } from "@/services/AccountService";
import OptInput from "@/components/OptInput";
import LockIcon from '@mui/icons-material/Lock';
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const Page = () => {
    const router = useRouter();
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const [email, setEmail] = React.useState("");
    const [step, setStep] = React.useState(1);
    const [timer, setTimer] = React.useState(60);
    const countdownIntervalRef = React.useRef<NodeJS.Timeout>();
    const handleSubmitSendEmail = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value.trim();
        const result = await ApiForgotSendEmail(email);
        if(result && result.code=='01'){
            setTimer(60);
            setEmail(email);
            setStep(2);
        }else{
            alert("Send email failed");
        }
    }
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
    
    
    const handleSubmitVerify = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(timer<=0){
            alert("Digit code expired");
            return;
        }
        var digit = "";
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement).value.trim();
            digit+=item;
        }
        const result = await ApiForgotVerifyDigit(email, digit);
        if(result && result.code=='01'){
            setStep(3);
        }else{
            alert("Digit code invalid");
        }
    } 

    const handleSubmitResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const password = event.currentTarget.password.value.trim();
        const confirmPassword = event.currentTarget.confirmPassword.value.trim();
        if(password.length<6){
            alert("Password must be at least 6 characters long.")
            return;
        }
        if(password!=confirmPassword){
            alert("Password confirm was wrong");
            return;
        }
        const result = await ApiForgotNewPassword(email, password);
        if(result && result.code=='01'){
            setCookieUser("userInfoCookie", result.data, {path: "/"});
            router.push("/");
        }else{
            alert("Create new password failed");
        }
    }

    return(
        <div className="row m-0 bg-white" style={{height:'100vh',paddingInline:200}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex align-items-center h-100 w-100" style={{position:'relative'}}>
                        <Image src="/materials/bg_login_left.svg" width={0} height={0} style={{position:'absolute',top:0,left:0,width:'100%',height:'auto'}} alt="Picture of the author" />
                        <div className="d-flex align-items-center hover_text_green" style={{position:'absolute',top:30,left:30}} onClick={()=>{router.push("/login")}}>
                            <ArrowBackIcon />
                            <span className="ms-2">Back to login page</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end mt-5 mb-3" style={{fontSize:14}}>Step {step} of 3 <a href="#" style={{color:'#3665C5'}}>Forgot Password</a></p>
                        <h4 className="pt-3">Forgot password</h4>
                        {step==1 && (
                            <form onSubmit={handleSubmitSendEmail}>
                                <div className="form-group pt-3">
                                    <label>Enter your Email</label>
                                    <div className="d-flex mt-3">
                                        <TextFieldCustom id="email" type="email" placeholder="Input your email" required>
                                            <MailOutlineIcon />
                                        </TextFieldCustom>
                                        <Button type="submit" variant="contained" className="ws-100">Send</Button>     
                                    </div>                  
                                </div>
                            </form>
                        ) || step == 2 && (
                            <>
                                <p className="pt-3" style={{color:'#8692A6'}}>We,ve sent a 6-digit confirmation code to <a href="#" style={{color:'#3665C5'}}>{email && email || 'user@gmail.com'}.</a> Make sure you enter correct code within ({timer}s).</p>
                                <form onSubmit={handleSubmitVerify}>
                                    <OptInput />
                                    <button type="submit" className="btn text-light w-100 my-3" style={{backgroundColor:'#3665C5'}}>Verify</button>
                                </form>
                            </>
                        )|| step == 3 && (
                            <form onSubmit={handleSubmitResetPassword}>
                                <div className="form-group pt-3">
                                    <p><b>New password:</b></p>
                                    <TextFieldCustom id="password" type="password" placeholder="New password" required>
                                        <LockIcon />
                                    </TextFieldCustom>
                                </div>
                                <div className="form-group pt-3 mb-5">
                                    <p><b>Confirm password:</b></p>
                                    <TextFieldCustom id="confirmPassword" type="password" placeholder="Enter confirm password" required>
                                        <LockIcon />
                                    </TextFieldCustom>
                                </div>
                                <Button type="submit" variant="contained">Reset password</Button>     
                            </form>
                        )}
                        
                    </div>
                </div>
            </div>
    );
};

export default Page;