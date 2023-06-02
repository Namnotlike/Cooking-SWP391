package com.example.OrganizeRecipeApi.jwt;


import com.example.OrganizeRecipeApi.entities.Account;

/**
 * Copyright 2019 {@author Loda} (https://loda.me).
 * This project is licensed under the MIT license.
 *
 * @since 5/1/2019
 * Github: https://github.com/loda-kun
 */

public class LoginResponse {
    private Account userInfo;
    private String accessToken;
    private String tokenType = "Bearer";

    public Account getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Account userInfo) {
        this.userInfo = userInfo;
    }
    public LoginResponse(Account userInfo, String accessToken) {
        this.accessToken = accessToken;
        this.userInfo = userInfo;
    }
    public LoginResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    public LoginResponse(){

    }
    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}