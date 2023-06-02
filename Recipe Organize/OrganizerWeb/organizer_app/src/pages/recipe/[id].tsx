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
import React from "react";
import { Dish } from "@/types";
import { GetServerSideProps } from "next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMAGE_PATH } from "@/common/constant";
type Params = {
    dishData: Dish,
}
const Page = ( {dishData} : Params) => {
    const [dish,setDish] = React.useState(dishData);

    const pTitleStyle = {
        color: '#FF7C68',
        fontWeight: 'bold',
        margin:0
    };

    return(
        <LayoutMaster>
        <div className="p-5">
            {/* HEADER CONTENT */}
            <div className="row p-3" style={{backgroundColor:'#D4FBAD',borderRadius:20}}>
                <div className="col-12 col-sm-4 col-md-3">
                    {/* <Image src="/materials/burger_drink.svg" width={0} height={0} style={{width:'100%',height:'auto',borderRadius:20}} alt="Picture of the author" /> */}
                    <LazyLoadImage className="mb-1" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:'100%',borderRadius:20}} alt="Picture of the author"/>
                </div>
                <div className="col-12 col-sm-8 col-md-9 p-3">
                    <h1 className="mt-3">{dish.dishName}</h1>
                    <div className='d-flex align-items-center py-2'>
                        <StarRateIcon className='text-warning' sx={{fontSize:24}} />
                        <span className='mx-2'>{dish.ratingPoint}</span>
                        <CircleIcon sx={{color:'white',fontSize:16}} />
                        <span className='mx-2' >{dish.cookerName}</span>
                    </div>
                    <p>Fish tacos are a favorite quick and easy weeknight meal....</p>
                    <div>
                        <Button className="me-2 bg-white" style={{color:'#FF7C68',borderColor:'#FF7C68',fontSize:20}} variant="outlined" startIcon={<FavoriteIcon style={{fontSize:28}}/>}>SAVE IT</Button>
                        <Button className="bg-white" style={{color:'#FF7C68',borderColor:'#FF7C68',fontSize:20}} variant="outlined" startIcon={<ShareIcon style={{fontSize:28}}/>}>SHARE WITH</Button>
                    </div>
                </div>
            </div>
            {/* BODY CONTENT */}
            <div className="row mt-5">
                {/* PREPARE */}
                <div className="col-12 col-sm-4 p-4" style={{backgroundColor:'#F1F9F9',borderRadius:20}}>
                    <div className="row">
                        <div className="col-3">
                            <p style={pTitleStyle}>Prep Time</p>
                            <p>{dish.prepTime} min</p>
                        </div>
                        <div className="col-3">
                            <p style={pTitleStyle}>Cook Time</p>
                            <p>{dish.cookTime} min</p>
                        </div>
                        <div className="col-3">
                            <p style={pTitleStyle}>Total Time</p>
                            <p>{dish.prepTime + dish.cookTime} min</p>
                        </div>
                    </div>
                    <div>
                        <p style={pTitleStyle}>Servings</p>
                        <p>{dish.servings} peoples</p>
                    </div>
                    <div>
                        <p><b>Note: </b>{dish.note}</p>
                    </div>
                </div>
                <div className="col-12 col-sm-4 p-4">
                    <div>
                        <p style={pTitleStyle}>Ingredients</p>
                        <div   dangerouslySetInnerHTML={{__html: dish.ingredient}}>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-4 p-4">
                    <div>
                        <p style={pTitleStyle}>Process</p>
                        <div  dangerouslySetInnerHTML={{__html: dish.process}}>
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
        </LayoutMaster>
    )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.id as string;
    const myArray = id.split("-");
    const dishId = myArray[myArray.length - 1];
    const dishData = await ApiGetDishById(parseInt(dishId)) as Dish;
    return { props: { dishData } };
};

export default Page;
