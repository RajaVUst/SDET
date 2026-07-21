package api.clients;

import api.specs.RequestSpecs;
import io.restassured.response.Response;

import static io.restassured.RestAssured.given;

public class BookClient {

    public Response getBooks(String token) {
        return given()
                .spec(RequestSpecs.authenticated(token))
                .when()
                .get("/BookStore/v1/Books");
    }
}
