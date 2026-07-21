package com.api.tests;

import com.api.clients.AccountClient;
import com.api.clients.BookStoreClient;
import com.api.models.response.*;
import com.api.utils.ConfigReader;
import com.api.utils.EnvReader;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.greaterThan;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class BookStoreAPITests {

    private static final AccountClient accountClient = new AccountClient();
    private static final BookStoreClient bookStoreClient = new BookStoreClient();

    @BeforeAll
    static void setup() {
        ConfigReader.loadConfig();
        RestAssured.baseURI = EnvReader.get("DEEPAK_BASE_API_URL");
        RestAssured.useRelaxedHTTPSValidation();
    }

    @AfterAll
    static void tearDown() {
        RestAssured.reset();
    }

    @Test
    @DisplayName("Create User , Generate token, Retrieve List of Books")
    void authenticatedUserGetBooksTest(){


        CreateUserResponse createUserResponse = accountClient.createUser();
        String userID = createUserResponse.userID();
        String userName = createUserResponse.username();

        GenerateTokenResponse generateTokenResponse = accountClient.generateToken(userName);
        String token = generateTokenResponse.token();

        assertThat(generateTokenResponse.status(),equalTo("Success"));
        assertThat(generateTokenResponse.result(),equalTo("User authorized successfully."));

        accountClient.authorized(userName);

        GetBooksResponse getBooksResponse = bookStoreClient.getBooks(token);
        List<Books> books = getBooksResponse.books();
        assertThat(books.size(),greaterThan(0));

        accountClient.deleteUser(token,userID);

    }

}
