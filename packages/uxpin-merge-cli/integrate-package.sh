#!/bin/sh

packageName=$1
components=$2
token=$3
styles=$4

./bin/uxpin-merge create-app --package-name="$packageName" --app-name="$token" --components="$components"
cd tmp/$token
../../bin/uxpin-merge push --token $token --disableVersionControl --styles="$styles"
cd ..
rm -fr $token

