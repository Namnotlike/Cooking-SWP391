import { FormEvent } from "react";
import * as Constant from '@/common/constant';
import { JsonBody } from "@/types";

export const ApiDeleteCustomize = async (event: FormEvent<HTMLFormElement>, accountId: string) => {
    const idSelected = event.currentTarget.idSelected.value.trim();
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

export const ApiSubmitCustomize = async (event: FormEvent<HTMLFormElement>,processContent: string, ingredientContent: string, accountId: string) => {
    const description = event.currentTarget.description.value.trim();
    const process = processContent.trim();
    const ingredient = ingredientContent.trim();
    const prepTime = event.currentTarget.prepTime.value.trim();
    const cookTime = event.currentTarget.cookTime.value.trim();
    const servings = event.currentTarget.servings.value.trim();
    const note = event.currentTarget.note.value.trim();
    const idSelected = event.currentTarget.idSelected.value.trim();
    const data = new FormData();
    data.append("description",description);
    data.append("process",process);
    data.append("ingredient",ingredient);
    data.append("prepTime",prepTime);
    data.append("cookTime",cookTime);
    data.append("servings",servings);
    data.append("note",note);
    data.append("idSelected",idSelected);
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