package com.apitesting.data.secrets;

import io.github.cdimascio.dotenv.Dotenv;

public final class Secrets {

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private Secrets() {
    }

    public static String username() {
        return dotenv.get("API_USERNAME");
    }

    public static String password() {
        return get("PASSWORD");
    }

    public static String get(String key) {
        String value = dotenv.get(key.toUpperCase());

        if (value == null) {
            value = dotenv.get(key);
        }

        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Missing secret: " + key);
        }

        return value;
    }
}