package finalCapstone.API.tests;

import finalCapstone.API.config.config;
import finalCapstone.API.model.model;
import finalCapstone.API.support.BaseApiTest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class GetBooksTest extends BaseApiTest {

    @Test
    void shouldReturnBookListWhenTokenIsValid() {
        String userName = "user_" + java.util.UUID.randomUUID();
        model.UserRequest request = new model.UserRequest(userName, config.PASSWORD);

        createUserApi.createUser(request);
        model.TokenResponse tokenResponse = getTokenApi.generateToken(request);
        model.BooksResponse booksResponse = getBooksApi.getBooks(tokenResponse.getToken());

        assertThat(booksResponse).isNotNull();
        assertThat(booksResponse.getBooks()).isNotEmpty();
        assertThat(booksResponse.getBooks().get(0).getTitle()).isNotBlank();
    }
}
