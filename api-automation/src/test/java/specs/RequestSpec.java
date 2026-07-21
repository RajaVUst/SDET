package specs;

import io.restassured.builder.RequestSpecBuilder;
import io.restassured.specification.RequestSpecification;
import utils.EnvReader;

public class RequestSpec {
    public static RequestSpecification request(){
        return new RequestSpecBuilder()
                .setBaseUri(EnvReader.get("BASE_URL"))
                .setContentType("application/json")
                .build();
    }
}
