PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

.PHONY: build check test clean

check:
	tslint --project tsconfig.json --type-check

build:
	cd ./src && tsc

test:
	cd ./test && tsc
	jest --forceExit

clean:
	rm -rf ./dist/*
	find ./src -type d -empty -delete
	find ./test -name "*.js" -delete
	find ./test -name "*.js.map" -delete
	find ./test -type d -empty -delete