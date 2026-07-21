package api.clients;

import api.specs.RequestSpecs;
import io.restassured.response.Response;
import models.LoginRequest;

import static io.restassured.RestAssured.given;

public class AuthClient {

    public Response createUser(LoginRequest request) {
        return given()
                .spec(RequestSpecs.unauthenticated())
                .body(request)
                .when()
                .post("/Account/v1/User");
    }

    public Response generateToken(LoginRequest request) {
        return given()
                .spec(RequestSpecs.unauthenticated())
                .body(request)
                .when()
                .post("/Account/v1/GenerateToken");
    }

    public Response login(LoginRequest request) {
        return createUser(request);
    }
}
