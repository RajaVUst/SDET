package api.auth;

import api.clients.AuthClient;
import builders.LoginRequestBuilder;
import io.restassured.response.Response;

public final class TokenManager {
    private static String token;
    private TokenManager() {
    }

    public static String getToken() {
        if (token == null) {
            Response response = new AuthClient().login(new LoginRequestBuilder()
                            .withDefaultUser()
                            .build());

            token = response.jsonPath().getString("token");
        }
        return token;
    }
}