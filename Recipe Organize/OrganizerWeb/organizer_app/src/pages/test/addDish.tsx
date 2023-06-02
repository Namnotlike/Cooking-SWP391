import LayoutMaster from "@/components/LayoutMaster";
import { ApiCreateDish } from "@/services/DishService";
import { getAllTag } from "@/services/TagService";
import { CategoryDetail, Tag } from "@/types";
import { Button, Chip } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";
import { FormEvent } from "react";
import TinyEditor from "@/pluggins/tiny_editor";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from "next/image";
import { ApiGetAllCategoryDetail } from "@/services/CategoryDetailService";
type Params = {
    listTagData: Tag[],
    listCategoryDetailData: CategoryDetail[],
}

const Page = ({listTagData,listCategoryDetailData}:Params) => {
    const [selectedImage,setSelectedImage] = React.useState("");
    const [processContent,setProcessContent] = React.useState("");
    const [ingredientContent,setIngredientContent] = React.useState("");
    const [tags,setTags] = React.useState(listTagData);
    const [tagSelected,setTagSelected] = React.useState(listTagData && listTagData[0]);
    const [htmlContent,setHtmlContent] = React.useState('<p>Thiệt tình</p>');
    const [tagAdd, setTagAdd] = React.useState<Tag[]>([]);
    const handleSubmitAdd = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await ApiCreateDish(event,processContent,ingredientContent,tagAdd); 
        if(result==true){
            alert("Create Dish successfully!")
        }else{
            alert("Create Dish failed!")
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

    return (<>
        <LayoutMaster>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-3"></div>
                <div className="col-12 col-sm-12 col-md-6">
                    <h1 className="pt-5 text-center text-success">Create new recipes</h1>
                    <form onSubmit={handleSubmitAdd}>
                        <div className="row ps-3">
                            <div className="col-12 col-sm-4 mt-4 p-0 hover_cursor d-flex justify-content-center align-items-center" style={{height:196,border:'1px solid lightgray',borderRadius:10}} onClick={handleClickUpload}>
                                    {selectedImage != "" && (<Image loading="eager" className="bg-warning" priority={true} alt="Avatar" src={selectedImage} width={0} height={0} style={{margin:0,width:'100%',maxWidth:300,height:'100%',borderRadius:10}} />)
                                        || (
                                            <AddPhotoAlternateIcon sx={{fontSize:40}}/>
                                        )
                                    }
                            </div>
                            <div className="col-12 col-sm-8">
                                <div className="form-group">
                                    <label>Dish Name: </label>
                                    <input type="text" id="dishName" className="form-control" placeholder="Ex: Hot dog" required/>
                                </div>
                                <div className="form-group">
                                    <label>Description: </label>
                                    <textarea rows={5} id="description" className="form-control" placeholder="Ex: Description" required/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Process: </label>
                            <TinyEditor handleEditorChange={handleProcessChange} content={""} />
                        </div>
                        <div className="form-group">
                            <label>Ingredient: </label>
                            <TinyEditor handleEditorChange={handleIngredientChange} content={""} />
                        </div>
                        <div className="form-group">
                            <label>TotalCalorie: </label>
                            <input type="number" id="totalCalorie" className="form-control" placeholder="Ex: 250" required />
                        </div>
                        <div className="form-group">
                            <label>Category: </label>
                            <select className="form-control" id="category" style={{borderRadius:'5px 0px 0px 5px'}} onChange={(event)=>handleChangeTagSelect(event)}>                                    
                                {listCategoryDetailData && listCategoryDetailData.map((row)=>(
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))}
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
                                <button type="button" className="btn btn-success" style={{borderRadius:'0px 5px 5px 0px'}} onClick={handleAddTag}>ADD</button>
                            </div>
                            <div className="my-2">
                                {tagAdd && tagAdd.map((row)=>(
                                    <Chip className="me-1" label={row.tagName} onDelete={()=>handleDeleteTag(row.id)} />
                                ))}
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-4">
                                <label>PrepTime: </label>
                                <input type="number" id="prepTime" className="form-control" placeholder="Ex: 10" required />
                            </div>
                            <div className="form-group col-4">
                                <label>CookTime: </label>
                                <input type="number" id="cookTime" className="form-control" placeholder="Ex: 10" required />
                            </div>
                            <div className="form-group col-4">
                                <label>Servings: </label>
                                <input type="number" id="servings" className="form-control" placeholder="Ex: 3" required />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label>Note: </label>
                            <textarea rows={5} id="note" className="form-control" placeholder="Ex: Content" />
                        </div>
                        <input type="file" id="fileAvt" hidden className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>)=>handleChangeImage(event)} required/>
                        <input type="submit" className="form-control my-3 bg-success text-white" value="Submit" />
                    </form>
                </div>
                <div className="col-12 col-sm-12 col-md-3"></div>
            </div>
            
        </LayoutMaster>
    </>);
};

export const getServerSideProps: GetServerSideProps = async() => {
    const listTagData = await getAllTag();
    const listCategoryDetailData = await ApiGetAllCategoryDetail() as CategoryDetail[];
    return { props: { listTagData,listCategoryDetailData } };
}

export default Page;