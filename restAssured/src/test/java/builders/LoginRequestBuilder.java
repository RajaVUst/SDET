package builders;

import config.Config;
import models.LoginRequest;

public class LoginRequestBuilder {

    private final LoginRequest request = new LoginRequest();

    public LoginRequestBuilder() {
    }

    public LoginRequestBuilder withUserName(String userName) {
        request.setUserName(userName);
        return this;
    }

    public LoginRequestBuilder withPassword(String password) {
        request.setPassword(password);
        return this;
    }

    public LoginRequestBuilder withDefaultUser() {
        request.setUserName(Config.USER_NAME);
        request.setPassword(Config.USER_PASSWORD);
        return this;
    }

    public LoginRequest build() {
        return request;
    }
}