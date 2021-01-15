PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail
UXPIN_CODE=$(shell pwd)/bin/uxpin-merge
YARN ?= yarn

.PHONY: dependencies install build build-watch \
				check check-fix test test-unit test-integration test-ci \
				clean clean-test-resources \
				test-remap-coverage test-resources test-rename-snapshots \
				serve-mineral serve-polaris serve-arui

dependencies:
	$(YARN) install
	cd ./test/resources/designSystems && $(YARN) install || npx yarn@1.7.0 install

build:
	tsc
	make build-server-app
	dts-bundle-generator -o src/types.d.ts src/types.ts

build-watch: build
	tsc --watch

build-server-app:
	webpack --config "./config/webpack.config.js"

check:
	tslint --project tsconfig.json

check-fix:
	tslint --project tsconfig.json --fix

test:
	make test-resources
	make test-unit
	make test-integration

test-unit:
	jest --testMatch="**/__tests__/*.test.ts"

watch-test-unit:
	jest --watchAll --testMatch="**/__tests__/*.test.ts"

test-integration:
	UXPIN_ENV=test jest --testMatch="**/test/integration/**/*.test.ts"

test-ci:
	make test-rename-snapshots
	UXPIN_ENV=test JEST_JUNIT_OUTPUT_DIR=./reports/jest jest --config="jest-ci.json" --maxWorkers=2 --detectOpenHandles --forceExit
	make test-remap-coverage

clean:
	rm -rf ./dist/
	rm -rf ./coverage
	find ./reports -name "*.*" ! -path "./reports/.gitkeep" -delete
	rm -rf ./coverage-cli
	rm -rf ./.nyc_output
	find ./src -name "*.js" ! -path "**/__tests__/resources/**" -delete
	find ./src -name "*.js.map" -delete
	find ./src -type d -empty -delete
	find ./test -name "*.js" ! -path "./test/resources/**" -delete
	find ./test -name "*.js.map" ! -path "./test/resources/**" -delete
	find ./test -type d -empty -delete
	rm -rf ./test/resources/repos/*/.uxpin-merge

clean-test-resources:
	rm -rf ./test/resources/repos/*

test-remap-coverage:
	remap-istanbul -i coverage/coverage-final.json -o coverage/clover.xml -t clover

test-resources:
	cd ./shell_scripts/test_resources && make test-resources -j

test-rename-snapshots:
	./shell_scripts/test-rename-snapshots.sh

publish:
	make build
	npm publish

publish-dev:
	make build
	npm publish --tag dev

serve-mineral:
	cd ./test/resources/repos/mineral-ui && \
	$(UXPIN_CODE) server --webpack-config="./webpack.config.js" --wrapper "./src/library/themes/UXPinWrapper.js"

serialize-mineral:
	cd ./test/resources/repos/mineral-ui && \
	$(UXPIN_CODE) --webpack-config="./webpack.config.js" --wrapper "./src/library/themes/UXPinWrapper.js" --dump

serve-polaris:
	cd ./test/resources/repos/polaris && \
	$(UXPIN_CODE) server --webpack-config="./polaris-webpack.config"

serve-nordnet:
	cd ./test/resources/repos/nordnet-ui-kit && \
	$(UXPIN_CODE) server --webpack-config "../../configs/nordnet-ui-kit-webpack.config.js" --config="../../configs/nordnet-ui-kit-uxpin.config.js"
