#!/bin/bash

export PATH=$(yarn global dir)/node_modules/.bin:${PATH}

if [ -n "${GITHUB_HEAD_REF}" ]; then
  export BRANCH="${GITHUB_HEAD_REF#refs/heads/}"
else
  export BRANCH="${GITHUB_REF#refs/heads/}"
fi

export BUILD_NUM=${GITHUB_RUN_NUMBER}
export tag=$(build-utils publishprepare --branch dev --build-num "${BUILD_NUM}")
npm publish --tag dev --verbose || true
