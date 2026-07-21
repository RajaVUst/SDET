package finalCapstone.API.client;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.specfactory.ReqSpec;
import finalCapstone.API.support.specfactory.RespSpec;

import static io.restassured.RestAssured.given;

public class GetToken {

    public model.TokenResponse generateToken(model.UserRequest request) {
        return given()
                .spec(ReqSpec.requestSpec())
                .body(request)
                .when()
                .post(config.GENERATE_TOKEN_PATH)
                .then()
                .spec(RespSpec.generateTokenResponseSpec())
                .extract()
                .as(model.TokenResponse.class);
    }
}
