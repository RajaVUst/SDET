package api.auth;

public class TokenManager {
    private static String token;
    private TokenManager() {}

    public static void setToken(String bearerToken) {
        token = bearerToken;
    }
    public static String getToken() {
        return token;
    }

}