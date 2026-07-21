package api.clients;
import models.CreateUserRequest;
import models.TokenRequest;
import specs.RequestSpecs;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;
public class UserClient {
    public static Response createUser(CreateUserRequest request) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .body(request)
                .when()
                .post("/Account/v1/User");

    }

    public static Response generateToken(TokenRequest request) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .body(request)
                .when()
                .post("/Account/v1/GenerateToken");

    }

}