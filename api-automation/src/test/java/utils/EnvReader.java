package utils;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvReader {

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    public static String get(String key) {

        String value = System.getenv(key);

        if (value == null || value.isEmpty()) {
            value = dotenv.get(key);
        }

        return value;
    }
}