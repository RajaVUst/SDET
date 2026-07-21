package com.apitesting.client;

import com.apitesting.support.builders.ApiSpecBuilders;
import io.restassured.response.Response;
import java.util.Map;
import static io.restassured.RestAssured.given;

public class AuthClient {
        public Response createUser(String username, String password) {
            return given()
                    .spec(ApiSpecBuilders.requestSpec())
                    .body(Map.of("userName", username, "password", password))
                    .when()
                    .post("/Account/v1/user");
        }

        public Response getToken(String username, String password){
            return given()
                    .spec(ApiSpecBuilders.requestSpec())
                    .body(Map.of("userName", username, "password", password))
                    .when()
                    .post("/Account/v1/GenerateToken");
        }

}