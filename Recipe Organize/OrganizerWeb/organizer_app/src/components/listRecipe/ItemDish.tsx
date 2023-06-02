import Image from "next/image";
import StarRateIcon from '@mui/icons-material/StarRate';
import { Dish } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_PATH } from "@/common/constant";
import React from "react";

type Params = {
    dish: Dish,
}

const ItemDish = ({dish}: Params) => {

    const handleClickItem = () => {
        location.href="../dish/"+dish.url+"-"+dish.id;
    }

    
    return (
        <div className=" col-12 col-sm-3 my-2 cursor-pointer" onClick={handleClickItem} >
            {/* <Image src="/materials/item_dish.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" /> */}
            <LazyLoadImage className="hover_cursor_size" src={IMAGE_PATH+dish.imageUrl+".png"} style={{width:'100%',height:300,borderRadius:20}} alt="Picture of the author"/>
            <span className="fw-bold f-size-18" >{dish.dishName}</span>
            <div className="d-flex">
                <StarRateIcon className='text-warning' sx={{fontSize:24}} />
                <span>{dish.ratingPoint}</span>
                <div className="flex-grow-1"></div>
                <i>By {dish.cookerName}</i>
            </div>
            
        </div>
    );
};

export default ItemDish;