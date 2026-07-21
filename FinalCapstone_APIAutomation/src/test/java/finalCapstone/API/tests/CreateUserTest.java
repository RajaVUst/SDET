package finalCapstone.API.tests;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.BaseApiTest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class CreateUserTest extends BaseApiTest {

    @Test
    void shouldCreateUserAndReturnUserId() {
        String userName = "user_" + java.util.UUID.randomUUID();
        model.UserRequest request = new model.UserRequest(userName, config.PASSWORD);

        model.CreateUserResponse response = createUserApi.createUser(request);

        assertThat(response).isNotNull();
        assertThat(response.getUserID()).isNotBlank();
        assertThat(response.getUsername()).isEqualTo(userName);
    }
}
