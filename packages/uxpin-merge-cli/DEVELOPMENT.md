
# Development

## First steps

### Requirements

We haven't tested the development environment on Windows, so it's better to use Mac or Linux to play with the tool, especially that most of the build tasks are created in Makefile.
Tools required to set up a development environment:

1. [make](https://www.gnu.org/software/make/)
2. [Node.js](https://nodejs.org/) >=6.5.0
3. [Yarn](https://yarnpkg.com/) >=1.2.1

### Basic commands

After cloning the repo, go the the CLI package, and **install dependencies**:
```bash
cd packages/uxpin-merge-cli/
make dependencies
make test-resources
```
The second command is cloning and installing dependencies of our test repositories. You can find them later under `packages/uxpin-merge-cli/test/resources/repos`.

Then, **build the project**:
```bash
make build
```

Now, **run tests**, to make sure everything is working as expected:
```bash
make test
```

You can also **check the code style**:

```
make check
```

### Different tests

`make test` is running all tests (both integration and unit tests), which takes some time. During development you may find it useful to run only a unit test:

```
make test-unit
```

or only the integration:

```
make test-integration
```

See also the "Jest Test setup for JetBrains IDE" section below, as running tests from IDE is far the most handy method to work with them.

### Cleaning project

Sometimes after changing a branch there are some messy JS files (TS compilation output) or empty directories. To clean this stuff and get the project fresh and ready, run:

```
make clean build
```

## How to run debug server for the example repo?

Debug server is a tool that allows verifying how our DS components are built and rendered, before we push them to UXPin.

Debug server is run for every example repository within e2e tests located in `test/integration/server`, however sometimes it's useful to be able to run such server manually for debugging or tests authoring.

and finally run the server in a directory of the example design system (Polaris in this case), providing all required config flags:
```bash
cd test/resources/repos/polaris/
../../../../bin/uxpin-merge server --webpack-config "./playground/webpack.config"
```
Now wait for the console log claiming the server is ready, and open the given address in the browser:
```text
server started successfully!
server ready on http://127.0.0.1:8080/
```

💡 Note, that there are several make tasks allowing running server in our test repositories:

  * `make serve-mineral`
  * `make serve-polaris`
  * `make serve-nordnet`

⚠️ Note, that due to the recent update of Webpack, some of the example repositories may not work. Currently the only working example is MineralUI

## How to save generated JSON metadata to a file?

Simply use bash to redirect stdout to a JSON file:
```
cd test/resources/repos/mineral-ui/
../../../../bin/uxpin-merge --webpack-config "./playground/webpack.config" --dump > ../../../../metadata.json
```

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
--testPathIgnorePatterns="/(src|node_modules|test/resources)/"
```
