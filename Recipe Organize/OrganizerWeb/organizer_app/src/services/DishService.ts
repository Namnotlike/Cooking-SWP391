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
}
export const ApiGetDishByCategory = async (id: string,page: string, size: string) => {
    console.log(Constant.API_GET_DISH_BY_CATEGORY_ID+id+"?page="+page+"&size="+size);
    const res = await fetch(Constant.API_GET_DISH_BY_CATEGORY_ID+id+"?page="+page+"&size="+size);
    if(res.ok){
        const jsonBody: JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
}

export const ApiCreateDish = async (event: FormEvent<HTMLFormElement>,processContent: string, ingredientContent: string, tagAdd?: Tag[]) => {
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
    data.append("cookerId","1"); //DEFAULT
    data.append("servings",servings);
    data.append("note",note);
    data.append("categoryDetailId",categoryDetailId);
    const res = await fetch(Constant.API_CREATE_DISH,{
        method: 'POST',
        body: data
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        if(jsonBody.code=='01'){
            return true;
        }
    }
    return false;
}