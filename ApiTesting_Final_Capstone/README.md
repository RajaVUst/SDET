# API Testing Final Capstone

This repository contains API automation tests built with Java, Maven, Rest-Assured, JUnit 5, and Allure reporting.

## Project Overview

The test suite covers:
- user creation
- authentication token generation
- retrieving books for an authenticated user

## Tech Stack

- Java 21
- Maven
- Rest-Assured
- JUnit 5
- Allure
- JSON Schema Validation

## Project Structure

- src/test/java/api/clients - API client classes
- src/test/java/config - environment and endpoint configuration
- src/test/java/models - request and response models
- src/test/java/tests - test cases
- src/test/resources - config properties and JSON schemas

## Prerequisites

- Java 21 or higher
- Maven

## Configuration

The tests read configuration from environment variables first and fall back to the properties file under:

- src/test/resources/config.properties

Required environment variables:
- BASE_URL
- USERNAME
- PASSWORD

## Run Tests Locally

Run all tests:

```bash
mvn -B test
```

Run tests and generate the Allure report:

```bash
mvn -B test verify
```

## Generate Allure Report

After running the tests, generate the HTML report with:

```bash
mvn -B allure:report
```

The report will be available in:

- target/site/allure-maven-plugin/index.html

## Test Cases

The current suite includes:
- TokenGenerationTest
- UserCreationTest
- VerifyBooksTests

## Notes

- Username and password should be provided through environment variables or secure CI secrets.
- The base URL defaults to the DemoQA API in the project configuration.
