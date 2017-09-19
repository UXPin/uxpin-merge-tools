PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test clean test-resources

build:
	tsc

check:
	tslint --project tsconfig.json --type-check

test:
	make test-resources
	jest --forceExit

clean:
	rm -rf ./dist/
	find ./src -name "*.js" -delete
	find ./src -name "*.js.map" -delete
	find ./src -type d -empty -delete
	find ./test -name "*.js" -delete
	find ./test -name "*.js.map" -delete
	find ./test -type d -empty -delete
	rm -rf ./coverage
	rm -rf ./coverage-cli
	rm -rf ./.nyc_output
	rm -rf ./test/resources/repos/*

test-resources: test/resources/repos/nordnet-ui-kit test/resources/repos/arui-feather test/resources/repos/polaris

test/resources/repos/nordnet-ui-kit:
	ln -s $(shell npm root)/nordnet-ui-kit test/resources/repos/nordnet-ui-kit

test/resources/repos/arui-feather:
	ln -s $(shell npm root)/arui-feather test/resources/repos/arui-feather

test/resources/repos/polaris:
	ln -s $(shell npm root)/@shopify/polaris test/resources/repos/polaris
