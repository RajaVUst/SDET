package clients;

import constants.Endpoints;
import io.restassured.response.Response;
import specs.RequestSpec;

import static io.restassured.RestAssured.given;

public class BookStoreClient {

    public static Response getBooks(String token){

        return given()
                .log().all()
                .spec(RequestSpec.request())
                .header("Authorization","Bearer "+token)
                .when()
                .get(Endpoints.GET_BOOKS);
    }

}