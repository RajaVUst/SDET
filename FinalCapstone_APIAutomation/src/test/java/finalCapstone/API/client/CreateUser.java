package finalCapstone.API.client;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.specfactory.ReqSpec;
import finalCapstone.API.support.specfactory.RespSpec;


import static io.restassured.RestAssured.given;

public class CreateUser {

    public model.CreateUserResponse createUser(model.UserRequest request) {
        return given()
                .spec(ReqSpec.requestSpec())
                .body(request)
                .when()
                .post(config.CREATE_USER_PATH)
                .then()
                .spec(RespSpec.createUserResponseSpec())
                .extract()
                .as(model.CreateUserResponse.class);
    }
}
