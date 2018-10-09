SHELL := /bin/bash -o pipefail

.PHONY: dependencies check build clean test

dependencies: packages/uxpin-merge-cli/node_modules

packages/uxpin-merge-cli/node_modules: packages/uxpin-merge-cli/package.json
	cd packages/uxpin-merge-cli && yarn install

build:
	cd packages/uxpin-merge-cli && make build

check:
	cd packages/uxpin-merge-cli && make check

clean:
	cd packages/uxpin-merge-cli && make clean

test:
	cd packages/uxpin-merge-cli && make test
