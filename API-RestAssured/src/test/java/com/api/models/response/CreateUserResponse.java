package com.api.models.response;

import java.util.List;

public record CreateUserResponse(
        String userID,
        String username,
        List<Books> books
) { }


