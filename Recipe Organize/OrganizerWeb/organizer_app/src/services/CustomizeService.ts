import { FormEvent } from "react";
import * as Constant from '@/common/constant';
import { DishSubmit, JsonBody } from "@/types";

export const ApiDeleteCustomize = async (dishSubmit: DishSubmit, accountId: string) => {
    const idSelected = dishSubmit.idSelected;
    const data = new FormData();
    data.append("idSelected",idSelected);
    data.append("accountId",accountId);
    const res = await fetch(Constant.API_DELETE_CUSTOMIZE,{
        method: 'DELETE',
        body: data
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}

export const ApiSubmitCustomize = async (dishSubmit: DishSubmit,processContent: string, ingredientContent: string, accountId: string) => {
    const data = new FormData();
    data.append("description",dishSubmit.description);
    data.append("process",dishSubmit.process);
    data.append("ingredient",dishSubmit.ingredient);
    data.append("prepTime",dishSubmit.prepTime);
    data.append("cookTime",dishSubmit.cookTime);
    data.append("servings",dishSubmit.servings);
    data.append("note",dishSubmit.note);
    data.append("idSelected",dishSubmit.idSelected);
    data.append("accountId",accountId);
    const res = await fetch(Constant.API_CREATE_OR_UPDATE_CUSTOMIZE,{
        method: 'POST',
        body: data
    });
    if(res.ok){
        const jsonBody : JsonBody = await res.json();
        return jsonBody as JsonBody;
    }
    return null;
}