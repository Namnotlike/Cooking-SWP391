import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { useCookies } from 'react-cookie';
import React, { FormEvent } from 'react';
import { LoginResponse } from '@/types';
const TopBar = () => {
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const [user,setUser] = React.useState<LoginResponse | null>(null);
    React.useEffect(()=> setUser(cookieUser && cookieUser.userInfoCookie), []);

    const handleClickLogOut = () => {
        removeCookieUser('userInfoCookie',{path: '/'});
        location.href = "../login";
    };

    const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keyword = event.currentTarget.keyword.value.trim();
        location.href = "../search?key="+keyword;
    }

    return (
        <div style={{blockSize:50,position:'fixed',top:0,left:0,width:'100%',zIndex:10}}>
            <div className="d-flex align-items-center px-2">
                {/* LOGO */}
                <Image src="/materials/icon_hat_cooker.svg" width={50} height={50} alt="Picture of the author" />
                {/* LEFT VIEWS */}
                <span style={{marginLeft:20}}>RECIPE ORGANIZER</span>
                <div style={{marginLeft:30}}>
                    <a href='../' className="navi-link"><span className='navi_top'>Home</span></a>
                    <a href='../category/1' className="navi-link"><span className='navi_top'>Recipe</span></a>
                    <a href='../meal-planning' className="navi-link"><span className='navi_top'>Meal Planning</span></a>
                </div>
                {/* RIGHT VIEWS */}
                <form  className='flex-grow-1 text-end' onSubmit={handleSubmitSearch}>
                <div>
                    <input type='text' id="keyword" placeholder='Seach' className='place_right px-2' style={{border:'none',borderBottom:'2px solid black',outline: 'none',backgroundColor:'transparent'}}/>
                    <SearchIcon className='mx-2' style={{cursor:'pointer'}} />
                    {user && (
                        <>
                            <span>Welcome:<a href={"../profile"} className='fw-bold color-orange px-2'>{user.userInfo.username}</a></span>
                            <button type='button' className='btn text-light' style={{backgroundColor:'#FC8800'}} onClick={handleClickLogOut}>Log Out</button>
                        </>
                    ) || (
                        <button type='button' className='btn text-light' style={{backgroundColor:'#FC8800',marginLeft:40}} onClick={()=>{location.href="../login"}}>Log In</button>
                    )}

                </div>
                </form>
                
            </div>
        </div>
    );
};

export default TopBar;