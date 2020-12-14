SHELL := /bin/bash -o pipefail

.PHONY: dependencies check build clean test

dependencies: packages/uxpin-merge-cli/node_modules

packages/uxpin-merge-cli/node_modules: packages/uxpin-merge-cli/package.json
	$(MAKE) -C packages/uxpin-merge-cli dependencies

build:
	$(MAKE) -C packages/uxpin-merge-cli build

check:
	$(MAKE) -C packages/uxpin-merge-cli check

clean:
	$(MAKE) -C packages/uxpin-merge-cli clean

test:
	$(MAKE) -C packages/uxpin-merge-cli test
