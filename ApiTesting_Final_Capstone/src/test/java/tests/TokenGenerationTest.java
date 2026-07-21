package tests;

import api.clients.UserClient;
import config.Config;
import io.restassured.module.jsv.JsonSchemaValidator;
import io.restassured.response.Response;
import models.CreateUserRequest;
import models.TokenRequest;
import models.TokenResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TokenGenerationTest {

    @Test
    @DisplayName("Verify authentication token is generated")
    public void verifyTokenGeneration() {

        String username = Config.USERNAME + System.currentTimeMillis();

        CreateUserRequest createUser = new CreateUserRequest();
        createUser.setUserName(username);
        createUser.setPassword(Config.PASSWORD);

        UserClient.createUser(createUser);

        TokenRequest tokenRequest = new TokenRequest();
        tokenRequest.setUserName(username);
        tokenRequest.setPassword(Config.PASSWORD);

        Response response =UserClient.generateToken(tokenRequest);
        assertEquals(200,response.getStatusCode(),"Token should be generated.");
        response.then().body(JsonSchemaValidator.matchesJsonSchemaInClasspath("schemas/generate-token-schema.json"));
        TokenResponse token = response.as(TokenResponse.class);
        assertNotNull(token);
        assertNotNull(token.getToken());
        assertFalse(token.getToken().isBlank());
        assertEquals("Success",token.getStatus());
        assertEquals("User authorized successfully.", token.getResult());
        assertNotNull(token.getExpires());

    }
}