package finalCapstone.API.client;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.specfactory.ReqSpec;
import finalCapstone.API.support.specfactory.RespSpec;

import static io.restassured.RestAssured.given;

public class GetBooks {

    public model.BooksResponse getBooks(String token) {
        return given()
                .spec(ReqSpec.requestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get(config.BOOKS_PATH)
                .then()
                .spec(RespSpec.getBooksResponseSpec())
                .extract()
                .as(model.BooksResponse.class);
    }
}
