package tests;

import clients.AccountClient;
import io.restassured.response.Response;
import models.User;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import utils.EnvReader;
import utils.TestData;

import static org.hamcrest.Matchers.*;

public class generateTokenTest {

    @Test
    void generateToken() {

        User user = new User(EnvReader.get("USER"),EnvReader.get("PASSWORD"));

        Response response = AccountClient.generateToken(user);

        response.then()
                .log().all()
                .statusCode(200)
                .body("token", notNullValue());

        TestData.token = response.jsonPath().getString("token");
    }
}