import Image from "next/image";
import StarRateIcon from '@mui/icons-material/StarRate';
import { Dish } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_PATH } from "@/common/constant";
import React from "react";
import Link from 'next/link'
type Params = {
    dish: Dish,
    editable?: boolean
    handleClickRemoveFavorite?: (dish: Dish) => void
}

const ItemDish = ({dish, editable, handleClickRemoveFavorite}: Params) => {
    
    return (
        <div className=" col-12 col-sm-3 my-2" >
            <Link scroll={true} href={"../dish/"+dish.url+"-"+dish.id}>
                <div className="cursor-pointer">
                    <LazyLoadImage className="hover_cursor_size img-fit" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:260,borderRadius:20}} alt="Picture of the author"/>
                    <span className="fw-bold f-size-18" >{dish.dishName}</span>
                    <div className="d-flex">
                        <StarRateIcon className='text-warning' sx={{fontSize:24}} />
                        <span>{dish.ratingPoint}</span>
                        <div className="flex-grow-1"></div>
                        <i>By {dish.cookerName}</i>
                    </div>
                </div>
            </Link>
            {editable && (
                <div className="d-flex w-100 mt-1">
                    {/* <button className="btn bg-orange w-50 me-1 hover_bg_green">CUSTOMIZE</button> */}
                    <button className="btn btn-outline-orange w-100 hover_bg_green" onClick={()=>handleClickRemoveFavorite? handleClickRemoveFavorite(dish) : {}}>REMOVE</button>
                </div>
            )}
        </div>
    );
};

export default ItemDish;