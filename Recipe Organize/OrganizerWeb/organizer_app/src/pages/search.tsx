'use client';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '@/components/recipe/RecipeCard';
import LayoutMaster from '@/components/LayoutMaster';
import { ApiGetDishByCategory, ApiGetDishById, ApiGetDishByKeyword } from '@/services/DishService';
import { Category, Dish, JsonBody, Tag } from '@/types';
import { GetServerSideProps } from 'next';
import { ApiGetTopViewedTags } from '@/services/TagService';
import ItemDish from '@/components/listRecipe/ItemDish';
import LeftBar from '@/components/listRecipe/LeftBar';
import Pagination from '@/components/listRecipe/Pagination';
import React from 'react';
import { ApiGetAllCategory } from '@/services/CategoryService';
import * as Constant from '@/common/constant';
type Params = {
    tagData: Tag[],
    categoryData: Category[],
    dishData: Dish[],
    page: number,
    urlCurrent: string,
    totalItem: number,
}

const Page = ({tagData, categoryData, dishData, page, urlCurrent, totalItem}: Params) => {
    const [indexActive,setIndexActive] = React.useState(page);
    return (
        <LayoutMaster>
        <div>
            {/* BANNER */}
            <Image src="/materials/banner_recipe.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            {/* TAG CHIPS AREA */}
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-wrap justify-content-center my-5' style={{width:800}}>
                    {tagData && tagData.map((row,index)=>(
                        <button key={index} className='btn btn-outline-secondary m-2' style={{borderRadius:20}}>{row.tagName}</button>
                    ))}
                </div>
            </div>
            {/* SEARCH TOOL AREA */}
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center bg-white p-2 px-4' style={{borderRadius:15,boxShadow:'5px 5px 5px 5px lightgray'}}>
                    <SearchIcon style={{color:'gray'}}/>
                    <input type='text' placeholder='Search recipes' className='px-2' style={{border:'none',outline:'none'}} />
                </div>
            </div>
            {/* BODY CONTENT */}
            <h1 className='ms-5 p-0'>Recipes</h1>
            <div className='row'>
                {/* LEFT CONTENT */}
                <div  className='d-none d-sm-block col-12 col-sm-3 row p-5 pt-0'>
                    <LeftBar categories={categoryData} />
                </div>
                {/* RIGHT CONTENT */}
                <div  className='col-12 col-sm-9 p-5 pt-0'>
                    <div className='row'>
                        {dishData.map( (row,index) => (
                             <ItemDish key={index} dish={row} />
                        ))}
                        {/* <ItemDish />
                        <ItemDish />
                        <ItemDish />
                        <ItemDish />
                        <ItemDish /> */}
                        <div className='col-12'>
                            <Pagination 
                                totalItem={totalItem}
                                itemPerPage={Constant.ITEM_PER_PAGE}
                                indexActive={indexActive}
                                urlCurrent={urlCurrent}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        </LayoutMaster>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;
    const {key, page, size} = query;
    const mKey = (key as string || "");
    const mPage = (page as string || "1");
    const mSize = (size as string || Constant.ITEM_PER_PAGE);
    const id = (params?.id as string)?.split("-").pop() || "1";
    const tagData = await ApiGetTopViewedTags(10) as Tag[];
    const categoryData = await ApiGetAllCategory() as Category[];
    const dishDataBody = await ApiGetDishByKeyword(mKey,mPage,mSize) as JsonBody;
    const dishData = dishDataBody.data as Dish[];
    const urlCurrent = Constant.URL_FONTEND+"/search?key="+mKey;
    return { 
        props: { 
            tagData, 
            categoryData,
            dishData,
            urlCurrent,
            totalItem: dishDataBody.totalItem,
            page: (page || 1),
        } 
    };
};


export default Page;