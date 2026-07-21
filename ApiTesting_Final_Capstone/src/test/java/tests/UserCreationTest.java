package tests;

import api.clients.UserClient;
import config.Config;
import io.restassured.module.jsv.JsonSchemaValidator;
import io.restassured.response.Response;
import models.CreateUserRequest;
import models.CreateUserResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserCreationTest {

    @Test
    @DisplayName("Verify user is created successfully")
    public void verifyUserCreation() {

        String username = Config.USERNAME+ System.currentTimeMillis();
        CreateUserRequest request = new CreateUserRequest();
        request.setUserName(username);
        request.setPassword(Config.PASSWORD);
        Response response = UserClient.createUser(request);
        assertEquals(201,response.getStatusCode(),"User should be created successfully.");
        response.then().body(JsonSchemaValidator.matchesJsonSchemaInClasspath("schemas/create-user-schema.json"));
        CreateUserResponse user =response.as(CreateUserResponse.class);
        assertNotNull(user);
        assertNotNull(user.getUserID());
        assertFalse(user.getUserID().isBlank());
        assertEquals(username,user.getUsername());
        assertNotNull(user.getBooks());


    }
}