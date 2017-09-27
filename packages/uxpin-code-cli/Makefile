PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test test-ci clean test-remap-coverage test-resources test-rename-snapshots

build:
	tsc

check:
	tslint --project tsconfig.json --type-check

test:
	make test-resources
	jest

test-ci:
	make test-rename-snapshots
	TEST_REPORT_PATH=./reports jest --config="jest-ci.json"
	make test-remap-coverage

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

test-remap-coverage:
	remap-istanbul -i coverage/coverage-final.json -o coverage/clover.xml -t clover

test-resources: test/resources/repos/nordnet-ui-kit test/resources/repos/arui-feather test/resources/repos/polaris

test-rename-snapshots:
	./utils/test-rename-snapshots.sh

test/resources/repos/nordnet-ui-kit:
	ln -s $(shell npm root)/nordnet-ui-kit test/resources/repos/nordnet-ui-kit

test/resources/repos/arui-feather:
	ln -s $(shell npm root)/arui-feather test/resources/repos/arui-feather

test/resources/repos/polaris:
	ln -s $(shell npm root)/@shopify/polaris test/resources/repos/polaris
