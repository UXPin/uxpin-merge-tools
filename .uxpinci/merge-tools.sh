#!/bin/bash
# shellcheck source=./helpers.sh
source .uxpinci/helpers.sh

cd packages/uxpin-merge-cli

onvault make test-resources

make check
make build

export CHROME_PATH=/usr/bin/google-chrome
#UXPIN_ENV=test TEST_REPORT_PATH=./reports ./node_modules/.bin/jest --config="jest-ci.json" --maxWorkers=2 --detectOpenHandles --forceExit --bail test/integration/experimentation/server/page/save/PageSaveHandler.test.js || true
make test-ci

./node_modules/.bin/codecov -F unittests -F uxpin_merge_cli