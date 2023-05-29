package com.example.OrganizeRecipeApi.payload;

import lombok.Data;

@Data
public class ResponseHandle<T> {
    private T data;
    private String message = "Data transaction successfully!";
    private String code = "01";
    
    public ResponseHandle (T data){
        this.data = data;
    }
    public ResponseHandle (String code, String msg){
        this.message = msg;
        this.code = code;
    }
}
