package finalCapstone.API.support;

import finalCapstone.API.client.CreateUser;
import finalCapstone.API.client.GetBooks;
import finalCapstone.API.client.GetToken;
import finalCapstone.API.config.config;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;

public abstract class BaseApiTest {
    protected static CreateUser createUserApi;
    protected static GetToken getTokenApi;
    protected static GetBooks getBooksApi;

    @BeforeAll
    static void configureApi() {
        RestAssured.baseURI = config.BASE_URI;
        RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();

        createUserApi = new CreateUser();
        getTokenApi = new GetToken();
        getBooksApi = new GetBooks();
    }
}
