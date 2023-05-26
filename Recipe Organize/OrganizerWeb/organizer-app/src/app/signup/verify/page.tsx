'use client';
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import React from 'react';
import OptInput from "@/components/OptInput";
const Page = () => {
    const handleSubmitVerify = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        var digit = "";
        for(let i = 1; i <= 6; i++){
            const item = (document.getElementById("digit"+i) as HTMLInputElement).value.trim();
            digit+=item;
        }
        alert(digit);
    } 
    return (
            <div className="row p-0 m-0" style={{height:'100vh'}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{padding:100,backgroundImage:'url(../materials/bg_login_left.svg)'}}>
                        <p style={{color: '#3665C5',fontSize:18}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vestibulum suspendisse gravida dictumst eget. 
                            Tincidunt a placerat orci, lobortis quam. 
                            Eget sit rhoncus sed lobortis aenean et pretium. 
                            Etiam nulla elementum aenean nec. 
                            Viverra a porttitor posuere ornare velit vestibulum enim. Suscipit ac elit a vel ut. 
                            Id fames amet ipsum eu.
                        </p>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end mt-5 mb-3" style={{fontSize:14}}>Step 2 of 2 <a href="#" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h4 className="pt-3">Check your Mail</h4>
                        <p className="pt-3" style={{color:'#8692A6'}}>We,ve sent a 6-digit confirmation code to <a href="#" style={{color:'#3665C5'}}>username@gmail.com.</a> Make sure you enter correct code.</p>
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

export default Page;