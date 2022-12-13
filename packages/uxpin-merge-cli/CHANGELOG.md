# Changelog

## [2.9.0] - 2022-12-02

### Added

- Parse `@uxpinuseportal` JSdoc comment to render components in UXPin _Preview_ using React Portal ([#337](https://github.com/UXPin/uxpin-merge-tools/pull/346))

## [2.8.2] - 2022-11-29

### Changed

- Replace `colors` by `@colors/colors` ([#337](https://github.com/UXPin/uxpin-merge-tools/pull/337)) Thanks to ([@JuhG](https://github.com/JuhG))
- `push` command with `--force` options ([#330](https://github.com/UXPin/uxpin-merge-tools/pull/330))
- Support `main` branch as default branch name ([#330](https://github.com/UXPin/uxpin-merge-tools/pull/330))

## [2.8.1] - 2022-10-18

### Changed
- Support for normalize paths for windows  ([#328](https://github.com/UXPin/uxpin-merge-tools/pull/328))
## [2.8.0] - 2022-06-09

### Changed
- `delete-version` command with `--tag` and `--branch` options ([#314](https://github.com/UXPin/uxpin-merge-tools/pull/314))
-  GitHub action to publish to packages to both npmjs and github registry ([#308](https://github.com/UXPin/uxpin-merge-tools/pull/308))

## [2.7.10] - 2021-11-17

### Changed
- Better error message for unknown revision ([#299](https://github.com/UXPin/uxpin-merge-tools/pull/299))
- added regex to account for # in tag comment ([#301](https://github.com/UXPin/uxpin-merge-tools/pull/301))

## [2.7.9] - 2021-10-25

### Changed
- Added `@uxpindocurl` jsdoc support ([#297](https://github.com/UXPin/uxpin-merge-tools/pull/297))
- Allow pushing a branch without making changes from original branch ([#294](https://github.com/UXPin/uxpin-merge-tools/pull/294))
- Allow pushing a branch made from specific sha ([#298](https://github.com/UXPin/uxpin-merge-tools/pull/298))
- Upgrade packages(tar, tmpl, path-parse) from dependabot alerts

## [2.7.8] - 2021-08-10

### Changed
- Support creating tag with `--tag` option for Merge library version control ([#282](https://github.com/UXPin/uxpin-merge-tools/pull/282))
- Support `@uxpinsort` JSDoc comment to sort union type in TS ([#285](https://github.com/UXPin/uxpin-merge-tools/pull/285))

## [2.7.7] - 2021-06-03

### Changed
- Blacklist type defined under React namespace in DefinitelyTyped ([#272](https://github.com/UXPin/uxpin-merge-tools/pull/272))
- Upgrade packages(browserslist and dns-packet) from dependabot alerts

## [2.7.6] - 2021-05-17

### Added
- Blacklist some generic props such as HTMLAttributes in TS ([#271](https://github.com/UXPin/uxpin-merge-tools/pull/271))

### Changed
- Replaced `http-server` with `http` for server command ([#268](https://github.com/UXPin/uxpin-merge-tools/pull/268))
- Improved getting Component name from file path ([#269](https://github.com/UXPin/uxpin-merge-tools/pull/269))
- Improved detecting component with forwardRef in TS ([#271](https://github.com/UXPin/uxpin-merge-tools/pull/271))

## [2.7.5] - 2021-04-14
### Added
- Improved Typescript Support
  - Support React.forwardRef and React.FC ([#253](https://github.com/UXPin/uxpin-merge-tools/pull/253))
- Support for named exported component ([#246](https://github.com/UXPin/uxpin-merge-tools/pull/246))

### Changed
- Upgrade some packages(y18n, yargs-parser and elliptic) with security vulnerability

## [2.7.4] - 2021-03-31

### Added
- Improved TypeScript Support:
  - Improved support for different ways of [exporting components](https://github.com/UXPin/uxpin-merge-tools/pull/248)
  - Added support for Date type
  - Added support for enum type

### Changed
- TypeScript updated to v4.2.3
  - Added to allow support for the [Omit Utility Type](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
  - Added to allow support for [Type-Only Imports and Exports](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/#type-only-imports-exports)
- React updated to v17.0.1
  - Added to allow support the new [JSX Transform feature](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
  - You no longer have to write `import React from 'react';` in each component file
- Added support for using custom Babel configuration to use different presets during merge-cli component serialization stage
  - By default we will use react-docgen default presets

### Fixed
- Fixed TypeScript serialization bug that was causing prop names inside quotes to be ignored
  - This scenario was common for customers using Stencil to generate their React Wrappers
  - Example: `"persistent": boolean;` inside a TypeScript interface was previously unrecognised

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
