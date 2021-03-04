# Changelog

## [2.7.3] - 2021-03-01

### Added
- Added an init command which adds the default files required by merge
- Added a generate-presets command which reads the config file and auto generates preset files

## [2.7.2] - 2020-12-15

### Fixed
- Fixed regression causing components panel to not load in Experimental Mode after 2.7.1 changes

## [2.7.1] - 2020-12-15

### Added
- Added support for pushes from non-master branches:
  - New --branch option added to the CLI
  - Default branch is always master, if none is specified
  - Pushing without changes now acts as a way to switch which branch is used in the UI
  - Pushes form CI systems which work in a detached HEAD state now supported

### Changed
- Improved support for TypeScript named arrow functions:
  - Derives name from component's parent's name instead of using the filename
  - See [Typescript export Problems](https://github.com/UXPin/uxpin-merge-tools/issues/208)
  - From [@jrwpatterson](https://github.com/jrwpatterson)
- Replaced deprecated 'opn' pacakge with newer, maintained, 'open' package.
- Upgraded 'typescript' version to ~3.4.0

### Fixed
- Fixed bug for Windows/WSL environments affecting experimental mode:
  - WSL environment was escaping '&' characters with a '^' character
  - See [Experimental Mode not working with Windows (and WSL)](https://github.com/UXPin/uxpin-merge-tools/issues/218)

## [2.7.0] - 2020-10-23

### Added
- Added support for named arrow functions in TypeScript:
  - See [TypeScript Arrow Function Fails to Serialize](https://github.com/UXPin/uxpin-merge-tools/issues/192)

### Changed
- This release open sources the command-line tool component of the UXPin Merge technology under the GPL v3 license:
  - See [announcement blog post](https://www.uxpin.com/studio/blog/weve-open-sourced-the-merge-cli/)
- Updated Readme.md file
