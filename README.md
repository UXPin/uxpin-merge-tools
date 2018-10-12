# UXPin Merge

[![CircleCI](https://circleci.com/gh/UXPin/uxpin-merge-tools/tree/master.svg?style=svg&circle-token=3be428149d85d471f8a2661cc39d764a12df725f)](https://circleci.com/gh/UXPin/uxpin-merge-tools/tree/master)
[![codecov](https://codecov.io/gh/UXPin/uxpin-merge-tools/branch/master/graph/badge.svg?token=oCSlKMhJDN)](https://codecov.io/gh/UXPin/uxpin-merge-tools)

## Motivation

Creating design system is not a one time project but an ongoing process that is never complete. Constant changes of existing components and optimization may cause a lack of synchronization between Design Systems and the existing code.

UXPin solution will allow designers and developers to work on the same UI patterns up-to-date with the Design System and code.

## multi-package repository

This repository consists of multiple tools allowing better integration of your Design System repository with [code.uxpin.com](http://code.uxpin.com) services. Look at the Readme file for each of them for more detailed description:
* [uxpin-merge-cli](packages/uxpin-merge-cli/Readme.md) – command-line tool building and serializing DS on the user's CI server
