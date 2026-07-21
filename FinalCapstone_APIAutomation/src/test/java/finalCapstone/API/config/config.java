package finalCapstone.API.config;

import io.github.cdimascio.dotenv.Dotenv;

public class config {
    private static final Dotenv DOTENV = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    public static final String BASE_URI = getRequiredSecret("BASE_URI");
    public static final String CREATE_USER_PATH = "/Account/v1/User";
    public static final String GENERATE_TOKEN_PATH = "/Account/v1/GenerateToken";
    public static final String BOOKS_PATH = "/BookStore/v1/Books";
    public static final String PASSWORD = getRequiredSecret("PASSWORD");

    private config() {
    }

    private static String getRequiredSecret(String key) {
        String value = DOTENV.get(key);
        if (value == null || value.isBlank()) {
            String systemValue = System.getenv(key);
            if (systemValue != null && !systemValue.isBlank()) {
                value = systemValue;
            }
        }
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(
                    "Required secret '" + key + "' is missing or blank. Add it to the .env file."
            );
        }
        return value;
    }
}
