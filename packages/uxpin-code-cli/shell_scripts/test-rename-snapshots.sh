#!/usr/bin/env bash

find ./test -name "*.ts.snap" -exec bash -c 'mv "$1" "${1%.ts.snap}".js.snap' - '{}' \;
