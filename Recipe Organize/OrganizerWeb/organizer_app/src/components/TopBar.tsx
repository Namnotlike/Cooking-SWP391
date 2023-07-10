import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import { useCookies } from 'react-cookie';
import React, { FormEvent, useEffect } from 'react';
import { LoginResponse } from '@/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ShowDialog from './ShowDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';
const TopBar = () => {
    const [cookieUser, setCookieUser, removeCookieUser] = useCookies(['userInfoCookie']);
    const [user,setUser] = React.useState<LoginResponse | null>(null);
    React.useEffect(()=> setUser(cookieUser && cookieUser.userInfoCookie), []);

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    console.log(cookieUser);

    const router = useRouter();
    const handleClickLogOut = () => {
        removeCookieUser('userInfoCookie',{path: '/'});
        router.push("/login");

    };

    const handleSubmitSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keyword = event.currentTarget.keyword.value.trim();
        router.push("/search?key="+keyword, undefined, { scroll: true });
        // location.href = "../search?key="+keyword;
    }

    const handleClickMealPlanning = () => {
        if(cookieUser && cookieUser.userInfoCookie && cookieUser.userInfoCookie.userInfo.role.roleName!='Customer'){
            handleOpenDialog();
            return;
        }
        router.push("/meal-planning");
    }

    return (
        <div className='bg-white mb-2' style={{blockSize:50,position:'fixed',top:0,left:0,width:'100%',zIndex:10}}>
            <div className="d-flex align-items-center px-2">
                {/* LOGO */}
                <LazyLoadImage src="/materials/icon_hat_cooker.svg" width={50} height={50} alt="Picture of the author" />
                {/* LEFT VIEWS */}
                <span style={{marginLeft:20}}>RECIPE ORGANIZER</span>
                <div style={{marginLeft:30}} className='d-flex'>
                    <Link href='../' className="navi-link"><span className='navi_top'>Home</span></Link>
                    <Link scroll={false} href='../category/1' className="navi-link"><span className='navi_top'>Recipe</span></Link>
                    <div onClick={handleClickMealPlanning}>
                        <a className="navi-link"><span className='navi_top'>Meal Planning</span></a>
                    </div>
                </div>
                {/* RIGHT VIEWS */}
                <form  className='flex-grow-1 text-end' onSubmit={handleSubmitSearch}>
                <div>
                    <input type='text' id="keyword" placeholder='Seach' className='place_right px-2' style={{border:'none',borderBottom:'2px solid black',outline: 'none',backgroundColor:'transparent'}}/>
                    <SearchIcon className='mx-2' style={{cursor:'pointer'}} />
                    {user && (
                        <>
                            <span>Welcome:<Link href={"/profile"} className='fw-bold color-orange px-2'>{user.userInfo && user.userInfo.username}</Link></span>
                            <button type='button' className='btn text-light' style={{backgroundColor:'#FC8800'}} onClick={handleClickLogOut}>Log Out</button>
                        </>
                    ) || (
                        <button type='button' className='btn text-light' style={{backgroundColor:'#FC8800',marginLeft:40}} onClick={()=>{router.push("/login");}}>Log In</button>
                    )}

                </div>
                </form>
                
            </div>
            <ShowDialog 
                content="Only customer can use this function."
                title="Notice"
                type="info"
                buttonOk={true}
                open={openDialog}
                setOpen={setOpenDialog}
            />
        </div>
    );
};

export default TopBar;