package finalCapstone.API.tests;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.BaseApiTest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GetTokenTest extends BaseApiTest {

    @Test
    void shouldGenerateTokenForCreatedUser() {
        String userName = "user_" + java.util.UUID.randomUUID();
        model.UserRequest request = new model.UserRequest(userName, config.PASSWORD);

        createUserApi.createUser(request);
        model.TokenResponse tokenResponse = getTokenApi.generateToken(request);

        assertThat(tokenResponse).isNotNull();
        assertThat(tokenResponse.getToken()).isNotBlank();
        assertThat(tokenResponse.getStatus()).isEqualTo("Success");
    }
}
