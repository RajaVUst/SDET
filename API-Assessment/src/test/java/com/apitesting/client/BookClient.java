package com.apitesting.client;

import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BookClient {


    public Response getBooks(String token){
        return given()
                .spec(ApiSpecBuilders.authSpec(token))
                .when()
                .get("/BookStore/v1/Books");
    }


}