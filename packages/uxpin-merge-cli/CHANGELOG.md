# Changelog

## [3.7.0] - 2025-06-20
- TypeScript updated to v4.2.3
- fix package critical vulnerabilities
- add @uxpindynamicoptions tag

## [3.5.5] - 2025-04-08
- Removed ngrok from dependencies due to it being flagged as malicious.

## [3.5.4] - 2025-03-20
- Add experimental support for design systems in React 19.

## [3.5.3] - 2025-03-04
- Support for parsing JSX passed in object and array properties in presets.

## [3.5.2] - 2025-01-29
- Fix parsing issues where ReactNode and ReactElement were not properly detected - part 2

## [3.5.1] - 2025-01-29
- Fix parsing issues where ReactNode and ReactElement were not properly detected

## [3.5.0] - 2024-12-13

### Added

- Upgrade react-docgen to v7.10 for ES2020 Support
  - The upgrade to react-docgen version 7.10 introduces several enhancements and fixes that improve the maintainability and functionality of js parser

  
## [3.4.8] - 2024-11-28

### Added

- Supports returning function props `@uxpincontroltype returningfunction()`
- Supports material icons props `@uxpincontroltype materialicons`


## [3.4.7] - 2024-10-25

### Added

- Hotfix - Allows using css control for shape and custom type


## [3.4.6] - 2024-10-17

### Added

- Supports css styles with `@uxpincontroltype css`


## [3.4.5] - 2024-09-18

- Improves finding component file based on relative path


## [3.4.4] - 2024-08-06

- Handles cases when reference logs are empty and we can't determine that given commit is from the master/main or not

## [3.4.3] - 2024-02-29

### Added

- Supports image type with `@uxpincontroltype image` 
- Possibility of adding library settings in uxpin.config.js - currently handled only by global UXPin libraries

## [3.4.2] - 2023-09-29

- Removes sorting properties in experimental mode and dump command to keep the same order as declared in code ([#414](https://github.com/UXPin/uxpin-merge-tools/pull/414))


## [3.4.1] - 2023-09-20

- Displaying description and doc url in experimental mode ([#413](https://github.com/UXPin/uxpin-merge-tools/pull/413))


## [3.4.0] - 2023-09-18

- Supports component description visible in properties panel with `@uxpindescription` ([#410](https://github.com/UXPin/uxpin-merge-tools/pull/410))


## [3.3.0] - 2023-08-01

- Let users inject HTML tags in page `<head>` ([#401](https://github.com/UXPin/uxpin-merge-tools/pull/401))

## [3.2.0] - 2023-07-20

- Faster serialization of TS components ([#398](https://github.com/UXPin/uxpin-merge-tools/pull/398))
- Upgrade to latest Webpack 5 ([#397](https://github.com/UXPin/uxpin-merge-tools/pull/397))

## [3.1.0] - 2023-07-11

- Accept a function for `@uxpinuseportal` annotation to make the "Render in Portal" behavior dynamic ([#391](https://github.com/UXPin/uxpin-merge-tools/pull/391))

## [3.0.6] - 2023-07-05

- Add debug mode using `DEBUG=uxpin*` ([#387](https://github.com/UXPin/uxpin-merge-tools/pull/389))

## [3.0.5] - 2023-06-26

### Changed

- Remove encoding of branch name when using push or delete commands ([#387](https://github.com/UXPin/uxpin-merge-tools/pull/387))

## [3.0.4] - 2023-06-19

### Changed

- Fix for `unable to find revision...` issue during removing branch ([#378](https://github.com/UXPin/uxpin-merge-tools/pull/378))
- Improving parsing TS files for union type ([#377](https://github.com/UXPin/uxpin-merge-tools/pull/377))

## [3.0.3] - 2023-05-22

### Changed

- Upgrade dependencies to fix "critical" vulnerabilities ([#376](https://github.com/UXPin/uxpin-merge-tools/pull/376))

## [3.0.2] - 2023-05-15

### Changed

- Use Axios instead of deprecated `request-promise` package, upgrade `ngrok` ([#373](https://github.com/UXPin/uxpin-merge-tools/pull/373))

## [3.0.1] - 2023-02-15

### Fixed

- Adds header in experimental mode to fix CORS error in Chrome ([#369](https://github.com/UXPin/uxpin-merge-tools/pull/369))

## [3.0.0] - 2023-02-03

### Breaking changes

- Webpack is now a **peer dependency** of the project, users have to install it by themselves, it's not installed automatically by the Merge CLI ([#358](https://github.com/UXPin/uxpin-merge-tools/pull/358))
- Webpack 5 is supported. Webpack 4 should be supported, if it's used with compatible loaders.

## [2.11.0] - 2023-01-18

### Added

- Supports color type with `@uxpincontroltype color` ([#361](https://github.com/UXPin/uxpin-merge-tools/pull/361))

### Changed

- Upgrade packages (`decode-uri-components`, `utils-loader`, `json5`, `minimist`, `follow-redirects`, `aws-sdk`, `minimatch`...) from dependabot alerts

## [2.10.0] - 2022-12-19

### Added

- Allow absolute imports by handling TypeScript path mapping ([#355](https://github.com/UXPin/uxpin-merge-tools/pull/355))

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

- Support for normalize paths for windows ([#328](https://github.com/UXPin/uxpin-merge-tools/pull/328))

## [2.8.0] - 2022-06-09

### Changed

- `delete-version` command with `--tag` and `--branch` options ([#314](https://github.com/UXPin/uxpin-merge-tools/pull/314))
- GitHub action to publish to packages to both npmjs and github registry ([#308](https://github.com/UXPin/uxpin-merge-tools/pull/308))

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
