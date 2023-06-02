import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import Image from "next/image";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TextFieldCustom from "@/components/TextFieldCustom";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LockIcon from '@mui/icons-material/Lock';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React, { FormEvent } from "react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { ApiRegistry } from "@/services/AccountService";
import { useCookies } from "react-cookie";
import path from "path";
import { JsonBody } from "@/types";
const Page = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userVerify']);
    const [selectedImage,setSelectedImage] = React.useState("");
    const handleClickUpload = () => {
        const btnAvt = document.getElementById('fileAvt');
        btnAvt?.click();
    }
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.currentTarget.files;
        if(url!=null){
            setSelectedImage(URL.createObjectURL(url[0]))
        }
    }
    const handleSubmitSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value.trim();
        const username = event.currentTarget.username.value.trim();
        const password = event.currentTarget.password.value.trim();
        const result = await ApiRegistry(event) as JsonBody;
        if(result){
            if(result.code=='01'){
                setCookie('userVerify',{
                    email,
                    username,
                    password
                },{path: '/'});
                location.href="../signup/verify";
            }else{
                alert(result.message);
            }
        }
    }
    return (
            <div className="row p-0 m-0 bg-white" style={{height:'100vh'}}>
                <div className="d-none d-sm-none d-md-none d-lg-block col-sm-6">
                    <div className="d-flex justify-content align-items-center w-100 h-100" style={{padding:100,backgroundImage:'url(materials/bg_login_left.svg)'}}>
                       {/* NOTHING */}
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 row d-flex justify-content-center m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <p className="text-end mt-2 mb-3" style={{fontSize:14}}>Step 1 of 2 <a href="#" style={{color:'#3665C5'}}>Sign Up</a></p>
                        <h4 className="pt-3">Register your account</h4>
                        <p className="pt-3" style={{color:'#8692A6'}}>Fill the details bellow to submit register account.</p>
                        <form onSubmit={handleSubmitSignup}>
                            <div className="col-12 col-sm-7 bg-lightgray row p-3 ms-1" style={{borderRadius:20}}>
                                <div className="col-12 col-sm-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:100,width:100,border:'2px solid black',borderRadius:'50%'}} onClick={handleClickUpload}>
                                        {selectedImage != "" && (<Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0}  style={{height:100,width:100,border:'1px solid lightgray',borderRadius:'50%'}} />)
                                            || (
                                                <PersonOutlineIcon sx={{fontSize:68}}/>
                                            )
                                        }
                                </div>
                                <div className="col-12 col-sm-8 d-flex align-items-center">
                                    <div>
                                        <span className="text-secondary">Account Avatar</span><br/>
                                        <span><b>Choose from local</b></span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>Username</p>
                                    <TextFieldCustom id="username" type="text" placeholder="Input your username" required>
                                    </TextFieldCustom>                        
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>Email</p>
                                    <TextFieldCustom id="email" type="email" placeholder="Input your email" required>
                                        <MailOutlineIcon />
                                    </TextFieldCustom>                          
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>First Name</p>
                                    <TextFieldCustom id="firstname" type="text" placeholder="Input your firstname" required>
                                    </TextFieldCustom>                        
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>Last Name</p>
                                    <TextFieldCustom id="lastname" type="text" placeholder="Input your lastname" required>
                                    </TextFieldCustom>                        
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>Phone Number</p>
                                    <TextFieldCustom id="phone" type="number" placeholder="Your phone" required>
                                        <PhoneAndroidIcon />
                                    </TextFieldCustom>                      
                                </div>
                                <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                                    <p>Gender</p>
                                    <select className="form-control" id="gender" style={{blockSize:56}}>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>                       
                                </div>
                            </div>
                            <div className="form-group pt-3">
                                <p>Date of birth</p>
                                <input type="date" className="form-control" id="dateOfBirth" style={{blockSize:56}} required />
                            </div>
                            <div className="form-group pt-3">
                                <p>Password</p>
                                <TextFieldCustom id="password" type="password" placeholder="Your password" required>
                                    <LockIcon />
                                </TextFieldCustom>
                            </div>
                            <div className="form-group pt-3">
                                <div className="d-flex align-items-center my-2">
                                    <input type="checkbox" id="isCooker" className="me-2" style={{width:20,height:20}} />
                                    <label>Sign up as Cooker</label>
                                </div>
                                <p>By signing in, you’re agree to our <a href="#" style={{color:'#3665C5'}}>Terms & Condition</a> and Privacy <a href="#" style={{color:'#3665C5'}}>Policy.</a><span className="text-danger">*</span></p>
                            </div>
                            <input type="file" id="fileAvt" hidden className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChangeImage(event)}/>
                                    
                            <button type="submit" className="btn text-light w-100 mb-3" style={{backgroundColor:'#3665C5'}}>Continue</button>
                        </form>
                        <div className="d-flex justify-content-center mt-2">
                            <p>Already have account? <a href="../login" style={{color:'#3665C5'}}>Login</a></p>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default Page;