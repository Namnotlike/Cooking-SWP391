import LayoutMaster from "@/components/LayoutMaster";
import TableNotification from "@/components/TableNotification";
import { ApiGetNotificationByOwner, ApiGetNotificationByOwnerAndStatus, ApiGetNotificationByUsername, ApiUpdateStatusNotification } from "@/services/NotificationService";
import { Cooker, JsonBody, Notification, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
import React, { ChangeEvent } from "react";
import * as DatetimeUtils from "@/utils/DatetimeUtils";
import * as Constant from "@/common/constant";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import { ApiGetCookerByUsername } from "@/services/CookerService";

type Params = {
    cookerData: Cooker,
    notificationData: Notification[],
    notificationPageData: Notification[],
}

const Page = ({cookerData, notificationData, notificationPageData} : Params) => {
    const [totalItem,setTotalItem] = React.useState(notificationData && notificationData.length || 0);
    const [notifications,setNotifications] = React.useState(notificationData);
    const [notificationPag,setNotificationPag] = React.useState(notificationPageData);
    const [notifacation,setNotification] = React.useState<Notification | null>(null);
    const handleClickRowTable = (row: Notification) => {
        setNotification(row);
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

    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={cookerData && cookerData.status} itemActive={9}/>
                    </div>
                    <div className="col-9 px-5">
                        <h3 className="color-orange mt-5">NOTIFICATION</h3>
                        <div className="my-3 px-5 py-3" style={{backgroundColor:'lightyellow',borderRadius:20,border:'1px solid lightgray'}}>
                            <div className="d-flex">
                                <div className="d-flex">
                                    <div className="ws-80"><b>Sender: </b></div> <span className="me-5">{notifacation && notifacation.createBy && notifacation.createBy.username}</span>
                                </div>
                                <b className="me-3">Role: </b><span className="me-5">{notifacation && notifacation.createBy &&  notifacation.createBy.role.roleName}</span>
                                <b className="me-3">Create at: </b> <span>{notifacation && DatetimeUtils.formatDate(notifacation.createAt)}</span>
                            </div>

                            <div className="mt-2 mb-3 d-flex">
                                <div className="ws-80">
                                    <b>Content: </b> 
                                </div>
                                <span>{notifacation && notifacation.content}</span>
                            </div>
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

    const notificationData = await ApiGetNotificationByUsername(userCookie.userInfo.username) as Notification[];
    const notificationPageData = notificationData && notificationData.slice(0,Constant.ITEM_PER_PAGE_TABLE);

    var cookerData = null;
    if(userCookie.userInfo.role.roleName=="Cooker"){
        cookerData = await ApiGetCookerByUsername(userCookie.userInfo.username);
    }

    return { props: { 
        cookerData,
        notificationData,
        notificationPageData,
    } };
}

export default Page;