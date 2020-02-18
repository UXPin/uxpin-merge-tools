PATH := $(shell yarn bin):$(PATH)
SHELL := /bin/bash -o pipefail

build: build-two-components-with-config

build-two-components-with-config:
	cd twoComponentsWithConfig && tsc || true
