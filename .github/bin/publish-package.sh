#!/bin/bash

echo "${NPMRC}"

export PATH=$(yarn global dir)/node_modules/.bin:${PATH}

if [ -n "${GITHUB_HEAD_REF}" ]; then
  export BRANCH="${GITHUB_HEAD_REF#refs/heads/}"
else
  export BRANCH="${GITHUB_REF#refs/heads/}"
fi

if [ "${PACKAGE_TAG}" = "dev" ]; then
  export BUILD_NUM=${GITHUB_RUN_NUMBER}
  build-utils publishprepare --branch dev --build-num "${BUILD_NUM}"
fi

npm publish --tag "${PACKAGE_TAG}" --verbose || true
