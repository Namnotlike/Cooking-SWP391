import LayoutMaster from "@/components/LayoutMaster";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Constant from "@/common/constant";
import { GetServerSideProps } from "next";
import { Dish, JsonBody, UserInfoCookie } from "@/types";
import { ApiGetAllPaging, ApiGetByStatusPaging, ApiUpdateStatus } from "@/services/DishService";
import React, { ChangeEvent } from "react";
import TableCustom from "@/components/TableCustom";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import LeftBarProfile from "@/components/profile/LeftBarProfile";

type Params = {
    userCookie: UserInfoCookie,
    dishData: Dish[],
    totalItemData: number,
}
const Page = ({userCookie, dishData, totalItemData}:Params) => {
    const [totalItem,setTotalItem] = React.useState(totalItemData);
    const [dishPag, setDishPag] = React.useState(dishData);
    const [dishSelect,setDishSelect] = React.useState(dishPag[0]);
    const [checked, setChecked] = React.useState(()=>{
        if(dishPag[0].status=='ACTIVE'){
            return 1;
        } else if(dishPag[0].status=='INACTIVE'){
            return 2;
        } else return 3;
    });
    const handleChangePage = async (page: number) => {
        const result = await ApiGetAllPaging(page+"",Constant.ITEM_PER_PAGE_TABLE+"") as JsonBody;
        if(result){
            if(result.code=='01'){
                setDishPag(result.data);
                setDishSelect(result.data[0]);
                return;
            }
        }
        alert("Change page failed");
    }

    const handleClickRowTable = (item: Dish) => {
        setDishSelect(item);
        if(item.status=='ACTIVE')
            setChecked(1);
        else if(item.status=='INACTIVE')
            setChecked(2);
        else setChecked(3);
    }

    const handleSetChecked = async (index: number) => {
        var status = 'ACTIVE';
        if(index == 2)
            status = 'INACTIVE';
        else if(index == 3)
            status = 'BANNED';
        const resultConfirm = confirm("Are you sure to "+status+" this recipe?")
        if(resultConfirm){
            const result = await ApiUpdateStatus(userCookie.userInfo.username,dishSelect.id,status);
            if(result && result.code=='01'){
                const array = [] as Dish[];
                for(let i = 0;i < dishPag.length ; i++){
                    const item = dishPag[i];
                    if(item.id!=result.data.id){
                        array.push(item);
                    }else{
                        array.push(result.data);
                    }
                }
                setDishPag(array);
                setDishSelect(result.data);
                setChecked(index);
                return;
            }
            alert("Update status for dish failed");
        }
    }
    const handleChangeStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
        const status = event.currentTarget.value;
        const result = await ApiGetByStatusPaging(status);
        if(result && result.code=='01'){
            setDishPag(result.data);
            if(result.totalItem){
                setTotalItem(result.totalItem);
                setDishSelect(result.data[0]);
                if(result.data[0].status=='ACTIVE'){
                    setChecked(1);
                } else if(result.data[0].status=='INACTIVE'){
                    setChecked(2);
                } else setChecked(3);
            }
            return;
        }
        alert("Get data status failed")
    }
    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile itemActive={7} />
                    </div>
                    <div className="col-9">
                        <h1 className="text-start color-orange mt-5">Recipe Manager</h1>
                        <div className='d-flex justify-content-start bg-white'>
                            <div className="d-flex justify-content-center my-3">
                                <LazyLoadImage className="img-fit" src={IMAGE_PATH+dishSelect.imageUrl+".png"} style={{width:260,height:260,borderRadius:20}} alt="Picture of the author"/>
                            </div>
                            <div className='m-3'>
                                <h2>{dishSelect.dishName}</h2>
                                <p><b>Cooker :</b> {dishSelect.cookerName}</p>
                                <p><b>Servings :</b> {dishSelect.servings} <b className="ms-3">Meal Time :</b> {dishSelect.mealTime}</p>
                                <p><b>Create At :</b> {DatetimeUtils.formatDate(dishSelect.createAt)}</p>
                                <p><b>Category :</b> {dishSelect.categoryDetail.name}</p>
                                <div className="d-flex my-3">
                                <div className="ws-80">
                                    <b>Status: </b>
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <div className="form-check me-5" onClick={()=>handleSetChecked(1)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={checked==1 && true} readOnly/>
                                        <label className="form-check-label">Active</label>
                                    </div>
                                    <div className="form-check me-5" onClick={()=>handleSetChecked(2)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={checked==2 && true} readOnly />
                                        <label className="form-check-label">Inactive</label>
                                    </div>
                                    <div className="form-check" onClick={()=>handleSetChecked(3)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked={checked==3 && true} readOnly />
                                        <label className="form-check-label">Banned</label>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <select className="form-select ws-150 my-3" onChange={(event)=>handleChangeStatus(event)}>
                            <option>ACTIVE</option>
                            <option>INACTIVE</option>
                            <option>BANNED</option>
                        </select>
                        <TableCustom dishes={dishPag} handleClickRowTable={handleClickRowTable} handleChangePage={handleChangePage} totalItem={totalItem} />
                    </div>
                </div>
            </div>
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params, req, res } = context;

    const { userInfoCookie } = req.cookies;
    var userCookie = null;

    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }
    // REDIRECT TO LOGIN
    if (userCookie === null) {
        res.writeHead(302, { Location: "../login" });
        res.end();
        return { props: {} };
    }
    
    const dishDataBody = await ApiGetAllPaging("1",Constant.ITEM_PER_PAGE_TABLE+"") as JsonBody;
    
    return { props: { 
        userCookie,
        dishData: dishDataBody.data,
        totalItemData: dishDataBody.totalItem
    }};
}


export default Page;


