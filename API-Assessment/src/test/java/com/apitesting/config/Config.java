package com.apitesting.config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {

    private Config() {}

    private static final Dotenv dotenv = Dotenv.configure()
            .ignoreIfMissing()
            .load();

    private static final String BASEURL =
            dotenv.get("baseUrl", "");

    private static final String APIURL =
            dotenv.get("apiUrl", "");


    public static String BASEURL() {
        return BASEURL;
    }

    public static String APIURL() {
        return APIURL;
    }
}