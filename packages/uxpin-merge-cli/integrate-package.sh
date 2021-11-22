#!/bin/sh

packageName=$1
components=$2
token=$3
styles=$4

./bin/uxpin-merge create-app --package-name="$packageName" --app-name="$token" --components="$components"
cd $token
../bin/uxpin-merge push --token $token --disableVersionControl --styles="$styles" --webpack-config=webpack.config.js
cd ..
rm -fr $token

