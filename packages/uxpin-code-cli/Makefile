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
	rm -rf ./coverage
	rm -rf ./coverage-cli
	rm -rf ./.nyc_output
	rm -rf ./test/resources/repos/*
	find ./src -name "*.js" -delete
	find ./src -name "*.js.map" -delete
	find ./src -type d -empty -delete
	find ./test -name "*.js" ! -path "./test/resources/configs/**" -delete
	find ./test -name "*.js.map" -delete
	find ./test -type d -empty -delete

test-remap-coverage:
	remap-istanbul -i coverage/coverage-final.json -o coverage/clover.xml -t clover

test-resources: test/resources/repos/nordnet-ui-kit test/resources/repos/arui-feather test/resources/repos/polaris

test-rename-snapshots:
	./shell_scripts/test-rename-snapshots.sh

test/resources/repos/nordnet-ui-kit:
	cd test/resources/repos \
	&& git clone https://github.com/nordnet/nordnet-ui-kit.git \
	&& cd nordnet-ui-kit \
	&& git checkout d914edd5f97cadb284f7f47b783106c86fe430d9 \
	&& yarn install

test/resources/repos/arui-feather:
	cd test/resources/repos \
	&& git clone https://github.com/alfa-laboratory/arui-feather.git \
	&& cd arui-feather \
	&& git checkout 2299fcb73257d36291eed6d93dc05c2e64531bd2 \
	&& yarn install

test/resources/repos/polaris:
	cd test/resources/repos \
	&& git clone https://github.com/Shopify/polaris.git \
	&& cd polaris \
	&& git checkout 78d5e5e0e4365ece3b6d8ddfed06027ec72159cd \
	&& yarn install
