import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
const LeftBarProfile = () => {
    return (
        <div className='px-5 py-2' style={{borderRight:'2px solid lightgray',color:'gray'}}>
            <h3 className='mb-5'>MENU</h3>
            <div className='d-flex align-items-center mb-5 pb-5 hover_cursor_green'>
                <EditIcon className='f-size-32' />
                <span className='ms-2 f-size-24'>Edit profile</span>
            </div>
            <div className='d-flex align-items-center mb-5 pb-5 hover_cursor_green'>
                <NotificationsIcon className='f-size-32' />
                <span className='ms-2 f-size-24'>Notification</span>
            </div>
            <div className='d-flex align-items-center mb-5 pb-5 hover_cursor_green'>
                <LockIcon className='f-size-32' />
                <span className='ms-2 f-size-24'>Security</span>
            </div>
            <div className='d-flex align-items-center mb-5 pb-5 hover_cursor_green'>
                <SettingsIcon className='f-size-32' />
                <span className='ms-2 f-size-24'>Appearance</span>
            </div>
            <div className='d-flex align-items-center mb-5 pb-5 hover_cursor_green'>
                <HelpIcon className='f-size-32' />
                <span className='ms-2 f-size-24'>Help</span>
            </div>
        </div>
    );
};



export default LeftBarProfile;