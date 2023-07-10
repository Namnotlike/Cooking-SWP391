import LayoutMaster from "@/components/LayoutMaster";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Constant from "@/common/constant";
import { GetServerSideProps } from "next";
import { Dish, Report, JsonBody, UserInfoCookie } from "@/types";
import { ApiGetAllPaging, ApiGetByStatusPaging, ApiUpdateStatus } from "@/services/DishService";
import React, { ChangeEvent } from "react";
import TableCustom from "@/components/TableCustom";
import * as DatetimeUtils from "@/utils/DatetimeUtils"
import TableReport from "@/components/TableReport";
import { ApiGetAllReportPaging } from "@/services/ReportService";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import ShowDialog from "@/components/ShowDialog";

type Params = {
    userCookie: UserInfoCookie,
    reportData: Report[],
    totalItemData: number,
}
const Page = ({userCookie,reportData, totalItemData}:Params) => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [statusChange, setStatusChange] = React.useState("");

    const [totalItem,setTotalItem] = React.useState(totalItemData);
    const [reportSelect,setReportSelect] = React.useState(reportData && reportData[0]);
    const [dishSelect,setDishSelect] = React.useState(reportSelect && reportSelect.dish);
    const [reports, setReports] = React.useState(reportData);
    const [checked, setChecked] = React.useState(()=>{
        if(reportData[0].dish.status=='ACTIVE'){
            return 1;
        } else if(reportData[0].dish.status=='INACTIVE'){
            return 2;
        } else return 3;
    });
    const handleChangePage = async (page: number) => {
        const result = await ApiGetAllReportPaging(page,Constant.ITEM_PER_PAGE_TABLE) as JsonBody;
        if(result){
            if(result.code=='01'){
                setReports(result.data);
                setReportSelect(result.data[0]);
                setDishSelect(result.data[0].dish);
                return;
            }
        }
        alert("Change page failed");
    }

    const handleClickRowTable = (item: Report) => {
        setDishSelect(item.dish);
        setReportSelect(item);
        if(item.dish.status=='ACTIVE')
            setChecked(1);
        else if(item.dish.status=='INACTIVE')
            setChecked(2);
        else setChecked(3);
    }

    const handleSetChecked = async (index: number) => {
        var status = 'ACTIVE';
        if(index == 2)
            status = 'INACTIVE';
        else if(index == 3)
            status = 'BANNED';
        setStatusChange(status);
        handleOpenDialog();
        // const resultConfirm = confirm("Are you sure to "+status+" this recipe?")
    }

    const handleClickYesSetChecked = async () => {
        const result = await ApiUpdateStatus(userCookie.userInfo.username,dishSelect.id,statusChange);
        if(result && result.code=='01'){
            const array = [] as Report[];
            for(let i = 0;i < reports.length ; i++){
                const item = reports[i];
                if(item.dish.id!=result.data.id){
                    array.push(item);
                }else{
                    item.dish = result.data;
                    array.push(item);
                }
            }
            setReports(array);
            setDishSelect(result.data);
            if(statusChange == 'ACTIVE'){
                setChecked(1);
            }else if(statusChange == 'INACTIVE'){
                setChecked(2);
            }else{
                setChecked(3);
            }
            return;
        }
        alert("Update status for dish failed");
    }
    
    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile itemActive={8} />
                    </div>
                    <div className="col-9">
                        <h1 className="text-start color-orange mt-5">Report Manager</h1>
                        <div className='d-flex justify-content-start bg-white'>
                            <div className="d-flex justify-content-center my-3">
                                <LazyLoadImage className="img-fit" src={IMAGE_PATH+dishSelect.imageUrl+".png"} style={{width:260,height:260,borderRadius:20}} alt="Picture of the author"/>
                            </div>
                            <div className='m-3'>
                                <h2>{dishSelect.dishName}</h2>
                               
                                <p><b>Category :</b> {dishSelect.categoryDetail.name}</p>
                                <p><b>Reason :</b> <span className="text-danger">{reportSelect.reason}</span></p>
                                <p><b>Description :</b> <span className="text-danger">{reportSelect.description}</span></p>
                                <p><b>Create By :</b> {reportSelect.account.username}</p>
                                <p><b>Create At :</b> {DatetimeUtils.formatDate(dishSelect.createAt)}</p>
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
                        
                        <TableReport reports={reports} handleClickRowTable={handleClickRowTable} handleChangePage={handleChangePage} totalItem={totalItem} />
                    </div>
                </div>
            </div>
            <ShowDialog 
                content={`Are you sure to `+statusChange+` this recipe?`}
                title="Notice"
                type="info"
                buttonYesNo={true}
                open={openDialog}
                setOpen={setOpenDialog}
                handleClickYes={handleClickYesSetChecked}
            />
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
    
    const reportData = await ApiGetAllReportPaging(1,Constant.ITEM_PER_PAGE_TABLE) as JsonBody;

    const dishDataBody = await ApiGetAllPaging("1",Constant.ITEM_PER_PAGE_TABLE+"") as JsonBody;
    
    return { props: { 
        userCookie,
        reportData: reportData.data,
        dishData: dishDataBody.data,
        totalItemData: dishDataBody.totalItem
    }};
}


export default Page;


