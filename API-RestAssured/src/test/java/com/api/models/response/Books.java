package com.api.models.response;

public record Books(
        String isbn,
        String title,
        String subTitle,
        String author,
        String publish_date,
        String publisher,
        int pages,
        String description,
        String website
) { }
