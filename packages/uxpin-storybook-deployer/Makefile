PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail
YARN ?= yarn

.PHONY: dependencies build build-watch

dependencies:
	$(YARN) install

build:
	tsc

build-watch: build
	tsc --watch
