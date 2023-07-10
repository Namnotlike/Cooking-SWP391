import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import TinyEditor from "@/pluggins/tiny_editor";
import { ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiGetCustomerByUsername } from "@/services/CustomerService";
import { ApiCreateDish, ApiDeleteDish, ApiGetDishByFavorite, ApiUpdateDish } from "@/services/DishService";
import { CategoryDetail, Cooker, Customer, Dish, DishSubmit, Favorite, JsonBody, Tag, UserInfoCookie } from "@/types";
import { Chip } from "@mui/material";
import { GetServerSideProps } from "next";
import React, { FormEvent } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getAllTag } from "@/services/TagService";
import { ApiGetAllCategoryDetail } from "@/services/CategoryDetailService";
import Image from "next/image";
import { useCookies } from "react-cookie";
import TableCustom from "@/components/TableCustom";
import { IMAGE_PATH } from "@/common/constant";
import { LazyLoadImage } from "react-lazy-load-image-component";
import * as Constant from "@/common/constant";
import { ApiDeleteCustomize, ApiSubmitCustomize } from "@/services/CustomizeService";
import { ApiGetFavoriteByAccountId } from "@/services/FavoriteService";
import TableCustomize from "@/components/TableCustomize";
import ShowDialog from "@/components/ShowDialog";
type Params = {
    cookerData: Cooker,
    userCookie: UserInfoCookie,
    favoriteData: Favorite[],
    favoritePageData: Favorite[],
}
const Page = ({cookerData, favoriteData, userCookie, favoritePageData}:Params) => {
    const [totalItem,setTotalItem] = React.useState(favoriteData && favoriteData.length || 0);
    const [clickedButton, setClickedButton] = React.useState("SUBMIT");
    const [favoriteTable,setFavoriteTable] = React.useState<Favorite[]>(favoriteData);
    const [favoriteTablePag,setFavoriteTablePag] = React.useState<Favorite[]>(favoritePageData);
    const [selectedTable,setSelectedTable] = React.useState<Favorite | null>(null);
    const [selectedImage,setSelectedImage] = React.useState("");
    const [processContent,setProcessContent] = React.useState("");
    const [ingredientContent,setIngredientContent] = React.useState("");
    const [idSelected, setIdSelected] = React.useState(selectedTable?.id);
    const [description, setDescription] = React.useState(selectedTable?.dish.description);
    const [prepTime, setPrepTime] = React.useState<string | undefined>(selectedTable?.dish.prepTime+"");
    const [cookTime, setCookTime] = React.useState<string | undefined>(selectedTable?.dish.cookTime+"");
    const [servings, setServings] = React.useState<string | undefined>(selectedTable?.dish.servings+"");
    const [note, setNote] = React.useState(selectedTable?.dish.note);
    const [dishSubmit, setDishSubmit] = React.useState<DishSubmit | null>(null);


    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    const [messageDialog, setMessageDialog] = React.useState("");
    const [titleDialog, setTileDialog] = React.useState("");
    const [typeDialog, setTypeDialog] = React.useState("");
    const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
    const handleOpenDialogConfirm = () => setOpenDialogConfirm(true);
    const handleCloseDialogConfirm = () => setOpenDialogConfirm(false);
    const handleClickYes = async () => {
        if(clickedButton=="SUBMIT" && dishSubmit!=null){
            const result = await ApiSubmitCustomize(dishSubmit,processContent,ingredientContent,userCookie.userInfo.id+"") as JsonBody; 
            if(result!=null){
                if(result.code=='01'){
                    setFavoriteTable(result.data);
                    setMessageDialog("Customize Dish successfully!");
                    setTileDialog("Notice");
                    setTypeDialog('info')
                    handleOpenDialog();
                    return;
                }
            }
            setMessageDialog("Customize Dish failed!");
            setTileDialog("Notice");
            setTypeDialog('error')
            handleOpenDialog();
            
        } else if(clickedButton=="RESTORE" && dishSubmit!=null){
            const result = await ApiDeleteCustomize(dishSubmit,userCookie.userInfo.id+"") as JsonBody; 
            if(result!=null){
                if(result.code=='01'){
                    setFavoriteTable(result.data);
                    setMessageDialog("Customize restore successfully!");
                    setTileDialog("Notice");
                    setTypeDialog('info')
                    handleOpenDialog();
                    return;
                }
            }
            setMessageDialog("Customize restore failed!");
            setTileDialog("Notice");
            setTypeDialog('error')
            handleOpenDialog();
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dishSubmit: DishSubmit = {
            description: event.currentTarget.description.value.trim(),
            process: processContent.trim(),
            ingredient: ingredientContent.trim(),
            prepTime: event.currentTarget.prepTime.value.trim(),
            cookTime: event.currentTarget.cookTime.value.trim(),
            servings: event.currentTarget.servings.value.trim(),
            note: event.currentTarget.note.value.trim(),
            idSelected: event.currentTarget.idSelected.value.trim(),
          };
        setDishSubmit(dishSubmit);
        if(clickedButton=="SUBMIT"){
            setMessageDialog("Do you want to customize this recipe?");
        }else if(clickedButton=="RESTORE"){
            setMessageDialog("Do you want to restore this recipe?");
        }
        setTypeDialog("info");
        setTileDialog("Notice");
        handleOpenDialogConfirm();
    }

    const handleProcessChange = (content:string) => {
        setProcessContent(content);
    }
    const handleIngredientChange = (content:string) => {
        setIngredientContent(content);
    }
    const handleClickUpload = () => {
        const btnAvt = document.getElementById('fileAvt');
        btnAvt?.click();
    }
    const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.currentTarget.files;
        if(url!=null){
            setSelectedImage(URL.createObjectURL(url[0]))
        }
    }
    const handleClickRowTable = (item: Favorite) => {
        setIdSelected(item.dish.id);
        setSelectedTable(item);
        setDescription(item.customize && item.customize.description || item.dish.description );
        setNote(item.customize && item.customize.note || item.dish.note);
        setSelectedImage("/images/"+item.dish.imageUrl+".png");
        setPrepTime(item.customize && item.customize.prepTime+"" || item.dish.prepTime+"");
        setCookTime(item.customize && item.customize.cookTime+"" || item.dish.cookTime+"");
        setServings(item.customize && item.customize.servings+"" || item.dish.servings+"");
    }

    const handleChangePage = (page: number) => {
        const skip = (page-1)*Constant.ITEM_PER_PAGE_TABLE;
        var end = skip+Constant.ITEM_PER_PAGE_TABLE;
        if(favoriteTable && favoriteTable.length>0){
          if(favoriteTable.length<end){
            end = favoriteTable.length;
          }
          const newFav = [] as Favorite[];
          for(let i = skip; i < end; i++){
            newFav.push(favoriteTable[i]);
          }
          setFavoriteTablePag(newFav);
        }
    }

    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={cookerData && cookerData.status} itemActive={4} />
                    </div>
                    <div className="col-9">
                        <h1 className="text-start color-orange mt-5">Customize recipes</h1>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                               
                                <form onSubmit={handleSubmit}>
                                    <div className="row ps-3">
                                        <div className="col-12 col-sm-4 mt-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:196,border:'1px solid lightgray',borderRadius:10}} onClick={handleClickUpload}>
                                                {selectedImage != "" && selectedImage.includes("/images/") && (<LazyLoadImage alt="Avatar" src={IMAGE_PATH+selectedTable?.dish.imageUrl+".png"} width={0} height={0} style={{margin:0,width:'100%',maxWidth:300,height:'100%',borderRadius:10}} />)
                                                    || selectedImage != "" && (
                                                       <Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0} style={{margin:0,width:'100%',maxWidth:300,height:'100%',borderRadius:10}} />
                                                    )
                                                    || (
                                                        <AddPhotoAlternateIcon sx={{fontSize:40}}/>
                                                    )
                                                }
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="form-group mt-3">
                                                <label>Description: </label>
                                                <textarea rows={7} id="description" className="form-control" placeholder="Ex: Description" value={description} onChange={(event)=>setDescription(event.currentTarget.value)} required/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Process: </label>
                                        <TinyEditor handleEditorChange={handleProcessChange} content={selectedTable && (selectedTable.customize &&  selectedTable.customize.process || selectedTable.dish.process) || ""} />
                                    </div>
                                    <div className="form-group">
                                        <label>Ingredient: </label>
                                        <TinyEditor handleEditorChange={handleIngredientChange} content={selectedTable && (selectedTable.customize &&  selectedTable.customize.ingredient || selectedTable.dish.ingredient) || ""} />
                                    </div>
                                   
                                    <div className="row">
                                        <div className="form-group col-4">
                                            <label>PrepTime: </label>
                                            <input type="number" id="prepTime" className="form-control" placeholder="Ex: 10" value={prepTime} onChange={(event)=>setPrepTime(event.currentTarget.value)}  required />
                                        </div>
                                        <div className="form-group col-4">
                                            <label>CookTime: </label>
                                            <input type="number" id="cookTime" className="form-control" placeholder="Ex: 10" value={cookTime} onChange={(event)=>setCookTime(event.currentTarget.value)}  required />
                                        </div>
                                        <div className="form-group col-4">
                                            <label>Servings: </label>
                                            <input type="number" id="servings" className="form-control" placeholder="Ex: 3" value={servings} onChange={(event)=>setServings(event.currentTarget.value)}  required />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Note: </label>
                                        <textarea rows={5} id="note" className="form-control" placeholder="Ex: Content" value={note} onChange={(event)=>setNote(event.currentTarget.value)} />
                                    </div>
                                    <input type="file" id="fileAvt" hidden className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChangeImage(event)} disabled/>
                                    <input type="text" id="idSelected" hidden value={idSelected} />
                                    <div className="d-flex">
                                        <input type="submit" className="form-control my-3 bg-orange hover_bg_green me-1" onClick={()=>setClickedButton("SUBMIT")} value="CUSTOMIZE SUBMIT" />
                                        <input type="submit" className="form-control my-3 btn-outline-orange hover_bg_green" onClick={()=>setClickedButton("RESTORE")} value="RESTORE DEFAULT" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <h3 className="text-center mt-3 color-orange">-- Favorite recipes --</h3>
                                <TableCustomize favorites={favoriteTablePag} handleClickRowTable={handleClickRowTable} handleChangePage={handleChangePage} totalItem={totalItem}/>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            <ShowDialog 
                content={messageDialog}
                title={titleDialog}
                type={typeDialog}
                buttonOk={true}
                open={openDialog}
                setOpen={setOpenDialog}
            />

            <ShowDialog 
                content={messageDialog}
                title={titleDialog}
                type={typeDialog}
                buttonYesNo={true}
                handleClickYes={handleClickYes}
                open={openDialogConfirm}
                setOpen={setOpenDialogConfirm}
            />
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
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
    const listFavoriteData = await ApiGetFavoriteByAccountId(userCookie.userInfo.id+"") as Favorite[];
    const listFavoritePagData = listFavoriteData && listFavoriteData.slice(0,Constant.ITEM_PER_PAGE_TABLE);
    return { props: { 
        favoriteData: listFavoriteData,
        favoritePageData: listFavoritePagData,
        userCookie,
        cookerData,
     } };
}


export default Page;