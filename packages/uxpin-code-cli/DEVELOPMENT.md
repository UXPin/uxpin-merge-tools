
## Jest Test setup for JetBrains IDE

### Run a particular test from code
JetBrains IDE allow beautifully run any test (or test suite) just from it's implementation by a single click:
![Run single test from code](docs/development/run-test-from-code.png)

To make it working you have to setup a default configuration of the Jest framework in "Run > Edit configurations..." the following way:
![Jest default configuration for the project](docs/development/jest-default-config.png)

### Run only unit tests

To run unit (or integration) test separately from the other you can run `make test-unit` or `make test-integration` in console. The similar behaviour can be achieved using configuration of the Jest framework integration in the JetBrains IDE. Go to "Run > Edit Configurations...", add new Jest configuration and configure it as below:

![Run only unit tests with Jest integration for JetBrains IDE](docs/development/unit-only-jest-tests.png)

Note the value in the "Jest options" field:
```
--testPathIgnorePatterns="/(test/integration|node_modules|test/resources)/"
```
To create a configuration running only integration tests, change the value of this field to the following value (excluding tests in the `spec` directory):
```
--testPathIgnorePatterns="/(test/spec|node_modules|test/resources)/"
```
