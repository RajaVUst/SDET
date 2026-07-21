package tests;

import clients.AccountClient;
import models.User;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import utils.EnvReader;
import utils.TestData;

import java.util.UUID;

import static org.hamcrest.Matchers.*;

public class createUserTest {

    @Test
    void createUser() {

        User user = new User(EnvReader.get("USER"),EnvReader.get("PASSWORD"));
        AccountClient.createUser(user)
                .then()
                .log().all()
                .statusCode(201)
                .body("userID", notNullValue())
                .body("username", equalTo(EnvReader.get("USER")));
    }
}