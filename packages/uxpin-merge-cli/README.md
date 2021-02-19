# UXPin Merge CLI

This is the command line used to preview design system components locally and push it to [UXPin Merge](https://www.uxpin.com/merge). Once pushed, designers can use the components within the UXPin editor.

**[See the UXPin Docs for full documentation of Merge.](https://www.uxpin.com/docs/merge)**

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

This tool recognizes components available in your repository of component library, analyze them and uploads results to [UXPin app](https://uxpin.com/merge). See [our docs](https://www.uxpin.com/docs/merge/cli-tool) for usage examples.

```
./node_modules/.bin/uxpin-merge --help
```
will print the list of options:
```
  Usage: uxpin-merge [options] [command]

  `uxpin-merge` starts up an experimentation mode for the project in the CWD. See more commands below.


  Options:

    -v, --version                     output the version number
    --webpack-config <path>           path to a custom webpack config, relative to the current working directory
    --storybook                       enable Storybook integration
    --storybook-config-dir <path>     Directory where to load Storybook configurations from
    --wrapper <path>                  path to a custom component wrapper, relative to the current working directory
    --branch <branch>                 branch to use when uploading. Default: master
    --cwd <path>                      working directory: path to root of the DS repository. Default: `./`
    --config <path>                   path to a config file. Default: `./uxpin.config.js`
    --port <number>                   port number on which the local server will listen. Default: 8877
    --uxpin-domain <domain>           Can be used to set a UXPin private cloud domain. Default: `uxpin.com`
    --skip-browser                    Don't open browser on start
    --disable-tunneling               Turn off tunneling via ngrok
    -h, --help                        output usage information


  Commands:

    server [options]   Start local web server and display the list of design system components
    push [options]     Upload design system repository information to UXPin
    dump [options]     Shows all information (in JSON) about the design system repository and NOT send to UXPin
    summary [options]  Show only design system summary without building it
```
