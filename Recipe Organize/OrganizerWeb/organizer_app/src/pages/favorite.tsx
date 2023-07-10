import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import { ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiGetCustomerByUsername } from "@/services/CustomerService";
import { ApiGetDishByFavorite } from "@/services/DishService";
import { Cooker, Customer, Dish, UserInfoCookie } from "@/types";
import { GetServerSideProps } from "next";
import * as Constant from '@/common/constant';
import ItemDish from "@/components/listRecipe/ItemDish";
import Pagination from "@/components/listRecipe/Pagination";
import React from "react";
import { ApiAddOrRemoveFavorite } from "@/services/FavoriteService";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
type Params = {
    customerData?: Customer,
    cookerData?: Cooker,
    dishData: Dish[],
    page: number,
    urlCurrent: string,
    userCookie: UserInfoCookie,
    totalItem: number,
}



const Page = ({customerData, cookerData, dishData, page, urlCurrent, userCookie, totalItem}: Params) => {
    const [dishes,setDishes] = React.useState(dishData);
    const [indexActive,setIndexActive] = React.useState(page);

    const handleClickRemoveFavorite = async (dishRow: Dish) => {
        const result = await ApiAddOrRemoveFavorite(userCookie.userInfo.role.roleName,userCookie.userInfo.id+"",dishRow.id+"");
        if(result){
            if(result.code=='01'){
                setDishes((dishes) => dishes.filter((dish) => dish.id != dishRow.id));
            }else{
                alert(result.message);
            }
        }
    }
    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={cookerData && cookerData.status} itemActive={3}/>
                    </div>
                    <div className="col-9 px-5">
                        {dishes && dishes.length > 0 && (<h1 className="mt-5 color-orange">My Favorite Recipe</h1>) || (<h1 className="mt-5 color-orange" >Welcome to favorite recipes</h1>)}
                        <div className="row">
                            {dishes.map( (row,index) => (
                                <ItemDish editable={true} key={index} dish={row} handleClickRemoveFavorite={handleClickRemoveFavorite}/>
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
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params,query, req, res } = context;
    const {page, size} = query;
    const mPage = (page as string || "1");
    const mSize = (size as string || Constant.ITEM_PER_PAGE);
    const { userInfoCookie } = req.cookies;
    var userCookie = null;

    if(userInfoCookie){
        userCookie = JSON.parse(userInfoCookie) as UserInfoCookie;
    }
    // REDIRECT TO HOME
    if (userCookie === null) {
        res.writeHead(302, { Location: "../" });
        res.end();
        return { props: {} };
    }
    var role = "customer";
    var id = "1";
    const customerData = await ApiGetCustomerByUsername(userCookie.userInfo.username) as Customer;
    var cookerData = null;
    if(!customerData){
        cookerData = await ApiGetCookerByUsername(userCookie.userInfo.username) as Cooker;
        id = cookerData.id+"";
        role = "cooker";
    }else{
        id=customerData.id+"";
    }
    const dishDataBody = await ApiGetDishByFavorite(role,id,mPage,mSize+"");

    const urlCurrent = Constant.URL_FONTEND+"/favorite";
    return { 
        props: { 
            customerData,
            cookerData,
            dishData: dishDataBody?.data,
            urlCurrent,
            totalItem: dishDataBody?.totalItem,
            userCookie,
            page: (page || 1),
        } 
    };
};


export default Page;