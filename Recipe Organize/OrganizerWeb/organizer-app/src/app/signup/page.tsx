'use client';
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
const Page = () => {
    return (
            <div className="row p-0 m-0" style={{height:'100vh'}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{padding:100,backgroundImage:'url(materials/bg_login_left.svg)'}}>
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
                        <p className="text-end mt-5 mb-3" style={{fontSize:14}}>Step 1 of 2 <a href="#" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h4 className="pt-3">Register your account</h4>
                        <p className="pt-3" style={{color:'#8692A6'}}>Fill the details bellow to submit register account.</p>
                        <div className="row pt-3">
                            <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                <p>First Name</p>
                                <TextFieldCustom id="firstname" type="text" placeholder="Your firstname" required>
                                </TextFieldCustom>                        
                            </div>
                            <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                <p>Last Name</p>
                                <TextFieldCustom id="lastname" type="text" placeholder="Your lastname" required>
                                </TextFieldCustom>                        
                            </div>
                        </div>
                        <div className="form-group pt-3">
                            <p>Email</p>
                            <TextFieldCustom id="email" type="email" placeholder="Your email" required>
                                <MailOutlineIcon />
                            </TextFieldCustom>                        
                        </div>
                        <div className="form-group pt-3">
                            <p>Phone Number</p>
                            <TextFieldCustom id="phone" type="number" placeholder="Your phone" required>
                                <PhoneAndroidIcon />
                            </TextFieldCustom>                        
                        </div>
                        <div className="form-group pt-3">
                            <p>Password</p>
                            <TextFieldCustom id="password" type="password" placeholder="Your password" required>
                                <LockIcon />
                            </TextFieldCustom>
                        </div>
                        <div className="form-group pt-3">
                            <p>By signing in, you’re agree to our <a href="#" style={{color:'#3665C5'}}>Terms & Condition</a> and Privacy <a href="#" style={{color:'#3665C5'}}>Policy.</a><span className="text-danger">*</span></p>
                        </div>

                        <button className="btn text-light w-100 mb-3" style={{backgroundColor:'#3665C5'}} onClick={()=>{location.href='../signup/verify'}}>Continue</button>
        
                        <div className="d-flex justify-content-center mt-5">
                            <p>Already have account? <a href="../login" style={{color:'#3665C5'}}>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default Page;