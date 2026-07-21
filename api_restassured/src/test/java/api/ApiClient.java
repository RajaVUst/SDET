package api;

import static io.restassured.RestAssured.given;

import io.restassured.response.Response;
import specs.RequestSpec;
import specs.ResponseSpec;

import java.util.HashMap;
import java.util.Map;

public class ApiClient {

    public static Response get(String path) {
        return given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .when()
                .get(path)
                .then()
                .spec(ResponseSpec.getDefaultResponseSpec())
                .extract()
                .response();
    }

    public static Response createUser(String userName, String password) {
        Map<String, String> payload = new HashMap<>();
        payload.put("userName", userName);
        payload.put("password", password);

        return given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .body(payload)
                .when()
                .post("/Account/v1/User");
    }

    public static Response generateToken(String userName, String password) {
        Map<String, String> payload = new HashMap<>();
        payload.put("userName", userName);
        payload.put("password", password);

        return given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .body(payload)
                .when()
                .post("/Account/v1/GenerateToken");
    }

    public static Response getBooks(String token) {
        return given()
                .spec(RequestSpec.getDefaultRequestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/BookStore/v1/Books")
                .then()
                .spec(ResponseSpec.getDefaultResponseSpec())
                .extract()
                .response();
    }
}
