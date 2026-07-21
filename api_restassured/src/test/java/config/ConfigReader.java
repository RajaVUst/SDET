package config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ConfigReader {

    private static final Properties properties = new Properties();

    static {
        load("application.properties");
    }

    private ConfigReader() {
    }

    private static void load(String resourceName) {
        try (InputStream inputStream = ConfigReader.class.getClassLoader().getResourceAsStream(resourceName)) {
            if (inputStream == null) {
                return;
            }
            properties.load(inputStream);
        } catch (IOException exception) {
            throw new IllegalStateException("Unable to read configuration: " + resourceName, exception);
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    public static String getRequiredProperty(String key) {
        String value = getProperty(key);
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Missing required configuration property: " + key);
        }
        return value;
    }
}
