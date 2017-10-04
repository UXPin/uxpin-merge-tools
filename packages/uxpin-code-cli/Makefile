PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test test-ci clean clean-test-resources test-remap-coverage test-resources test-rename-snapshots

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
	rm -rf ./coverage
	rm -rf ./coverage-cli
	rm -rf ./.nyc_output
	find ./src -name "*.js" -delete
	find ./src -name "*.js.map" -delete
	find ./src -type d -empty -delete
	find ./test -name "*.js" ! -path "./test/resources/**" -delete
	find ./test -name "*.js.map" ! -path "./test/resources/**" -delete
	find ./test -type d -empty -delete

clean-test-resources:
	rm -rf ./test/resources/repos/*

test-remap-coverage:
	remap-istanbul -i coverage/coverage-final.json -o coverage/clover.xml -t clover

test-resources:
	cd ./shell_scripts/test_resources && make test-resources -j

test-rename-snapshots:
	./shell_scripts/test-rename-snapshots.sh
