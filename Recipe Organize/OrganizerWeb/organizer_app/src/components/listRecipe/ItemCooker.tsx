import Image from "next/image";
import StarRateIcon from '@mui/icons-material/StarRate';
import { Cooker, Dish } from "@/types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IMAGE_PATH } from "@/common/constant";
import React from "react";

type Params = {
    cooker: Cooker,
}

const ItemDish = ({cooker}: Params) => {
    return (
        <div className=" col-12 col-sm-3 my-2" onClick={()=>{location.href="./search?cooker="+cooker.id}}>
            <div className="cursor-pointer">
                <div className="d-flex justify-content-center">
                    <LazyLoadImage className="hover_cursor_size img-fit" src={IMAGE_PATH+cooker.imageUrl+".png"} style={{width:260,height:260,borderRadius:'50%'}} alt="Picture of the author"/>
                </div>
                <p className="fw-bold f-size-18 text-center" >{cooker.fullName}</p>
                <p className="text-center">Recipes ({cooker.dishs.length})</p>
            </div>
        </div>
    );
};

export default ItemDish;