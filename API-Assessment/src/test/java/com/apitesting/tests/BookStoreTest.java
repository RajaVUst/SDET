package com.apitesting.tests;

import com.apitesting.client.AuthClient;
import com.apitesting.client.BookClient;
import com.apitesting.data.secrets.Secrets;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.*;

public class BookStoreTest{
    AuthClient authClient = new AuthClient();
    BookClient bookClient = new BookClient();

    @Test
    void createUser(){
        Response user = authClient.createUser(Secrets.username(),Secrets.password());
        System.out.println(Secrets.username());
        user.then()
                .log().all()
                .statusCode(201)
                .body("username",equalTo(Secrets.username()));
    }

    @Test
    void getBooks(){


        Response tokenResponse = authClient.getToken(Secrets.username(),Secrets.password());
        tokenResponse.then()
                .statusCode(200)
                .body("token",notNullValue());

        String token = tokenResponse.jsonPath().getString("token");

        Response books = bookClient.getBooks(token);
        books.then()
                .statusCode(200)
                .body("books[0].title",notNullValue())
                .body(matchesJsonSchemaInClasspath("schemas/book_responses.schema.json"));
    }

    @Test
    void cannotLoginWithInvalidCredentials(){
        Response tokenResponse = authClient.getToken(Secrets.username(),"wrong");
        tokenResponse.then()
                .statusCode(200)
                .body("token",isEmptyOrNullString())
                .body("status",equalTo("Failed"))
                .body("result",equalTo("User authorization failed."));

    }
}
