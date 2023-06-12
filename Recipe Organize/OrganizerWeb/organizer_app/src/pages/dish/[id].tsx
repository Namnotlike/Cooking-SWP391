'use client';
import Image from "next/image";
import { Row } from "react-bootstrap";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleIcon from '@mui/icons-material/Circle';
import { Button } from "@mui/material";
import LayoutMaster from "@/components/LayoutMaster";
import ShareIcon from '@mui/icons-material/Share';
import { ApiGetDishById } from "@/services/DishService";
import React, { ChangeEvent } from "react";
import { Dish, Favorite, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMAGE_PATH, MATERIAL_PATH } from "@/common/constant";
import AlarmIcon from '@mui/icons-material/Alarm';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import RestoreIcon from '@mui/icons-material/Restore';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { ApiAddOrRemoveFavorite, ApiCheckLoved, ApiGetFavoriteByAccountAndDishId } from "@/services/FavoriteService";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
type Params = {
    dishData: Dish,
    favoriteData: Favorite,
    userCookie: UserInfoCookie,
}
const Page = ( {dishData, favoriteData, userCookie} : Params) => {
    const [loved,setLoved] = React.useState(favoriteData && true || false);
    const [dish,setDish] = React.useState(dishData);

    React.useEffect(()=>{
        if(favoriteData && favoriteData.customize){
            const customizedDish = {
                ...dish,
                description: favoriteData.customize.description,
                prepTime: favoriteData.customize.prepTime,
                cookTime: favoriteData.customize.cookTime,
                servings: favoriteData.customize.servings,
                process: favoriteData.customize.process,
                ingredient: favoriteData.customize.ingredient
                };
            setDish(customizedDish);
        }
    },[]);

    const pTitleStyle = {
        backgroundColor: 'transparent',
        color: '#FF7C68',
        fontWeight: 'bold',
        margin:0
    };

    const handleClickLove = async () => {
        if(userCookie && (userCookie.userInfo.role.roleName=="Cooker" || userCookie.userInfo.role.roleName=="Customer")){
            const result = await ApiAddOrRemoveFavorite(userCookie.userInfo.role.roleName,userCookie.userInfo.id+"",dishData.id+"");
            if(result){
                if(result.code=='01')
                {
                    if(result.data==null){
                        setLoved(false);
                    }else{
                        setLoved(true);
                    }
                }else {
                    alert(result.message)
                }
            }
        }
    };
    const handleChangeCustomize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        if (value === 'Customize') {
            const customizedDish = {
            ...dish,
            description: favoriteData.customize.description,
            prepTime: favoriteData.customize.prepTime,
            cookTime: favoriteData.customize.cookTime,
            servings: favoriteData.customize.servings,
            process: favoriteData.customize.process,
            ingredient: favoriteData.customize.ingredient
            };
            setDish(customizedDish);
        } else {
            setDish(dishData);
        }
    };

    return(
        <LayoutMaster>
        <div className="bg-white px-0 px-sm-0 px-md-5">
            <div className="p-0 p-sm-0 p-md-5 pt-0 m-0 m-sm-0 m-md-5 ">
            <div className="px-0 px-sm-0 px-md-5 pt-0 mx-0 mx-sm-0 mx-md-5 ">
            {/* HEADER CONTENT */}
            <div className="row p-3">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    {/* <LazyLoadImage className="mb-1" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:'100%',borderRadius:20}} alt="Picture of the author"/> */}
                    <LazyLoadImage className="mb-1" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:420,borderRadius:20}} alt="Picture of the author"/>
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-8 px-5 pb-3">
                    <h1 className="mt-3">{dish.dishName}</h1>
                    {favoriteData && favoriteData.customize && (
                        <select className="form-select my-3 w-25"  onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>handleChangeCustomize(event)} >
                            <option>Customize</option>
                            <option>Origin</option>
                        </select>
                    ) || (<div className="mb-5"></div>)}
                    <p className="mb-5">{dish.description}</p>
                    <div className="row mb-2 mx-0" style={{borderBottom:'1px solid black'}}>
                        <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                            <AlarmIcon className="f-size-48"/>
                            <p>Prep Time</p>
                            <p>{dish.prepTime} mins</p>
                        </div>
                        <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                            <RestoreIcon className="f-size-48" />
                            <p>Cook Time</p>
                            <p>{dish.cookTime} mins</p>
                        </div>
                        <div className="col-3 text-center mb-4" style={{borderInlineEnd:'1px solid black'}}>
                            <AlarmOnIcon className="f-size-48" />
                            <p>Total Time</p>
                            <p>{dish.prepTime + dish.cookTime} mins</p>
                        </div>
                        <div className="col-3 text-center mb-4">
                            <PeopleAltIcon className="f-size-48" />
                            <p>Servings</p>
                            <p>{dish.servings} peoples</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="text-secondary">Created by <span className="color-orange">{dish.cookerName}</span></span>
                        <div className="flex-grow-1"></div>
                        {loved && (
                            <Button className="me-2 bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<FavoriteIcon style={{fontSize:20}}/>} onClick={handleClickLove}>LOVED</Button>
                        ) || (
                            <Button className="me-2 bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<FavoriteBorderIcon style={{fontSize:20}}/>} onClick={handleClickLove}>LOVE</Button>
                        )}
                        <Button className="bg-white color-orange" style={{borderColor:'#FF7C68',fontSize:16}} startIcon={<ShareIcon style={{fontSize:20}}/>}>SHARE</Button>
                    </div>
                    
                </div>
            </div>
            {/* BODY CONTENT */}
            <div className="row mt-5">
                {/* PROCESS */}
                <div className="col-12 col-sm-6 p-4">
                    <div>
                        <p className="f-size-36" style={pTitleStyle}>Process</p>
                        <div className="p-2"  dangerouslySetInnerHTML={{__html: dish.process}}>
                        </div>
                    </div>
                </div>
                {/* PREPARE */}
                <div className="col-12 col-sm-6 p-4">
                    <p className="f-size-36" style={pTitleStyle} >Ingredients</p>
                    <div style={{position:'relative'}}>
                        <LazyLoadImage className="mb-1" src={MATERIAL_PATH+"page_bg"+".svg"} style={{position:'absolute',top:0,left:0,zIndex:1,width:'100%',height:'100%',minHeight:600,borderRadius:20}} alt="Picture of the author"/>
                        <div style={{position:'relative',zIndex:2}} className="overlay-content px-4 py-2">
                            <div className="p-5">
                                <div dangerouslySetInnerHTML={{__html: dish.ingredient}} style={{overflowY:'auto',maxHeight:1000,paddingLeft:50}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FEEDBACK */}
            <div className="row p-3 mt-5">
                <h1>Feedback</h1>
                <form>
                    <div style={{position:'relative'}}>
                        <textarea className="form-control" rows={5} placeholder="Input your feedback..."></textarea>
                        <Button style={{position:'absolute',bottom:20, right:20}} variant="contained" className="px-5" >Submit</Button>
                    </div>
                </form>
            </div>
            </div>
            </div>
        </div>
        </LayoutMaster>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params,query, req, res } = context;
    const id = params?.id as string;
    const myArray = id.split("-");
    const dishId = myArray[myArray.length - 1];
    const dishData = await ApiGetDishById(parseInt(dishId)) as Dish;

    const { userInfoCookie } = req.cookies;
    var userCookie = null;
    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }
    var favoriteData = null;
    if(userCookie){
        favoriteData = await ApiGetFavoriteByAccountAndDishId(userCookie.userInfo.id+"",dishId);
    }
    return { props: { 
        dishData,
        userCookie,
        favoriteData
     } };
};

export default Page;
