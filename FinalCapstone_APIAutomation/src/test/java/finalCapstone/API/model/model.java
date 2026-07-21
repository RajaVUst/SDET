package finalCapstone.API.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

public class model {
    public static class UserRequest {
        private String userName;
        private String password;

        public UserRequest() {
        }

        public UserRequest(String userName, String password) {
            this.userName = userName;
            this.password = password;
        }

        public String getUserName() {
            return userName;
        }

        public void setUserName(String userName) {
            this.userName = userName;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class CreateUserResponse {
        private String userID;
        private String username;
        private java.util.List<Book> books;

        public String getUserID() {
            return userID;
        }

        public void setUserID(String userID) {
            this.userID = userID;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public java.util.List<Book> getBooks() {
            return books;
        }

        public void setBooks(java.util.List<Book> books) {
            this.books = books;
        }
    }

    public static class TokenResponse {
        private String token;
        private String expires;
        private String status;
        private String result;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getExpires() {
            return expires;
        }

        public void setExpires(String expires) {
            this.expires = expires;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getResult() {
            return result;
        }

        public void setResult(String result) {
            this.result = result;
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Book {
        private String isbn;
        private String title;

        public String getIsbn() {
            return isbn;
        }

        public void setIsbn(String isbn) {
            this.isbn = isbn;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }
    }

    public static class BooksResponse {
        private java.util.List<Book> books;

        public java.util.List<Book> getBooks() {
            return books;
        }

        public void setBooks(java.util.List<Book> books) {
            this.books = books;
        }
    }
}
