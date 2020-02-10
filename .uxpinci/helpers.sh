#!/bin/bash

ARTIFACTS_PATH="${ARTIFACTS_PATH:-/artifacts}"
FINAL_EXIT_CODE=0

# Wrap command to capture it's error exit code
# If subcommand exits with status not equal to zero, it will be suppressed and execution will continue.
function capture_status {
  "$@" || FINAL_EXIT_CODE=$?
}

# Teardown function will be executed when script completes
function teardown {
  status=$?
  if [ $status -eq 0 ]; then
    # last command completed successfully, return previously captured code
    exit ${FINAL_EXIT_CODE}
  else
    # last command failed, return it's status code
    exit $status
  fi
}
trap teardown EXIT INT

set -exo pipefail
