PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test test-ci clean test-remap-coverage test-resources

build:
	tsc

check:
	tslint --project tsconfig.json --type-check

test:
	make test-resources
	jest

test-ci:
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
	find ./test -name "*.js" -delete
	find ./test -name "*.js.map" -delete
	find ./test -type d -empty -delete

test-remap-coverage:
	remap-istanbul -i coverage/coverage-final.json -o coverage/clover.xml -t clover

test-resources: yarn-link test/resources/repos/nordnet-ui-kit test/resources/repos/arui-feather test/resources/repos/polaris

yarn-link:
	yarn link

test/resources/repos/nordnet-ui-kit:
	cd test/resources/repos \
	&& git clone git@github.com:nordnet/nordnet-ui-kit.git \
	&& cd nordnet-ui-kit \
	&& git checkout d914edd5f97cadb284f7f47b783106c86fe430d9 \
	&& yarn install \
	&& yarn link uxpin-code

test/resources/repos/arui-feather:
	cd test/resources/repos \
	&& git clone git@github.com:alfa-laboratory/arui-feather.git \
	&& cd arui-feather \
	&& git checkout 2299fcb73257d36291eed6d93dc05c2e64531bd2 \
	&& yarn install \
	&& yarn link uxpin-code

test/resources/repos/polaris:
	cd test/resources/repos \
	&& git clone git@github.com:Shopify/polaris.git \
	&& cd polaris \
	&& git checkout 78d5e5e0e4365ece3b6d8ddfed06027ec72159cd \
	&& yarn install \
	&& yarn link uxpin-code