package config;

public final class Config {

    private Config() {
    }

    public static final String BASE_API_URL = AppConfig.get("BASE_API_URL");
    public static final String USER_NAME =AppConfig.get("USER_NAME");
    public static final String USER_PASSWORD =AppConfig.get("USER_PASSWORD");

}