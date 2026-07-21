package com.api.models.request;

public record CreateUserRequest(
        String userName,
        String password
) {
}

