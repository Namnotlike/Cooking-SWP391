import * as Constant from "@/common/constant";
import { Dish, JsonBody, Tag } from "@/types";
import { FormEvent } from "react";
import { json } from "stream/consumers";

export const ApiGetDishById = async (id: number) => {
    const res = await fetch(Constant.API_GET_DISH_BY_ID+id);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody.data as Dish;
    }
};

export const ApiGetDishByCategory = async (id: string,page: string, size: string) => {
    const res = await fetch(Constant.API_GET_DISH_BY_CATEGORY_ID+id+"?page="+page+"&size="+size);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
};

export const ApiGetDishByFavorite = async (role: string,id: string,page: string, size: string) => {
    const res = await fetch(Constant.API_GET_DISH_BY_FAVORITE+role+"/"+id+"?page="+page+"&size="+size);

    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
};

export const ApiGetDishByKeyword = async (keyword: string, page: string, size: string) => {
    const data = new FormData();
    data.append("keyword",keyword);
    data.append("page",page);
    data.append("size",size);
    const res = await fetch(Constant.API_GET_DISH_SEARCH_BY_KEYWORD,{
        method: "POST",
        body: data
    });
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
};

export const ApiDeleteDish = async (event: FormEvent<HTMLFormElement>) => {
    const idSelected = event.currentTarget.idSelected.value.trim();
    if(!idSelected){
        alert("Please choose a dish in table to DELETE");
        return;
    }
    const res = await fetch(Constant.API_DELETE_DISH+idSelected,{
        method: 'DELETE',
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}

export const ApiUpdateDish = async (event: FormEvent<HTMLFormElement>,processContent: string, ingredientContent: string, cookerId: number,  tagAdd?: Tag[]) => {
    const dishName = event.currentTarget.dishName.value.trim();
    const description = event.currentTarget.description.value.trim();
    const process = processContent.trim();
    const ingredient = ingredientContent.trim();
    const totalCalorie = event.currentTarget.totalCalorie.value.trim();
    const prepTime = event.currentTarget.prepTime.value.trim();
    const cookTime = event.currentTarget.cookTime.value.trim();
    const categoryDetailId = event.currentTarget.category.value.trim();
    const servings = event.currentTarget.servings.value.trim();
    const note = event.currentTarget.note.value.trim();
    const fileAvt = event.currentTarget.fileAvt.files;
    const idSelected = event.currentTarget.idSelected.value.trim();
    if(!idSelected)
        alert("Please choose a dish to EDIT");

    if(process=='' || ingredient=='')
        return false;

    const data = new FormData();

    if(tagAdd){
        const tags = tagAdd.map(tag => tag.id).join(';');
        data.append("listTagString",tags)
    }

    for (const file of fileAvt) {
        data.append("fileAvt", file);
    }

    data.append("dishName",dishName);
    data.append("description",description);
    data.append("process",process);
    data.append("ingredient",ingredient);
    data.append("totalCalorie",totalCalorie);
    data.append("prepTime",prepTime);
    data.append("cookTime",cookTime);
    data.append("cookerId",cookerId+""); //DEFAULT
    data.append("servings",servings);
    data.append("note",note);
    data.append("categoryDetailId",categoryDetailId);
    const res = await fetch(Constant.API_UPDATE_DISH+idSelected,{
        method: 'PUT',
        body: data
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}

export const ApiCreateDish = async (event: FormEvent<HTMLFormElement>,processContent: string, ingredientContent: string, cookerId: number,  tagAdd?: Tag[]) => {
    const dishName = event.currentTarget.dishName.value.trim();
    const description = event.currentTarget.description.value.trim();
    const process = processContent.trim();
    const ingredient = ingredientContent.trim();
    const totalCalorie = event.currentTarget.totalCalorie.value.trim();
    const prepTime = event.currentTarget.prepTime.value.trim();
    const cookTime = event.currentTarget.cookTime.value.trim();
    const categoryDetailId = event.currentTarget.category.value.trim();
    const servings = event.currentTarget.servings.value.trim();
    const note = event.currentTarget.note.value.trim();
    const fileAvt = event.currentTarget.fileAvt.files;
    const idSelected = event.currentTarget.idSelected.value.trim();

    if(!fileAvt && !idSelected)
        alert("Avatar can not be empty!")

    if(process=='' || ingredient=='')
        return false;

    const data = new FormData();

    if(tagAdd){
        const tags = tagAdd.map(tag => tag.id).join(';');
        data.append("listTagString",tags)
    }

    for (const file of fileAvt) {
        data.append("fileAvt", file);
    }

    data.append("dishName",dishName);
    data.append("description",description);
    data.append("process",process);
    data.append("ingredient",ingredient);
    data.append("totalCalorie",totalCalorie);
    data.append("prepTime",prepTime);
    data.append("cookTime",cookTime);
    data.append("cookerId",cookerId+""); //DEFAULT
    data.append("servings",servings);
    data.append("note",note);
    data.append("idSelected",idSelected);
    data.append("categoryDetailId",categoryDetailId);
    const res = await fetch(Constant.API_CREATE_DISH,{
        method: 'POST',
        body: data
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}