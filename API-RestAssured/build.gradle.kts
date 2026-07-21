plugins {
    java
}

group = "org.example"
version = "1.0-SNAPSHOT"


java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(22))
    }
}


repositories {
    mavenCentral()
}


val junitVersion = "5.12.2"
val junitPlatformVersion = "1.12.2"
val restAssuredVersion = "5.5.6"
val jacksonVersion = "2.20.0"
val hamcrestVersion = "3.0"
val dotenvVersion = "5.2.2"
val slf4jVersion = "2.0.17"
val allureVersion = "2.35.2"


dependencies {

    // JUnit 5
    testImplementation("org.junit.jupiter:junit-jupiter:$junitVersion")

    // JUnit Platform Launcher
    testImplementation("org.junit.platform:junit-platform-launcher:$junitPlatformVersion")

    // Rest Assured
    testImplementation("io.rest-assured:rest-assured:$restAssuredVersion")

    // JSON Schema Validation
    testImplementation("io.rest-assured:json-schema-validator:$restAssuredVersion")

    // Hamcrest
    testImplementation("org.hamcrest:hamcrest:$hamcrestVersion")

    // Jackson
    implementation("com.fasterxml.jackson.core:jackson-databind:$jacksonVersion")

    // Dotenv
    implementation("io.github.cdimascio:java-dotenv:$dotenvVersion")

    // Logging
    testImplementation("org.slf4j:slf4j-simple:$slf4jVersion")

    // Allure JUnit 5
    testImplementation("io.qameta.allure:allure-jupiter:$allureVersion")

    // Allure Rest Assured
    testImplementation("io.qameta.allure:allure-rest-assured:$allureVersion")
}


tasks.test {
    useJUnitPlatform()
    systemProperty("allure.results.directory", "${project.projectDir}/allure-results")
}