#!/bin/bash
# shellcheck source=./helpers.sh
source .uxpinci/helpers.sh

cd packages/uxpin-merge-cli

onvault make test-resources

make check
make build

export CHROME_PATH=/usr/bin/google-chrome
make test-ci

./node_modules/.bin/codecov -F unittests -F uxpin_merge_cli