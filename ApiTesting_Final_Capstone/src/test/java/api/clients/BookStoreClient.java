package api.clients;
import specs.RequestSpecs;
import io.restassured.response.Response;
import static io.restassured.RestAssured.given;
public class BookStoreClient {
    public static Response getBooks(String token) {
        return given()
                .spec(RequestSpecs.getRequestSpec())
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/BookStore/v1/Books");

    }

}