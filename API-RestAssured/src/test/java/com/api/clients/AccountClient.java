package com.api.clients;

import com.api.models.request.AuthorizedRequest;
import com.api.models.request.CreateUserRequest;
import com.api.models.request.GenerateTokenRequest;
import com.api.models.response.CreateUserResponse;
import com.api.models.response.GenerateTokenResponse;
import com.api.utils.EnvReader;
import io.restassured.response.Response;

import static com.api.specs.RequestSpec.authRequest;
import static com.api.specs.RequestSpec.publicRequest;
import static com.api.specs.ResponseSpec.*;
import static io.restassured.RestAssured.given;

public class AccountClient {

    private final String userName = EnvReader.get("DEEPAK_API_USER_NAME");
    private final String password = EnvReader.get("DEEPAK_API_PASSWORD");

    public GenerateTokenResponse generateToken(String userName){
        GenerateTokenRequest generateTokenRequest = new GenerateTokenRequest(userName,password);
        return given().spec(publicRequest()).body(generateTokenRequest).when().post("/Account/v1/GenerateToken").then().spec(ok()).extract().as(GenerateTokenResponse.class);
    }

    public void authorized(String userName){
        AuthorizedRequest authorizedRequest = new AuthorizedRequest(userName,password);
        given().spec(publicRequest()).body(authorizedRequest).when().post("/Account/v1/Authorized").then().spec(ok());
    }

    public void deleteUser(String token,String userID){
         given().spec(authRequest(token)).pathParam("UUID",userID).when().delete("/Account/v1/User/{UUID}").then().spec(noContent());
    }


    public CreateUserResponse createUser(){
        CreateUserRequest createUserRequest = new CreateUserRequest(userName,password);
        return given().spec(publicRequest()).body(createUserRequest).when().post("/Account/v1/User").then().spec(created()).extract().as(CreateUserResponse.class);
    }


}
