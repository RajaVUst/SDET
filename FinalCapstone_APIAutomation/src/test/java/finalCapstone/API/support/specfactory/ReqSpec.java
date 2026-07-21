package finalCapstone.API.support.specfactory;

import finalCapstone.API.config.config;
import finalCapstone.API.support.SecretMaskingFilter;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;

public class ReqSpec {
    public static RequestSpecification requestSpec() {
        return new RequestSpecBuilder()
                .setBaseUri(config.BASE_URI)
                .setContentType(ContentType.JSON)
                .addHeader("Accept", "application/json")
                .addFilter(new SecretMaskingFilter())
                .build();
    }
}
