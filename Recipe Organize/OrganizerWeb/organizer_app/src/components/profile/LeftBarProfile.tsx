import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { type } from 'os';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useCookies } from 'react-cookie';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

type Params = {
    cookerActive?: boolean,
    itemActive?: number,
}

const LeftBarProfile = ({cookerActive, itemActive}: Params) => {
    const [isEmployee,setIsEmployee] = React.useState(false);
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    React.useEffect(()=>{
        setIsEmployee(cookieUser && cookieUser.userInfoCookie.userInfo.role.roleName=="Employee" && true || false);
    },[]);
    const handleClickLogOut = () => {
        removeCookieUser('userInfoCookie',{path: '/'});
        location.href = "../login";
    };

    const styleActive = (index: number) => {
        if(itemActive){
            return {
                backgroundColor: index == itemActive ? 'white' : '',
                borderRadius: 20,
                color: index == itemActive ? '#FF7008' : '',
            }
        }
    }

    return (
        <div className='px-2 py-2 h-100' style={{minHeight:'100vh',borderRight:'2px solid lightgray',color:'white',backgroundColor:'#FF7008'}}>
            <div className='d-flex align-items-center hover_cursor_orange mt-5' onClick={()=>location.href="../"}>
                <HomeIcon className='ms-5 f-size-32 my-3' />
                <span className='ms-2 f-size-24'>Home</span>
            </div>
            <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(1)} onClick={()=>location.href="../profile"}>
                <EditIcon className='ms-5 f-size-32 my-3' />
                <span className='ms-2 f-size-24'>Edit profile</span>
            </div>
            {cookerActive && (
                <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(2)} onClick={()=>location.href="../post-recipe"}>
                    <RestaurantIcon className='ms-5 f-size-32 my-3' />
                    <span className='ms-2 f-size-24'>Recipe Manager</span>
                </div>
            )}
            {/* {cookieUser && cookieUser.userInfoCookie.userInfo.role.roleName != "Employee" && ( */}
            {!isEmployee && (
                <>
                     <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(3)} onClick={()=>location.href="../favorite"}>
                        <FavoriteBorderIcon className='ms-5 f-size-32 my-3' />
                        <span className='ms-2 f-size-24'>Favorite Recipes</span>
                    </div>
                    <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(4)} onClick={()=>location.href="../customize-recipe"}>
                        <AutoFixHighIcon className='ms-5 f-size-32 my-3' />
                        <span className='ms-2 f-size-24'>Customize Recipes</span>
                    </div>
                </>
            ) || (
                <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(5)} onClick={()=>location.href="../customer-user"}>
                    <Diversity3Icon className='ms-5 f-size-32 my-3' />
                    <span className='ms-2 f-size-24'>Customer & Cooker</span>
                </div>
            )}
            <div className='d-flex align-items-center hover_cursor_orange mt-1' style={styleActive(6)} onClick={()=>location.href="../admin-notification"}>
                <NotificationsIcon className='ms-5 f-size-32 my-3' />
                <span className='ms-2 f-size-24'>Notification</span>
            </div>
            <div className='d-flex align-items-center hover_cursor_orange mt-1'>
                <LogoutIcon className='ms-5 f-size-32 my-3' />
                <span className='ms-2 f-size-24' onClick={handleClickLogOut}>Log out</span>
            </div>
        </div>
    );
};



export default LeftBarProfile;