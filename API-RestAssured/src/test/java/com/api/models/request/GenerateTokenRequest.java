package com.api.models.request;

public record GenerateTokenRequest(
        String userName,
        String password
) {
}
