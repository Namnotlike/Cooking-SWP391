'use client';
import Image from 'next/image';
import SearchIcon from '@mui/icons-material/Search';
import RecipeCard from '@/components/recipe/RecipeCard';
import LayoutMaster from '@/components/LayoutMaster';
import { ApiGetDishByCategory, ApiGetTopRatingByCategory, ApiGetTopViewByCategory } from '@/services/DishService';
import { Category, Cooker, Dish, JsonBody, Tag } from '@/types';
import { GetServerSideProps } from 'next';
import { ApiGetTopViewedTags } from '@/services/TagService';
import ItemDish from '@/components/listRecipe/ItemDish';
import LeftBar from '@/components/listRecipe/LeftBar';
import Pagination from '@/components/listRecipe/Pagination';
import React, { ChangeEvent, FormEvent } from 'react';
import { ApiGetAllCategory } from '@/services/CategoryService';
import * as Constant from '@/common/constant';
import { ApiGetCookerByKeySearch } from '@/services/CookerService';
import ItemCooker from '@/components/listRecipe/ItemCooker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
type Params = {
    tagData: Tag[],
    categoryIdCurrent: number,
    categoryData: Category[],
    dishData: Dish[],
    page: number,
    urlCurrentData: string,
    totalItem: number,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


const Page = ({tagData,categoryIdCurrent, categoryData, dishData, page, urlCurrentData, totalItem}: Params) => {
    const [urlCurrent, setUrlCurent] = React.useState(urlCurrentData);
    const [indexActive,setIndexActive] = React.useState(page);
    const [dishes,setDished] = React.useState(dishData);
    const [sort,setSort] = React.useState("newest");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [categoryId, setCategoryId] = React.useState(categoryIdCurrent);
    
    const router = useRouter();
    const getSlugFromPath = () => {
        const pathParts = router.asPath.split('/');
        var slug = pathParts[pathParts.length - 1];
        var pageInside = "1";
        var slugId = "1";
        if(slug.includes("?")){
            slugId = slug.split('?')[0];
        }else{
            slugId = slug;
        }
        return {
            catIdChange: slugId,
        };
    };

    const {catIdChange} = getSlugFromPath();
    const mPageChange = router.query.page;
    React.useEffect(()=>{
        const fetchData = async () => {
            const mPage = (mPageChange as string || "1");
            const id = catIdChange.split("-").pop() || "1";
            const tagData = await ApiGetTopViewedTags(10) as Tag[];
            const categoryData = await ApiGetAllCategory() as Category[];
            var dishDataBody = await ApiGetDishByCategory(id,mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
            if(sort){
                if(sort=='topview'){
                    dishDataBody = await ApiGetTopViewByCategory(id, mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
                }
                else if (sort=='toprate'){
                    dishDataBody = await ApiGetTopRatingByCategory(id, mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
                }
                else dishDataBody = await ApiGetDishByCategory(id,mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
            }else{
                dishDataBody = await ApiGetDishByCategory(id,mPage,Constant.ITEM_PER_PAGE+"") as JsonBody;
            }
            const dishData = dishDataBody.data as Dish[];
            setDished(dishData);
            setCategoryId(parseInt(catIdChange));
            setIndexActive(parseInt(mPage));
        };
        fetchData();
    },[catIdChange, mPageChange])

    // React.useEffect(()=>()=>{
    //     const fetchData = async () => {
           
    //     };
    //     fetchData();
    // },[catId, mPage])

    const handleChangeSort = async (e: ChangeEvent<HTMLSelectElement>) => {
        const condition = e.currentTarget.value;
        if(condition=="1"){
            const result = await ApiGetDishByCategory(categoryId+"", 1+"", Constant.ITEM_PER_PAGE+"");
            if(result && result.code=='01'){
                setDished(result.data);
            }
            setSort("newest");
            setUrlCurent(Constant.URL_FONTEND+"/category/"+categoryId+"?sort=newest");
        }
        else if(condition=="2"){
            const result = await ApiGetTopViewByCategory(categoryId+"", 1+"", Constant.ITEM_PER_PAGE+"");
            if(result && result.code=='01'){
                setDished(result.data);
            }
            setSort("topview");
            setUrlCurent(Constant.URL_FONTEND+"/category/"+categoryId+"?sort=topview");
        } else {
            const result = await ApiGetTopRatingByCategory(categoryId+"", 1+"", Constant.ITEM_PER_PAGE+"");
            if(result && result.code=='01'){
                setDished(result.data);
            }
            setSort("toprate");
            setUrlCurent(Constant.URL_FONTEND+"/category/"+categoryId+"?sort=toprate");
        }
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
            
            {/* BODY CONTENT */}
            
            <div className='d-flex align-items-center me-3'>
                <h1 className='ms-5 p-0'>Recipes</h1>
                <div className='flex-grow-1'></div>
                <span className='me-3'><b>Sort by: </b></span>
                <select className='form-select ws-200 me-5' id="sort_condition" onChange={(e)=>handleChangeSort(e)}>
                    <option value={1}>Newest</option>
                    <option value={2}>Top view</option>
                    <option value={3}>Top rating</option>
                </select>
            </div>
            <div className='row'>
                {/* LEFT CONTENT */}
                <div  className='d-none d-sm-block col-12 col-sm-3 row p-5 pt-0'>
                    <LeftBar categories={categoryData} />
                </div>
                {/* RIGHT CONTENT */}
                
                <div  className='col-12 col-sm-9 p-5 pt-0'>
                    
                    <div className='row'>
                        {dishes && dishes.map( (row,index) => (
                             <ItemDish key={index} dish={row} />
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="d-flex">
                    <ReactLoading type={'spin'} color={'blue'} height={50} width={50} />
                    <b>Waiting...</b>
                </div>
            </Typography>
            </Box>
        </Modal>
        </LayoutMaster>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params, query } = context;
    const {sort, page, size} = query;
    const mPage = (page as string || "1");
    const mSize = (size as string || Constant.ITEM_PER_PAGE);
    const id = (params?.id as string)?.split("-").pop() || "1";
    const tagData = await ApiGetTopViewedTags(10) as Tag[];
    const categoryData = await ApiGetAllCategory() as Category[];
    var dishDataBody = await ApiGetDishByCategory(id,mPage,mSize+"") as JsonBody;
    if(sort){
        if(sort=='topview'){
            dishDataBody = await ApiGetTopViewByCategory(id, mPage,mSize+"") as JsonBody;
        }
        else if (sort=='toprate'){
            dishDataBody = await ApiGetTopRatingByCategory(id, mPage,mSize+"") as JsonBody;
        }
        else dishDataBody = await ApiGetDishByCategory(id,mPage,mSize+"") as JsonBody;
    }else{
        dishDataBody = await ApiGetDishByCategory(id,mPage,mSize+"") as JsonBody;
    }
    const dishData = dishDataBody.data as Dish[];
    var urlCurrent = Constant.URL_FONTEND+"/category/"+params?.id;
    if(sort){
        urlCurrent = Constant.URL_FONTEND+"/category/"+params?.id+"?sort="+sort;
    }
    return { 
        props: { 
            tagData, 
            categoryIdCurrent: id,
            categoryData,
            dishData,
            urlCurrentData: urlCurrent,
            totalItem: dishDataBody.totalItem,
            page: (page || 1),
        } 
    };
};


export default Page;