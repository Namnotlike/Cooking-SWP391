package com.example.OrganizeRecipeApi.payload;

import lombok.Data;

import java.util.List;

@Data
public class ResponseArrayHandlePagination<T> {
    private List<T> data;
    private String message = "Data transaction successfully!";
    private String code = "01";
    private int totalItem = 0;

    public ResponseArrayHandlePagination(List<T> data){
        this.data = data;
    }
    public ResponseArrayHandlePagination(String code, String msg){
        this.message = msg;
        this.code = code;
    }
}
