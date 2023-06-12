import LayoutMaster from "@/components/LayoutMaster";
import EditProfileContent from "@/components/profile/EditProfileContent";
import LeftBarProfile from "@/components/profile/LeftBarProfile";
import TinyEditor from "@/pluggins/tiny_editor";
import { ApiGetCookerByUsername } from "@/services/CookerService";
import { ApiGetCustomerByUsername } from "@/services/CustomerService";
import { ApiCreateDish, ApiDeleteDish, ApiUpdateDish } from "@/services/DishService";
import { CategoryDetail, Cooker, Customer, Dish, JsonBody, Tag, UserInfoCookie } from "@/types";
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

type Params = {
    listTagData: Tag[],
    listCategoryDetailData: CategoryDetail[],
    cookerData: Cooker,
    dishPagData: Dish[],
}
const Page = ({listTagData,listCategoryDetailData, cookerData, dishPagData}:Params) => {
    const [totalItem,setTotalItem] = React.useState(cookerData.dishs && cookerData.dishs.length || 0);
    const [clickedButton, setClickedButton] = React.useState("CREATE");
    const [dishTable,setDishTable] = React.useState<Dish[]>(cookerData.dishs);
    const [dishTablePag,setDishTablePag] = React.useState<Dish[]>(dishPagData);
    const [selectedTable,setSelectedTable] = React.useState<Dish | null>(null);
    const [selectedImage,setSelectedImage] = React.useState("");
    const [processContent,setProcessContent] = React.useState("");
    const [ingredientContent,setIngredientContent] = React.useState("");
    const [tags,setTags] = React.useState(listTagData);
    const [tagSelected,setTagSelected] = React.useState(listTagData && listTagData[0]);
    const [htmlContent,setHtmlContent] = React.useState('');
    const [tagAdd, setTagAdd] = React.useState<Tag[]>([]);
    const [idSelected, setIdSelected] = React.useState(selectedTable?.id);
    const [dishName, setDishName] = React.useState(selectedTable?.dishName);
    const [description, setDescription] = React.useState(selectedTable?.description);
    const [totalCalorie, setTotalCalorie] = React.useState<string | undefined>(selectedTable?.totalCalorie+"");
    const [prepTime, setPrepTime] = React.useState<string | undefined>(selectedTable?.prepTime+"");
    const [cookTime, setCookTime] = React.useState<string | undefined>(selectedTable?.cookTime+"");
    const [servings, setServings] = React.useState<string | undefined>(selectedTable?.servings+"");
    const [note, setNote] = React.useState(selectedTable?.note);

    const handleSubmitCRUD = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(clickedButton=="CREATE"){
            const result = await ApiCreateDish(event,processContent,ingredientContent,cookerData.id,tagAdd) as JsonBody; 
            if(result!=null){
                if(result.code=='01'){
                    setDishTable((dishTable)=>([...dishTable,result.data]));
                    alert("Create Dish successfully!");
                }else{
                    alert(result.message);
                }
            }else{
                alert("Create Dish failed!")
            }
        }else if(clickedButton=="EDIT"){
            const result = await ApiUpdateDish(event,processContent,ingredientContent,cookerData.id,tagAdd) as JsonBody; 
            if(result!=null){
                setDishTable((dishTable) => dishTable.filter((dish) => dish.id != result.data.id));
                setDishTable((dishTable)=>([...dishTable,result.data]));
                alert("Edit Dish successfully!");
            }else{
                alert("Edit Dish failed!");
            }
        }else if(clickedButton=="DELETE"){
            const result = await ApiDeleteDish(event) as JsonBody; 
            if(result!=null){
                if(result.code=='01'){
                    setDishTable((dishTable) => dishTable.filter((dish) => dish.id != result.data));
                    alert("Delete Dish successfully!");
                }else{
                    alert(result.message);
                }
            }else{
                alert("Delete Dish failed!");
            }
        }
    }

    const handleChangePage = (page: number) => {
        const skip = (page-1)*Constant.ITEM_PER_PAGE_TABLE;
        var end = skip+Constant.ITEM_PER_PAGE_TABLE;
        if(dishTable && dishTable.length>0){
          if(dishTable.length<end){
            end = dishTable.length;
          }
          const newDish = [] as Dish[];
          for(let i = skip; i < end; i++){
            newDish.push(dishTable[i]);
          }
          setDishTablePag(newDish);
        }
    }

    const handleOnChange = (e: any) => {
        setHtmlContent(e.currentTarget.value);
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

    const handleClickRowTable = (item: Dish) => {
        setIdSelected(item.id);
        setSelectedTable(item);
        setDishName(item.dishName);
        setDescription(item.description);
        setNote(item.note);
        setTagAdd(item.tags);
        setSelectedImage("/images/"+item.imageUrl+".png");
        setTotalCalorie(item.totalCalorie+"");
        setPrepTime(item.prepTime+"");
        setCookTime(item.cookTime+"");
        setServings(item.servings+"");
    }

    const handleAddTag = () => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].id == tagSelected.id) {
                 // Kiểm tra xem tag đã có trong tagAdd chưa
                const isTagAdded = tagAdd.some((tag) => tag.id === tagSelected.id);
                if (!isTagAdded) {
                    setTagAdd([...tagAdd, tags[i]]);
                }
                return;
            }
        }
    }

    const handleDeleteTag = (id: number) => {
        const updatedTagAdd = tagAdd.filter(tag => tag.id !== id);
        setTagAdd(updatedTagAdd);
    }

    const handleChangeTagSelect = (event: any) => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].id == event.currentTarget.value) {
                setTagSelected(tags[i]);
                return;
            }
        }
    }
    return(
        <LayoutMaster>
            <div>
                <div className="row">
                    <div className="col-3">
                        <LeftBarProfile cookerActive={cookerData && cookerData.status} itemActive={2} />
                    </div>
                    <div className="col-9">
                        <h1 className="text-start color-orange mt-5">Create new recipes</h1>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-6">
                               
                                <form onSubmit={handleSubmitCRUD}>
                                    <div className="row ps-3">
                                        <div className="col-12 col-sm-4 mt-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:196,border:'1px solid lightgray',borderRadius:10}} onClick={handleClickUpload}>
                                                {selectedImage != "" && selectedImage.includes("/images/") && (<LazyLoadImage alt="Avatar" src={IMAGE_PATH+selectedTable?.imageUrl+".png"} width={0} height={0} style={{margin:0,width:'100%',maxWidth:300,height:'100%',borderRadius:10}} />)
                                                    || selectedImage != "" && (
                                                       <Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0} style={{margin:0,width:'100%',maxWidth:300,height:'100%',borderRadius:10}} />
                                                    )
                                                    || (
                                                        <AddPhotoAlternateIcon sx={{fontSize:40}}/>
                                                    )
                                                }
                                        </div>
                                        <div className="col-12 col-sm-8">
                                            <div className="form-group">
                                                <label>Dish Name: </label>
                                                <input type="text" id="dishName" className="form-control" placeholder="Ex: Hot dog" value={dishName} onChange={(event)=>setDishName(event.currentTarget.value)} required/>
                                            </div>
                                            <div className="form-group">
                                                <label>Description: </label>
                                                <textarea rows={5} id="description" className="form-control" placeholder="Ex: Description" value={description} onChange={(event)=>setDescription(event.currentTarget.value)} required/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Process: </label>
                                        <TinyEditor handleEditorChange={handleProcessChange} content={selectedTable && selectedTable.process || ""} />
                                    </div>
                                    <div className="form-group">
                                        <label>Ingredient: </label>
                                        <TinyEditor handleEditorChange={handleIngredientChange} content={selectedTable && selectedTable.ingredient || ""} />
                                    </div>
                                    <div className="form-group">
                                        <label>TotalCalorie: </label>
                                        <input type="number" id="totalCalorie" className="form-control" placeholder="Ex: 250" value={totalCalorie} onChange={(event)=>setTotalCalorie(event.currentTarget.value)}  required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category: </label>
                                        <select className="form-control" id="category" style={{borderRadius:'5px 0px 0px 5px'}} onChange={(event)=>handleChangeTagSelect(event)}>                                    
                                            {selectedTable && (<option value={selectedTable.categoryDetail.id}>{selectedTable.categoryDetail.name}</option>)}
                                            {listCategoryDetailData && listCategoryDetailData.map((row)=>{
                                                if((selectedTable && selectedTable.categoryDetail.name!=row.name) || !selectedTable){
                                                    return (
                                                        <option key={row.id} value={row.id}>{row.name}</option>
                                                    )
                                                }
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Tags: </label>
                                        <div className="d-flex">
                                            <select className="form-control" id="tags" style={{borderRadius:'5px 0px 0px 5px'}} onChange={(event)=>handleChangeTagSelect(event)}>                                    
                                                {tags && tags.map((row)=>(
                                                    <option key={row.id} value={row.id}>{row.tagName}</option>
                                                ))}
                                            </select>
                                            <button type="button" className="btn text-white bg-orange" style={{borderRadius:'0px 5px 5px 0px'}} onClick={handleAddTag}>ADD</button>
                                        </div>
                                        <div className="my-2">
                                            {tagAdd && tagAdd.map((row,index)=>(
                                                <Chip key={index} className="me-1" label={row.tagName} onDelete={()=>handleDeleteTag(row.id)} />
                                            ))}
                                        </div>
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
                                    <input type="file" id="fileAvt" hidden className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChangeImage(event)}/>
                                    <input type="text" id="idSelected" hidden value={idSelected} />
                                    <div className="d-flex">
                                        <input type="submit" className="form-control my-3 bg-orange hover_bg_green me-1" onClick={()=>setClickedButton("CREATE")} value="CREATE" />
                                        <input type="submit" className="form-control my-3 btn-outline-orange hover_bg_green" onClick={()=>setClickedButton("EDIT")} value="EDIT" />
                                        <input type="submit" className="form-control my-3 bg-orange hover_bg_green ms-1" onClick={()=>setClickedButton("DELETE")} value="DELETE" />
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <TableCustom dishes={dishTablePag} handleClickRowTable={handleClickRowTable} handleChangePage={handleChangePage} totalItem={totalItem} />
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </LayoutMaster>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { params, req, res } = context;

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
    
    var cookerData = await ApiGetCookerByUsername(userCookie.userInfo.username) as Cooker;
    var dishPagData = cookerData && cookerData.dishs && cookerData.dishs.slice(0,Constant.ITEM_PER_PAGE_TABLE);

    const listTagData = await getAllTag();
    const listCategoryDetailData = await ApiGetAllCategoryDetail() as CategoryDetail[];
    
    return { props: { 
        cookerData,
        dishPagData,
        listTagData,
        listCategoryDetailData
     } };
}


export default Page;