SHELL := /bin/bash -o pipefail

.PHONY: dependencies check build clean test

# The repo is set as a monorepo using Yarn workspaces, dependencies are installed at the root level
dependencies: yarn install

build:
	$(MAKE) -C packages/uxpin-merge-cli build

check:
	$(MAKE) -C packages/uxpin-merge-cli check

clean:
	$(MAKE) -C packages/uxpin-merge-cli clean

test:
	$(MAKE) -C packages/uxpin-merge-cli test
