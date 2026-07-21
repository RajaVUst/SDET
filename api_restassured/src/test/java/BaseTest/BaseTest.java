package BaseTest;

import config.ConfigReader;

public class BaseTest {

    protected static String getUserName() {
        return ConfigReader.getRequiredProperty("api.username");
    }

    protected static String getPassword() {
        return ConfigReader.getRequiredProperty("api.password");
    }
}
