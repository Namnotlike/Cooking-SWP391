import TextFieldCustom from "../TextFieldCustom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Image from "next/image";
import { Button } from "@mui/material";
import React, { FormEvent } from "react";
import { Customer, JsonBody } from "@/types";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ApiEditCustomerProfile } from "@/services/CustomerService";
type Params = {
    customer: Customer,
}
const EditProfileContent = ({customer}: Params) => {
    const [selectedImage,setSelectedImage] = React.useState("");
    const fullNameArray = customer.fullName.split(" "); 
    const firstName = fullNameArray[0];
    const lastName = fullNameArray[1];

    const cities = ["New york","Bangkok","Paris"];
    const states = ["California","District 1","District 2","District 3"];

    const handleClickUpload = () => {
        const btnAvt = document.getElementById('fileAvt');
        btnAvt?.click();
    };

    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.currentTarget.files;
        if(url!=null){
            setSelectedImage(URL.createObjectURL(url[0]))
        }
    };

    const handleClickEdit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await ApiEditCustomerProfile(event,customer.id) as JsonBody;
        if(result){
            if(result.code=='01'){
                location.reload();
            }else{
                alert(result.message);
            }
        }else{
            alert("Edit failed");
        }
    };


    return (
        <div>
            <h3>EDIT PROFILE</h3>
            <div className="col-12 col-sm-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:100,width:100,border:'2px solid black',borderRadius:'50%'}} onClick={handleClickUpload}>
                {selectedImage != "" && (<Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0}  style={{height:100,width:100,border:'1px solid lightgray',borderRadius:'50%'}} />)
                    || (
                        <LazyLoadImage src={IMAGE_PATH+customer.imageUrl+".png"} style={{width:'100%',height:'100%',borderRadius:"50%"}} alt="Picture of the author"/>
                    )
                }
            </div>
            <form onSubmit={handleClickEdit}>
                <div className="row">
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p>First Name</p>
                        <TextFieldCustom id="firstname" type="text" placeholder="Input your firstname" value={firstName} required>
                        </TextFieldCustom>                        
                    </div>
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p>Last Name</p>
                        <TextFieldCustom id="lastname" type="text" placeholder="Input your lastname" value={lastName} required>
                        </TextFieldCustom>                        
                    </div>
                </div>
                <div className="form-group">
                    <p>Email</p>
                    <TextFieldCustom id="email" type="email" placeholder="Input your email" value={customer.account.email} required>
                        <MailOutlineIcon />
                    </TextFieldCustom>                          
                </div>
                <div className="form-group">
                    <p>Phone number</p>
                    <TextFieldCustom id="phone" type="number" placeholder="Input your phone" value={customer.phone} required>
                        <PhoneAndroidIcon />
                    </TextFieldCustom>                          
                </div>
                <div className="form-group">
                    <p>Address</p>
                    <TextFieldCustom id="address" type="text" placeholder="Input your address" value={customer.address}  required>
                        <LocationOnIcon />
                    </TextFieldCustom>                          
                </div>
                <div className="row">
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p>City</p>
                        <select className="form-control" id="city" style={{blockSize:56}}>
                            <option>{customer.city}</option>
                            {cities.map((row,index)=>
                                {
                                    if(row != customer.city){
                                        return (
                                            <option key={index}>{row}</option>
                                        )
                                    }
                                }
                            )}
                        </select>                 
                    </div>
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p>State</p>
                        <select className="form-control" id="state" style={{blockSize:56}}>
                            <option>{customer.state}</option>
                            {states.map((row,index)=>
                                {
                                    if(row != customer.state){
                                        return (
                                            <option key={index}>{row}</option>
                                        )
                                    }
                                }
                            )}
                        </select>                      
                    </div>
                </div>
                <input type="file" id="fileAvt" hidden className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChangeImage(event)}/>
                <Button type="submit" variant="contained" className="text-white bg-orange f-size-18 mt-3" style={{inlineSize:160}} >SAVE</Button>
            </form>
        </div>
    );
};

export default EditProfileContent;