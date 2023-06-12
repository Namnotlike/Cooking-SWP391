import LayoutMaster from "@/components/LayoutMaster";
import TableNotification from "@/components/TableNotification";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import { ApiGetNotificationByOwner, ApiGetNotificationByOwnerAndStatus, ApiUpdateStatusNotification } from "@/services/NotificationService";
import { JsonBody, Notification, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
import React, { ChangeEvent } from "react";
import * as DatetimeUtils from "@/utils/DatetimeUtils";
import * as Constant from "@/common/constant";

type Params = {
    notificationData: Notification[],
    notificationPageData: Notification[],
}

const Page = ({notificationData, notificationPageData} : Params) => {
    const [totalItem,setTotalItem] = React.useState(notificationData && notificationData.length || 0);
    const [notifications,setNotifications] = React.useState(notificationData);
    const [notificationPag,setNotificationPag] = React.useState(notificationPageData);
    const [checked, setChecked] = React.useState(1);
    const [notifacation,setNotification] = React.useState<Notification | null>(null);
    const handleClickRowTable = (row: Notification) => {
        setNotification(row);
        if(row.status=='Open')
            setChecked(1);
        else if(row.status=='Process')
            setChecked(2);
        else setChecked(3);
    }

    const handleChangePage = (page: number) => {
        const skip = (page-1)*Constant.ITEM_PER_PAGE_TABLE;
        var end = skip+Constant.ITEM_PER_PAGE_TABLE;
        if(notifications && notifications.length>0){
          if(notifications.length<end){
            end = notifications.length;
          }
          const newNoti = [] as Notification[];
          for(let i = skip; i < end; i++){
            newNoti.push(notifications[i]);
          }
          setNotificationPag(newNoti);
        }
    }

    const handleChangeStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
        const data = await ApiGetNotificationByOwnerAndStatus("Employee",event.currentTarget.value) as Notification[];
        setNotifications(data);
        setTotalItem(data && data.length || 0);
        setNotificationPag(data && data.slice(0,Constant.ITEM_PER_PAGE_TABLE));
    };

    const handleClickSave = async () => {
        if(notifacation==null){
            alert("Please choose an item.");
            return;
        }
        if((notifacation.status=="Open" && checked==1) || (notifacation.status=="Process" && checked==2) || (notifacation.status=="Resolve" && checked==3))
            return;
        const result = confirm("Do you want to save changes?");
        if(result){
            var status = "Open";
            if(checked==2)
                status = "Process";
            else if(checked==3)
                status = "Resolve";
            const result = await ApiUpdateStatusNotification(notifacation.id+"",status) as JsonBody;
            if(result){
                if(result.code=='01'){
                    setNotifications((notifacations)=>notifacations && notifacations.filter((noti)=>noti.id != result.data.id));
                    setNotification(null);
                    setChecked(1);
                    
                }else if(result.code=='02'){
                    alert(result.message);
                }
            }else{
                alert("Save failed");
            }

        }
    }

    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={false} itemActive={6}/>
                    </div>
                    <div className="col-9 px-5">
                        <h3 className="color-orange mt-5">NOTIFICATION</h3>
                        <div className="my-3 p-5" style={{backgroundColor:'lightyellow',borderRadius:20,border:'1px solid lightgray'}}>
                            <div className="d-flex">
                                <div className="d-flex">
                                    <div className="ws-80"><b>Sender: </b></div> <span className="me-5">{notifacation && notifacation.createBy.username}</span>
                                </div>
                                <b className="me-3">Role: </b><span className="me-5">{notifacation && notifacation.createBy.role.roleName}</span>
                                <b className="me-3">Create at: </b> <span>{notifacation && DatetimeUtils.formatDate(notifacation.createAt)}</span>
                            </div>
                            <div className="d-flex my-3">
                                <div className="ws-80">
                                    <b>Status: </b>
                                </div>
                                <div className="form-group d-flex align-items-center">
                                    <div className="form-check me-5" onClick={()=>setChecked(1)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={checked==1 && true} readOnly/>
                                        <label className="form-check-label">Open</label>
                                    </div>
                                    <div className="form-check me-5" onClick={()=>setChecked(2)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked={checked==2 && true} readOnly />
                                        <label className="form-check-label">Process</label>
                                    </div>
                                    <div className="form-check" onClick={()=>setChecked(3)}>
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" checked={checked==3 && true} readOnly />
                                        <label className="form-check-label">Resolve</label>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3 d-flex">
                                <div className="ws-80">
                                    <b>Content: </b> 
                                </div>
                                <span>{notifacation && notifacation.content}</span>
                            </div>
                            <button className="btn bg-orange ws-150" onClick={handleClickSave}>Save</button>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="flex-grow-1"></div>
                            <select className="form-select ws-150" onChange={(event: ChangeEvent<HTMLSelectElement>)=>handleChangeStatus(event)}>
                                <option>Open</option>
                                <option>Process</option>
                                <option>Resolve</option>
                            </select>
                        </div>
                        <TableNotification notifications={notificationPag} handleClickRowTable={handleClickRowTable} handleChangePage={handleChangePage} totalItem={totalItem}/>
                    </div>
                </div>
            </div>
        </LayoutMaster>
    )
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

    const notificationData = await ApiGetNotificationByOwnerAndStatus("Employee","Open") as Notification[];
    const notificationPageData = notificationData && notificationData.slice(0,Constant.ITEM_PER_PAGE_TABLE);
    return { props: { 
        notificationData,
        notificationPageData,
    } };
}

export default Page;