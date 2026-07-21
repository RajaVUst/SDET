package com.api.clients;

import com.api.models.response.Books;
import com.api.models.response.GetBooksResponse;
import io.restassured.specification.ResponseSpecification;

import java.lang.reflect.Type;
import java.util.List;

import static com.api.specs.RequestSpec.*;
import static com.api.specs.ResponseSpec.ok;
import static io.restassured.RestAssured.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;

public class BookStoreClient {

    public GetBooksResponse getBooks(String token) {
        return given().spec(authRequest(token)).when().get("/BookStore/v1/Books").then().spec(ok()).body(matchesJsonSchemaInClasspath("schemas/get-books-schema.json")).extract().as(GetBooksResponse.class);
    }
}
