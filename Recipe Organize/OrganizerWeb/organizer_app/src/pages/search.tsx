'use client';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '@/components/recipe/RecipeCard';
import LayoutMaster from '@/components/LayoutMaster';
import { ApiGetDishByCategory, ApiGetDishByCookerIdPaging, ApiGetDishByKeyword, ApiGetDishByTagPaging } from '@/services/DishService';
import { Category, Cooker, Dish, JsonBody, Tag } from '@/types';
import { GetServerSideProps } from 'next';
import { ApiGetTopViewedTags } from '@/services/TagService';
import ItemDish from '@/components/listRecipe/ItemDish';
import LeftBar from '@/components/listRecipe/LeftBar';
import Pagination from '@/components/listRecipe/Pagination';
import React, { ChangeEvent, FormEvent } from 'react';
import { ApiGetAllCategory } from '@/services/CategoryService';
import * as Constant from '@/common/constant';
import { ApiGetCookerById, ApiGetCookerByKeySearch, ApiGetCookerByUsername } from '@/services/CookerService';
import ItemCooker from '@/components/listRecipe/ItemCooker';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMAGE_PATH } from '@/common/constant';
import * as DatetimeUtils from '@/utils/DatetimeUtils';
import CookerRankIcon from '@/components/CookerRankIcon';
import { useRouter } from 'next/router';
type Params = {
    tagData: Tag[],
    categoryData: Category[],
    cookerData: Cooker,
    dishData: Dish[],
    page: number,
    urlCurrent: string,
    totalItem: number,
}

const Page = ({tagData, categoryData, cookerData, dishData, page, urlCurrent, totalItem}: Params) => {
    const [indexActive,setIndexActive] = React.useState(page);
    const [dishes,setDished] = React.useState(dishData);
    const [cookers,setCookers] = React.useState<Cooker[] | null>(null);
    const [objectSearch, setObjectSearch] = React.useState("Recipe");
    const [cooker,setCooker] = React.useState<Cooker | null>(cookerData);
   
    const router = useRouter();
    const mKeyChange = router.query.key;
    const mPageChange = router.query.page;
    const mTagChange = router.query.tag;
    const mCookerChange = router.query.cooker;


    React.useEffect(()=>{
        const fetchData = async () => {
            const mPage = (mPageChange as string || "1");
            const mKey = (mKeyChange as string || "");
            const mTag = (mTagChange as string || "");
            const mCooker = (mCookerChange as string || "");
            var dishDataBody = null;
            var dishData = null;
            var urlCurrent = null;
            var cookerData = null;
            if(mKey && mKey!='undefined'){
                dishDataBody = await ApiGetDishByKeyword(mKey,mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
                dishData = dishDataBody.data as Dish[];
                urlCurrent = Constant.URL_FONTEND+"/search?key="+mKey;
            }else if(mCooker && mCooker!='undefined'){
                cookerData = await ApiGetCookerById(mCooker) as Cooker;
                dishData = await ApiGetDishByCookerIdPaging(cookerData.id+"",mPage,Constant.ITEM_PER_PAGE+"") as Dish[];
                urlCurrent = Constant.URL_FONTEND+"/search?cooker="+mCooker;
            }else if(mTag && mTag!='undefined'){
                const myArray = mTag.split("-");
                const mTagId = myArray[myArray.length - 1];
                dishDataBody = await ApiGetDishByTagPaging(mTagId,mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
                dishData = dishDataBody.data as Dish[];
                urlCurrent = Constant.URL_FONTEND+"/search?tag="+mTag;
            }
            if(dishData){
                setDished(dishData);
            }
            setIndexActive(parseInt(mPage));
        };
        fetchData();
    },[mKeyChange,mPageChange,mTagChange])

    const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keysearch = event.currentTarget.keysearch.value.trim();
        if(!keysearch){
            setDished(dishData);
            setCookers(null);
            return;
        }
        setCooker(null);
        const result = await ApiGetDishByKeyword(keysearch);
        const resultCooker = await ApiGetCookerByKeySearch(keysearch);
        if(result && resultCooker){
            if(result.code=='01' && resultCooker.code=='01'){
                setDished(result.data);
                setCookers(resultCooker.data);
                return;
            }
        }
        alert("Search failed");
    }
    const handleChangeObjectSearch = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        setObjectSearch(value);
    }
    return (
        <LayoutMaster>
        <div>
            {/* BANNER */}
            <Image src="/materials/banner_recipe.svg" width={0} height={0} style={{width:'100%',height:'auto'}} alt="Picture of the author" />
            {/* TAG CHIPS AREA */}
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-wrap justify-content-center my-5' style={{width:800}}>
                    {tagData && tagData.map((row,index)=>(
                        <button key={index} className='btn btn-outline-secondary m-2' style={{borderRadius:20}} onClick={()=>{location.href="../search?tag="+row.url+"-"+row.id}}>{row.tagName}</button>
                    ))}
                </div>
            </div>
            {/* SEARCH TOOL AREA */}
            <form onSubmit={handleSearch}>
            <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center bg-white p-2 px-4' style={{borderRadius:15,boxShadow:'5px 5px 5px 5px lightgray'}}>
                    <SearchIcon style={{color:'gray'}}/>
                    <input type='text' placeholder='Search recipes' id="keysearch" className='px-2' style={{border:'none',outline:'none'}} />
                </div>
            </div>
            </form>
            {/* BODY CONTENT */}
            <h1 className='ms-5 p-0'>Recipes</h1>
            <div className='row'>
                {/* LEFT CONTENT */}
                <div  className='d-none d-sm-block col-12 col-sm-3 row p-5 pt-0'>
                    <LeftBar categories={categoryData} />
                </div>
                {/* RIGHT CONTENT */}
                <div  className='col-12 col-sm-9 p-5 pt-0'>
                    {!cooker && (
                        <select className='form-select ws-150' onChange={(event: ChangeEvent<HTMLSelectElement>)=>handleChangeObjectSearch(event)}>
                            <option>Recipe</option>
                            <option>Cooker</option>
                        </select>
                    )}
                    {cooker && (
                        <>
                        <div className='d-flex justify-content-start bg-white'>
                            <div className='mx-3'>
                                <div className="d-flex justify-content-center">
                                    <LazyLoadImage className="img-fit" src={IMAGE_PATH+cooker.imageUrl+".png"} style={{width:260,height:260,borderRadius:'50%'}} alt="Picture of the author"/>
                                </div>
                                <h2 className="fw-bold text-center" >{cooker.fullName} <CookerRankIcon rank={cooker.rank} /></h2>
                            </div>
                            <div className='m-3'>
                                <p><b>Date of birth :</b> {DatetimeUtils.formatDateString(cooker.dateOfBirth)}</p>
                                <p><b>Phone :</b> {cooker.phone}</p>
                                <p><b>Address :</b> {cooker.address}</p>
                                <p><b>City :</b> {cooker.city}</p>
                                <p><b>Gender :</b> {cooker.gender}</p>
                                <p><b>Recipes :</b> ({cooker.dishs.length})</p>
                            </div>
                        </div>
                        <hr />
                        </>
                    )}
                    <div className='row'>
                        {objectSearch == 'Recipe' && dishes && dishes.map( (row,index) => (
                             <ItemDish key={index} dish={row} />
                        ))}
                        {objectSearch == 'Cooker' && cookers && cookers.map( (row,index) => (
                             <ItemCooker key={index} cooker={row} />
                        ))}
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
    const {tag ,key, cooker, page, size} = query;
    const mTag = (tag as string || "");
    const mKey = (key as string || "");
    const mCooker = (cooker as string || "");
    const mPage = (page as string || "1");
    const mSize = (size as string || Constant.ITEM_PER_PAGE);
    const tagData = await ApiGetTopViewedTags(10) as Tag[];
    const categoryData = await ApiGetAllCategory() as Category[];
    var dishDataBody = null;
    var dishData = null;
    var urlCurrent = null;
    var cookerData = null;
    if(mKey){
        dishDataBody = await ApiGetDishByKeyword(mKey,mPage,mSize+"") as JsonBody;
        dishData = dishDataBody.data as Dish[];
        urlCurrent = Constant.URL_FONTEND+"/search?key="+mKey;
    }else if(mCooker){
        cookerData = await ApiGetCookerById(mCooker) as Cooker;
        dishData = await ApiGetDishByCookerIdPaging(cookerData.id+"",mPage,mSize+"") as Dish[];
        urlCurrent = Constant.URL_FONTEND+"/search?cooker="+mCooker;
    }else if(mTag){
        const myArray = mTag.split("-");
        const mTagId = myArray[myArray.length - 1];
        dishDataBody = await ApiGetDishByTagPaging(mTagId,mPage,mSize+"") as JsonBody;
        dishData = dishDataBody.data as Dish[];
        urlCurrent = Constant.URL_FONTEND+"/search?tag="+mTag;
    }
    return { 
        props: { 
            tagData, 
            categoryData,
            cookerData,
            dishData,
            urlCurrent,
            totalItem: dishDataBody && dishDataBody.totalItem || (cookerData && cookerData.dishs.length),
            page: (page || 1),
        } 
    };
};


export default Page;