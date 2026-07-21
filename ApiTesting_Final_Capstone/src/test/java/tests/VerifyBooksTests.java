package tests;

import api.auth.TokenManager;
import api.clients.BookStoreClient;
import api.clients.UserClient;
import config.Config;
import io.restassured.module.jsv.JsonSchemaValidator;
import io.restassured.response.Response;
import models.Book;
import models.BookResponse;
import models.CreateUserRequest;
import models.TokenRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class VerifyBooksTests {

    @Test
    @DisplayName("Verify authenticated user can retrieve books")
    public void verifyBooksList() {

        String username = Config.USERNAME + System.currentTimeMillis();
        CreateUserRequest createUser = new CreateUserRequest();
        createUser.setUserName(username);
        createUser.setPassword(Config.PASSWORD);
        UserClient.createUser(createUser);
        TokenRequest tokenRequest = new TokenRequest();
        tokenRequest.setUserName(username);
        tokenRequest.setPassword(Config.PASSWORD);
        Response tokenResponse =UserClient.generateToken(tokenRequest);
        String token =tokenResponse.jsonPath().getString("token");
        TokenManager.setToken(token);
        Response response =BookStoreClient.getBooks(TokenManager.getToken());
        assertEquals(200,response.getStatusCode(),"Books should be retrieved successfully.");
        response.then().body(JsonSchemaValidator.matchesJsonSchemaInClasspath("schemas/books-schema.json"));
        BookResponse books =response.as(BookResponse.class);
        assertNotNull(books);
        assertNotNull(books.getBooks());
        assertFalse(books.getBooks().isEmpty());
        Book firstBook = books.getBooks().get(0);
        assertNotNull(firstBook);
        assertNotNull(firstBook.getTitle());
        assertFalse(firstBook.getTitle().isBlank());
        assertNotNull(firstBook.getAuthor());
        assertFalse(firstBook.getAuthor().isBlank());
        assertNotNull(firstBook.getIsbn());
        assertFalse(firstBook.getIsbn().isBlank());
        assertNotNull(firstBook.getPublisher());
        assertFalse(firstBook.getPublisher().isBlank());
        assertNotNull(firstBook.getWebsite());
        assertFalse(firstBook.getWebsite().isBlank());

    }
}