package tests;

import clients.BookStoreClient;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import utils.TestData;

import static org.hamcrest.Matchers.*;

public class getBooksTest  {

    @Test
    void getBooks() {

        BookStoreClient.getBooks(TestData.token)
                .then()
                .log().all()
                .statusCode(200)
                .body("books.size()", greaterThan(0))
                .body("books.title", not(empty()));
    }
}