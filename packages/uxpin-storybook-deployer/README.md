## UXPin Storybook Deployer
This is a simple CLI tool allows you to push your Storybook on UXPin.

## What is UXPin storybook integration?
![UXPin_Storybook_integration](https://user-images.githubusercontent.com/31594089/119079065-5741e700-ba32-11eb-96d5-fac1daacd5ba.gif)

With UXPin storybook integration, you can use Storybook Component to design and prototype on Editor.

## Requirements
1. Auth token from UXPin
2. Static storybook assets

## Usage

1. Install package as a dev dependencies
```
yarn add -D @uxpin/storybook-deployer
```

2. Deploy to UXPin
```
npx uxpin-storybook-deployer -s path/to/storybook/ -t TOKEN
```

Available options
```
$ uxpin-storybook-deployer --help

Options:
  -s --source <path>  path to directory where storybook build locates
  -t --token <token>  auth token for the library.
  -h, --help          display help for command
```
