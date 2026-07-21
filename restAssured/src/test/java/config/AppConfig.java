package config;
import io.github.cdimascio.dotenv.Dotenv;

public final class AppConfig {

    private static final Dotenv dotenv = Dotenv.configure()
            .directory("..")          
            .ignoreIfMissing()      
            .load();

    private AppConfig() {
 }

    public static String get(String key) {

        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            value = dotenv.get(key);
        }

        if (value == null || value.isBlank()) {
            throw new IllegalStateException(
                    "Missing required configuration: " + key
            );
        }

        return value.trim();
    }


    public static String get(String key, String defaultValue) {
        String value = getOptional(key);
        return (value == null || value.isBlank())
                ? defaultValue
                : value.trim();
    }


    public static String getOptional(String key) {
        String value = System.getenv(key);
        if (value == null || value.isBlank()) {
            value = dotenv.get(key);
        }
        return (value == null || value.isBlank())
                ? null
                : value.trim();
    }

}