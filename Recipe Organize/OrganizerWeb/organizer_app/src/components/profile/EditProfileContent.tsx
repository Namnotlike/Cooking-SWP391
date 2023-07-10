import TextFieldCustom from "../TextFieldCustom";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Image from "next/image";
import { Button } from "@mui/material";
import React, { FormEvent } from "react";
import { Cooker, Customer, Employee, JsonBody } from "@/types";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ApiEditCustomerProfile } from "@/services/CustomerService";
import { ApiEditCookerProfile } from "@/services/CookerService";
import { ApiEditEmployeeProfile } from "@/services/EmployeeService";
type Params = {
    customer?: Customer,
    cooker?: Cooker,
    employee?: Employee,
}
const EditProfileContent = ({customer, cooker, employee}: Params) => {
    const [selectedImage,setSelectedImage] = React.useState("");

    var id = customer && customer.id as number;
    var fullName = customer && customer.fullName;
    var imageUrl = customer && customer.imageUrl;
    var phone = customer && customer.phone;
    var email = customer && customer.account.email;
    var address = customer && customer.address;
    var city = customer && customer.city;
    var state = customer && customer.state;
    
    if(cooker){
        id = cooker.id;
        fullName = cooker.fullName;
        imageUrl = cooker.imageUrl;
        phone = cooker.phone;
        email = cooker.account.email;
        address = cooker.address;
        city = cooker.city;
        state = cooker.state;
    }else if(employee){
        id = employee.id;
        fullName = employee.fullName;
        imageUrl = employee.imageUrl;
        phone = employee.phone;
        email = employee.account.email;
        address = employee.address;
        city = employee.city;
        state = employee.state;
    }
    


    const fullNameArray = fullName?.split(" "); 
    const firstName = fullNameArray && fullNameArray.length > 0  && fullNameArray[0] || "";
    const lastName = fullNameArray && fullNameArray.length > 1  && fullNameArray[1] || "";
    

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
        const resultConfirm = confirm("Do you want to save changes?");
        if(!resultConfirm)
            return;
        if(!id)
            return;
        var result;
        if(customer){
            result = await ApiEditCustomerProfile(event,id) as JsonBody;
        }
        else if(cooker){
            result = await ApiEditCookerProfile(event,id) as JsonBody;
        }else{
            result = await ApiEditEmployeeProfile(event,id) as JsonBody;
        }
        if(result){
            if(result.code=='01'){
                alert("Successfully updated information.");
            }else{
                alert(result.message);
            }
        }else{
            alert("Edit failed");
        }
    };


    return (
        <div>
            <h3 className="color-orange">UPDATE PROFILE</h3>
            <div className="col-12 col-sm-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:150,width:150,border:'2px solid black',borderRadius:'50%'}} onClick={handleClickUpload}>
                {selectedImage != "" && (<Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0}  style={{height:150,width:150,border:'1px solid lightgray',borderRadius:'50%'}} />)
                    || (
                        <LazyLoadImage src={IMAGE_PATH+imageUrl+".png"} style={{width:'100%',height:'100%',borderRadius:"50%"}} alt="Picture of the author"/>
                    )
                }
            </div>
            <form onSubmit={handleClickEdit}>
                <div className="row">
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p style={{fontWeight:'bold'}}>First Name</p>
                        <input className="form-control hs-60" type="text" id="firstname" defaultValue={firstName} required placeholder="Input your firstname"/>
                    </div>
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p style={{fontWeight:'bold'}}>Last Name</p>
                        <input className="form-control hs-60" type="text" id="lastname" defaultValue={lastName} required placeholder="Input your lastname"/>
                    </div>
                </div>
                <div className="form-group pt-3">
                    <p style={{fontWeight:'bold'}}>Email</p>
                    <input className="form-control hs-60" type="email" id="email" defaultValue={email} required placeholder="Input your email"/>
                </div>
                <div className="form-group pt-3">
                    <p style={{fontWeight:'bold'}}>Phone number</p>
                    <input className="form-control hs-60" type="number" id="phone" defaultValue={phone} required placeholder="Input your phone"/>
                </div>
                <div className="form-group pt-3">
                    <p style={{fontWeight:'bold'}}>Address</p>
                    <input className="form-control hs-60" type="text" id="address" defaultValue={address} required placeholder="Input your address"/>
                </div>
                <div className="row">
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p style={{fontWeight:'bold'}}>City</p>
                        <select className="form-control" id="city" style={{blockSize:56}}>
                            {city && (
                                <option>{city}</option>
                            )}
                            {cities.map((row,index)=>
                                {
                                    if(row != city){
                                        return (
                                            <option key={index}>{row}</option>
                                        )
                                    }
                                }
                            )}
                        </select>                 
                    </div>
                    <div className="form-group col-12 col-sm-12 col-md-6 pt-3">
                        <p style={{fontWeight:'bold'}}>State</p>
                        <select className="form-control" id="state" style={{blockSize:56}}>
                            {state && (
                                <option>{state}</option>
                            )}
                            {states.map((row,index)=>
                                {
                                    if(row != state){
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
                <div className="d-flex">
                    <Button type="submit" className="bg-orange f-size-18 mt-4 me-3" style={{inlineSize:160}} >SAVE</Button>
                    <button type="button" className="btn btn-outline-orange f-size-18 mt-4" >CHANGE PASSWORD</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileContent;