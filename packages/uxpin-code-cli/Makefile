PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test clean

build:
	cd ./src && tsc

check:
	cd ./src && tslint --project tsconfig.json --type-check
	cd ./test && tslint --project tsconfig.json --type-check

test:
	jest --forceExit --config=jest.config.json

clean:
	rm -rf ./dist/*
	find ./src -type d -empty -delete
	find ./test -name "*.js" -delete
	find ./test -name "*.js.map" -delete
	find ./test -type d -empty -delete
	rm -rf ./coverage
	rm -rf ./coverage-cli
	rm -rf ./.nyc_output
