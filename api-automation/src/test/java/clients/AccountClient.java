package clients;

import constants.Endpoints;
import io.restassured.response.Response;
import models.User;
import specs.RequestSpec;

import static io.restassured.RestAssured.given;

public class AccountClient {

    public static Response createUser(User user){

        return given()
                .log().all()
                .spec(RequestSpec.request())
                .body(user)
                .when()
                .post(Endpoints.CREATE_USER);
    }

    public static Response generateToken(User user){

        return given()
                .log().all()
                .spec(RequestSpec.request())
                .body(user)
                .when()
                .post(Endpoints.GENERATE_TOKEN);
    }

}