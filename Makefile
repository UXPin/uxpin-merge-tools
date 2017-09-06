SHELL := /bin/bash -o pipefail

.PHONY: dependencies check build clean test

dependencies: packages/uxpin-code-cli/node_modules

packages/uxpin-code-cli/node_modules: packages/uxpin-code-cli/package.json
	cd packages/uxpin-code-cli && yarn install

build:
	cd packages/uxpin-code-cli && make build

check:
	cd packages/uxpin-code-cli && make check

clean:
	cd packages/uxpin-code-cli && make clean

test:
	cd packages/uxpin-code-cli && make test
