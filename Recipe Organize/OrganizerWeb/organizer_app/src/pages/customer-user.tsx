import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import TinyEditor from "@/pluggins/tiny_editor";
import { ApiAcceptCookerById, ApiEditAccountStatusCookerById, ApiGetCookerByStatus, ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiEditAccountStatusCustomerById, ApiGetCustomerByStatus, ApiGetCustomerByUsername } from "@/services/CustomerService";
import { ApiCreateDish, ApiDeleteDish, ApiGetDishByFavorite, ApiUpdateDish } from "@/services/DishService";
import { CategoryDetail, Cooker, Customer, Dish, Favorite, JsonBody, Tag, UserInfoCookie } from "@/types";
import { Chip } from "@mui/material";
import { GetServerSideProps } from "next";
import React, { ChangeEvent, FormEvent } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getAllTag } from "@/services/TagService";
import { ApiGetAllCategoryDetail } from "@/services/CategoryDetailService";
import Image from "next/image";
import { useCookies } from "react-cookie";
import TableCustom from "@/components/TableCustom";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Constant from "@/common/constant";
import { ApiDeleteCustomize, ApiSubmitCustomize } from "@/services/CustomizeService";
import { ApiGetFavoriteByAccountId } from "@/services/FavoriteService";
import TableCustomize from "@/components/TableCustomize";
import TableUser from "@/components/TableUser";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
type Params = {
    userCookie: UserInfoCookie,
    cookerData: Cooker[],
    cookerPageData: Cooker[],
}
const Page = ({userCookie, cookerData, cookerPageData}:Params) => {
    const [totalItem,setTotalItem] = React.useState(cookerData && cookerData.length || 0);
    const [object,setObject] = React.useState("1");
    const [status,setStatus] = React.useState("1");
    const [cookers,setCookers] = React.useState<Cooker[] | null>(cookerData);
    const [cookerPag,setCookerPag] = React.useState<Cooker[] | null>(cookerPageData);
    const [customers,setCustomers] = React.useState<Customer[] | null>([]);
    const [customerPag,setCustomerPag] = React.useState<Customer[] | null>([]);
    const [selectedId,setSelectedId] = React.useState(-1);
    // const [indexSelected,setIndexSelected] = React.useState(-1);
    const [fullName,setFullName] = React.useState("");
    const [username,setUsername] = React.useState("");
    const [email,setEmail] = React.useState("");
    const [phone,setPhone] = React.useState("");
    const [role,setRole] = React.useState("");
    const [accountStatus,setAccountStatus] = React.useState("");
    const [address,setAddress] = React.useState("");
    const [state,setState] = React.useState("");
    const [city,setCity] = React.useState("");

    const handleChangeObject = async (event: ChangeEvent<HTMLSelectElement>) => {
            setObject(event.currentTarget.value);
            handleSearch(event.currentTarget.value,status);
    };

    const handleChangeStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
            setStatus(event.currentTarget.value);
            handleSearch(object,event.currentTarget.value);
    };

    const handleSearch = async (object: string, status: string) => {
            if(object=="1" && status=="1"){
                const data = await ApiGetCookerByStatus("ACTIVE",true);
                setCustomers([]);
                setCustomerPag([]);
                setTotalItem(data && data.length || 0);
                setCookers(data);
                setCookerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="1" && status=="2"){
                const data = await ApiGetCookerByStatus("INACTIVE",false);
                setCustomers([]);
                setCustomerPag([]);
                setTotalItem(data && data.length || 0);
                setCookers(data);
                setCookerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="1" && status=="3"){
                const data = await ApiGetCookerByStatus("BANNED",true);
                setCustomers([]);
                setCustomerPag([]);
                setTotalItem(data && data.length || 0);
                setCookers(data);
                setCookerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="2" && status=="1"){
                const data = await ApiGetCookerByStatus("ACTIVE",false);
                setCustomers([]);
                setCustomerPag([]);
                setTotalItem(data && data.length || 0);
                setCookers(data);
                setCookerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="3" && status=="1"){
                const data = await ApiGetCustomerByStatus("ACTIVE");
                setCookers([]);
                setCookerPag([]);
                setTotalItem(data && data.length || 0);
                setCustomers(data);
                setCustomerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="3" && status=="2"){
                const data = await ApiGetCustomerByStatus("INACTIVE");
                setCookers([]);
                setCookerPag([]);
                setTotalItem(data && data.length || 0);
                setCustomers(data);
                setCustomerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }else if(object=="3" && status=="3"){
                const data = await ApiGetCustomerByStatus("BANNED");
                setCookers([]);
                setCookerPag([]);
                setTotalItem(data && data.length || 0);
                setCustomers(data);
                setCustomerPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
                resetInfo();
            }
    }
    const resetInfo = () => {
        setSelectedId(-1);
        setFullName("");
        setUsername("");
        setEmail("");
        setPhone("");
        setRole("");
        setAccountStatus("");
        setAddress("");
        setState("");
        setCity("");
    }
    const handleClickRowTable = (item: any) => {
        if(item.account.role.roleName=='Cooker'){
            const cooker = item as Cooker;
            setSelectedId(cooker.id);
            setFullName(cooker.fullName);
            setUsername(cooker.account.username);
            setPhone(cooker.phone);
            setEmail(cooker.account.email);
            setRole(cooker.account.role.roleName);
            setAccountStatus(cooker.account.status);
            setAddress(cooker.address);
            setState(cooker.state);
            setCity(cooker.city);
        }else if(item.account.role.roleName=='Customer'){
            const customer = item as Customer;
            setSelectedId(customer.id);
            setFullName(customer.fullName);
            setUsername(customer.account.username);
            setPhone(customer.phone);
            setEmail(customer.account.email);
            setRole(customer.account.role.roleName);
            setAccountStatus(customer.account.status);
            setAddress(customer.address);
            setState(customer.state);
            setCity(customer.city);
        }
    };

    const handleAcceptCooker = async () => {
        if(selectedId==-1){
            alert("Please choose a cooker to accept!");
            return;
        }
        const resultConfirm = confirm("Are you sure to accept this cooker?");
        if(resultConfirm){
            const  result = await ApiAcceptCookerById(userCookie.userInfo.username,selectedId+"") as JsonBody;
            if(result){
                if(result.code=='01'){
                    setSelectedId(-1);
                    setCookerPag((cookerPag)=>cookerPag && cookerPag.filter((cooker)=>cooker.id != result.data.id));
                }else if(result.code=='02'){
                    alert(result.message);
                }
            }else{
                alert("Accept Failed");
            }
        }
    }

    const handleBanCooker = async () => {
        var objectName = "Cooker";
        if(object=="3"){
            objectName = "Customer";
        }
        if(selectedId==-1){
            alert("Please choose a "+objectName+" to accept!");
            return;
        }
        const resultConfirm = confirm("Are you sure to BAN this "+objectName+"?");
        if(resultConfirm){
            var result = null as any;
            if(object=="3")
                result = await ApiEditAccountStatusCustomerById(selectedId+"","BANNED") as JsonBody;
            else result = await ApiEditAccountStatusCookerById(userCookie.userInfo.username,selectedId+"","BANNED") as JsonBody;
            if(result){
                if(result.code=='01'){
                    setSelectedId(-1);
                    if(object=="3")
                        setCustomerPag((customerPag)=>customerPag && customerPag.filter((customer)=>customer.id != result.data.id));
                    else setCookerPag((cookerPag)=>cookerPag && cookerPag.filter((cooker)=>cooker.id != result.data.id));
                }else if(result.code=='02'){
                    alert(result.message);
                }
            }else{
                alert("Ban Failed");
            }
        }
    }

    const handleChangePage = (page: number) => {
        const skip = (page-1)*Constant.ITEM_PER_PAGE_TABLE;
        var end = skip+Constant.ITEM_PER_PAGE_TABLE;
        if(customers && customers.length>0){
          if(customers.length<end){
            end = customers.length;
          }
          const newCustomers = [] as Customer[];
          for(let i = skip; i < end; i++){
            newCustomers.push(customers[i]);
          }
          setCustomerPag(newCustomers);
        }else if(cookers && cookers.length>0){
          if(cookers.length<end){
            end = cookers.length;
          }
          const newCookers = [] as Cooker[];
          for(let i = skip; i < end; i++){
            newCookers.push(cookers[i]);
          }
          setCookerPag(newCookers);
        }
    }

    const handleActiveCooker = async () => {
        var objectName = "Cooker";
        if(object=="3"){
            objectName = "Customer";
        }
        if(selectedId==-1){
            alert("Please choose a BANNED "+objectName+" to active!");
            return;
        }
        const resultConfirm = confirm("Are you sure to ACTIVE this "+objectName+"?");
        if(resultConfirm){
            var result = null as any;
            if(object=="3")
                result = await ApiEditAccountStatusCustomerById(selectedId+"","ACTIVE") as JsonBody;
            else result = await ApiEditAccountStatusCookerById(userCookie.userInfo.username,selectedId+"","ACTIVE") as JsonBody;
            if(result){
                if(result.code=='01'){
                    setSelectedId(-1);
                    if(object=="3")
                        setCustomerPag((customerPag)=>customerPag && customerPag.filter((customer)=>customer.id != result.data.id));
                    else setCookerPag((cookerPag)=>cookerPag && cookerPag.filter((cooker)=>cooker.id != result.data.id));
                }else if(result.code=='02'){
                    alert(result.message);
                }
            }else{
                alert("Active Failed");
            }
        }
    }

    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={false} itemActive={5}/>
                    </div>
                    <div className="pe-5 col-9 py-3 mt-5">
                        <div>
                            <h1 className="color-orange text-start">CUSTOMER & COOKER</h1>
                            <div className="row">
                                <div className="d-flex my-2">
                                    <select className="form-select me-2" style={{width:200}} onChange={(event: ChangeEvent<HTMLSelectElement>)=>handleChangeObject(event)} >
                                        <option value="1">Cooker</option>
                                        <option value="2">Cooker - Wait Accept</option>
                                        <option value="3">Customer</option>
                                    </select>
                                    <select className="form-select"  style={{width:120}} onChange={(event: ChangeEvent<HTMLSelectElement>)=>handleChangeStatus(event)}>
                                        <option value="1">ACTIVE</option>
                                        <option value="2">INACTIVE</option>
                                        <option value="3">BANNED</option>
                                    </select>
                                </div>
                                <div className="col-8">
                                    <TableUser handleChangePage={handleChangePage} handleClickRowTable={handleClickRowTable} cookers={cookerPag && cookerPag || []} customers={customerPag && customerPag || []} totalItem={totalItem} />
                                </div>
                                <div className="col-4 pt-3" style={{height:470, borderRadius:20, backgroundColor:'lightyellow',border:'1px solid lightgray'}} >
                                    <h5 className="text-center color-orange">-- USER INFOMATION --</h5>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Full Name: </b></div>
                                        <span>{fullName}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Username: </b></div>
                                        <span>{username}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Phone: </b></div>
                                        <span>{phone}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Email: </b></div>
                                        <span>{email}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Role: </b></div>
                                        <span>{role}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Account Status: </b></div>
                                        <span>{accountStatus}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>Address: </b></div>
                                        <span>{address}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>State: </b></div>
                                        <span>{state}</span>
                                    </div>
                                    <div className="d-flex my-2">
                                        <div style={{width:150}}><b>City: </b></div>
                                        <span>{city}</span>
                                    </div>
                                    <div className="mt-4">
                                        {object=="2" && status=="1" && (
                                            <button className="btn bg-orange w-100 mt-2" style={{width:100}} onClick={handleAcceptCooker}>ACCEPT</button>
                                        )}
                                        {(object=="1" || object=="3") && status=="3" && (
                                            <button className="btn bg-orange w-100 mt-2" onClick={handleActiveCooker}>ACTIVE</button>
                                        ) || (
                                            <button className="btn btn-outline-orange w-100 mt-2" style={{width:100}} onClick={handleBanCooker}>BAN</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params,query, req, res } = context;
    const { userInfoCookie } = req.cookies;
    var userCookie = null;

    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }
    // REDIRECT TO HOME
    if (userCookie === null) {
        res.writeHead(302, { Location: "../" });
        res.end();
        return { props: {} };
    }

    const cookerData = await ApiGetCookerByStatus("ACTIVE",true) as Cooker[];
    const cookerPageData = cookerData && cookerData.slice(0,Constant.ITEM_PER_PAGE_TABLE);
    return { props: { 
        userCookie,
        cookerData,
        cookerPageData
    } };
}


export default Page;