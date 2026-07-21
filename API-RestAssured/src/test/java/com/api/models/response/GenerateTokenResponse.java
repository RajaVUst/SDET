package com.api.models.response;

public record GenerateTokenResponse(
        String token,
        String expires,
        String status,
        String result
) {
}
