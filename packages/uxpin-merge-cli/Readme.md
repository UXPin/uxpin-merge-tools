# UXPin Merge

The Command-line tool integrates the Design System repository with [UXPin Merge](https://www.uxpin.com/merge)

## Installation
Add `uxpin-merge` to your package.json:
```
npm install @uxpin/merge-cli --save-dev
```
or
```
yarn add @uxpin/merge-cli --dev
```

## Usage

This tool recognizes components available in your repository of component library, analyze them and uploads results to [UXPin app](https://uxpin.com/merge) in order to further integration with UXPin Design System services.

## Limitations

We work hard to support the widest possible range of repositories. To minimize the user effort needed to integrate with UXPin, we start by supporting all repositories already working with a [react-styleguidist](https://github.com/styleguidist/react-styleguidist). Given that, your repository must meet the following criteria:

- components are implemented in React.js,
- components are placed in separate directories and follow "Component declaration convention"

## Component declaration convention

We expect all components to have separate directories under `src/components` or `components` directory:

```
src
└── components
    └── Button
        ├── Button.jsx                      <-- Button implementation
        └── Readme.md                       <-- Button documentation and usage examples
```
#### Component implementation

Components may be functional or stateful, however must be **default exported** from the implementation file. Allowed implementation file examples:

```
components/Button/index.jsx
components/Button/Button.jsx
```
	
#### Documentation and examples
	
Component directory must contain markdown file containing component usage examples. Following naming conventions are supported:

```
components/Button/Readme.md
components/Button/README.md
components/Button/Button.md
```

## Configuration

TBD
