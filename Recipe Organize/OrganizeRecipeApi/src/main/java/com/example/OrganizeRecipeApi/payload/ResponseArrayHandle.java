package com.example.OrganizeRecipeApi.payload;

import java.util.List;

import lombok.Data;

@Data
public class ResponseArrayHandle<T> {
    private List<T> data;
    private String message = "Data transaction successfully!";
    private String code = "01";
    
    public ResponseArrayHandle (List<T> data){
        this.data = data;
    }
    public ResponseArrayHandle (String code, String msg){
        this.message = msg;
        this.code = code;
    }
}
