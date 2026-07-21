package tests;

import BaseTest.BaseTest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;
import specs.RequestSpec;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

public class ApiTests extends BaseTest {

    @Test
    void UserCreation() {
        String userName = "JasyRemo";
        String password = "Password@123";

        Map<String, String> createUserPayload = new HashMap<>();
        createUserPayload.put("userName", userName);
        createUserPayload.put("password", password);

        Response createUserResponse = given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .body(createUserPayload)
                .when()
                .post("/Account/v1/User");
        int createUserStatusCode = createUserResponse.getStatusCode();

        assertTrue(createUserStatusCode == 201 || createUserStatusCode == 406,
                "Expected 201 Created or 406 for existing user, but got " + createUserStatusCode);

        if (createUserStatusCode == 201) {
            assertEquals(userName, readJsonValue(createUserResponse, "username"));
            assertNotNull(readJsonValue(createUserResponse, "userID"));
        }
    }

    @Test
    void TokenGeneration() {
        String userName = "JasyRemo";
        String password = "Password@123";

        Map<String, String> tokenPayload = new HashMap<>();
        tokenPayload.put("userName", userName);
        tokenPayload.put("password", password);

        Response tokenResponse = given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .body(tokenPayload)
                .when()
                .post("/Account/v1/GenerateToken");
        assertEquals(200, tokenResponse.getStatusCode(), "Token generation should be successful");

        String token = readJsonValue(tokenResponse, "token");
        assertNotNull(token);
        assertFalse(token.isBlank(), "Token should be present in the response");
    }

    @Test
    void  ReteriveBookUsingToken() {
        String userName = "JasyRemo";
        String password = "Password@123";

        Map<String, String> tokenPayload = new HashMap<>();
        tokenPayload.put("userName", userName);
        tokenPayload.put("password", password);

        Response tokenResponse = given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .body(tokenPayload)
                .when()
                .post("/Account/v1/GenerateToken");
        assertEquals(200, tokenResponse.getStatusCode(), "Token generation should be successful");

        String token = readJsonValue(tokenResponse, "token");
        assertNotNull(token);

        Response booksResponse = given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/BookStore/v1/Books");
        assertEquals(200, booksResponse.getStatusCode(), "Books retrieval should be successful");

        List<String> bookTitles = extractBookTitles(booksResponse);

        assertFalse(bookTitles.isEmpty(), "Books list should not be empty");
        assertTrue(bookTitles.contains("Git Pocket Guide"), "Expected book titles to include Git Pocket Guide");
    }

    private String readJsonValue(Response response, String key) {
        try {
            JsonNode root = new ObjectMapper().readTree(response.getBody().asString());
            return root.path(key).asText();
        } catch (IOException e) {
            throw new RuntimeException("Unable to parse response body", e);
        }
    }

    private List<String> extractBookTitles(Response response) {
        try {
            JsonNode root = new ObjectMapper().readTree(response.getBody().asString());
            JsonNode books = root.path("books");
            List<String> titles = new java.util.ArrayList<>();
            if (books.isArray()) {
                for (JsonNode book : books) {
                    titles.add(book.path("title").asText());
                }
            }
            return titles;
        } catch (IOException e) {
            throw new RuntimeException("Unable to parse books response", e);

        }
    }
}
