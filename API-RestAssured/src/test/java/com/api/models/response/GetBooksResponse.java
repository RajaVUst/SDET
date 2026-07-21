package com.api.models.response;

import java.util.List;

public record GetBooksResponse(List<Books> books) {
}
