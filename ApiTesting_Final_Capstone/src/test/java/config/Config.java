package config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Config {
    private static final Properties properties = new Properties();
    static {
        try (InputStream input = Config.class
                .getClassLoader()
                .getResourceAsStream("config.properties")) {

            if (input == null) {
                throw new RuntimeException("config.properties not found.");
            }
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Unable to load config.properties", e);
        }

    }

    public static final String BASE_URL =
           getProperty("BASE_URL", "base.url");
    public static final String USERNAME =
          getProperty("USERNAME", "username");
    public static final String PASSWORD =
            getProperty("PASSWORD", "password");
    private static String getProperty(String envKey,
                                      String propertyKey) {
        String value = System.getenv(envKey);
        if (value != null && !value.isBlank()) {
            return value;
        }
        value = properties.getProperty(propertyKey);
        if (value == null || value.isBlank()) {
            throw new RuntimeException(
                    envKey + " is not configured.");
        }
        return value;
    }

}