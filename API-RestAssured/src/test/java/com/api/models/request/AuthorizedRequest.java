package com.api.models.request;

public record AuthorizedRequest (
        String userName,
        String password
) {
}
