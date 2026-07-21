package tests;

import api.clients.AuthClient;
import api.clients.BookClient;
import api.specs.ResponseSpecs;
import builders.LoginRequestBuilder;
import config.Config;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

public class ListingBooksApiTest {

    @Test
    @DisplayName("Create user, generate token, and list books")
    void GenerateTokenAndFetchBooks() {
        String userName = Config.USER_NAME;

        Response createUserResponse = new AuthClient().createUser(
                new LoginRequestBuilder()
                        .withDefaultUser()
                        .build());

        int statusCode = createUserResponse.getStatusCode();

        if (statusCode == 201) {
            createUserResponse.then()
                    .statusCode(201)
                    .body("username", equalTo(userName))
                    .body("userID", notNullValue());

        } else if (statusCode == 406) {
            System.out.println("User already exists. Continuing with token generation...");
        } else {
            fail("Unexpected status code while creating user: " + statusCode);
        }

        Response tokenResponse = new AuthClient().generateToken(
                new LoginRequestBuilder()
                        .withDefaultUser()
                        .build());

        tokenResponse.then()
                .statusCode(200)
                .body("status", equalTo("Success"))
                .body("result", equalTo("User authorized successfully."))
                .body("token", notNullValue());

        String token = tokenResponse.jsonPath().getString("token");

        Response booksResponse = new BookClient().getBooks(token);

        booksResponse.then()
                .statusCode(200)
                .spec(ResponseSpecs.success())
                .body(matchesJsonSchemaInClasspath("schemas/books-schema.json"))
                .body("books", notNullValue())
                .body("books.size()", greaterThan(0));

        List<String> titles = booksResponse.jsonPath().getList("books.title");
        assertEquals("Git Pocket Guide", titles.get(0));
    }

    @Test
    void getBooksWithoutToken() {
        Response booksResponse = new BookClient().getBooks("");
        booksResponse.then()
                .statusCode(200);
    }

    @Test
    @DisplayName("Generate token with wrong credentials")
    void generateTokenwithWrongCredentials() {
        Response tokenResponse = new AuthClient().generateToken(
                new LoginRequestBuilder()
                        .withUserName("manikftest")
                        .withPassword("mani")
                        .build());

        tokenResponse.then()
                .statusCode(200)
                .body("status", equalTo("Failed"))
                .body("result", equalTo("User authorization failed."));
    }
}
