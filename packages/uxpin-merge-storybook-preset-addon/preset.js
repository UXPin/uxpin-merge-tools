const path = require('path');
const fs = require('fs').promises;
const { existsSync } = require('fs');

// Override the normal behavior of JSON stringify for regular expressions
Object.defineProperty(RegExp.prototype, "toJSON", {
  value: RegExp.prototype.toString
});

module.exports = {
  webpackFinal: async (config, options) => {
    // Retrieve application path from plugins before pruning
    let appPath;
    const obj = config.plugins.find(obj => "appPath" in obj);
    if (!obj) {
      throw new Error("Failed to find instantiated plugin with appPath contained");
    }
    appPath = obj.appPath;

    const prunedConfig = {...config};
    // Remove config-internal properties that are filled in by webpack
    // These properties contain in-memory objects
    delete prunedConfig['plugins'];
    delete prunedConfig['resolve']['plugins'];
    delete prunedConfig['resolveLoader']['plugins'];
    delete prunedConfig['optimization']['minimizer'];

    // Build path of expected storybook webpack config
    const mergeFolderPath = path.join(appPath, '.uxpin-merge');
    const sbWebpackConfigPath = path.join(mergeFolderPath, 'storybook.webpack.config.js');

    // Ensure that sbWebpackConfigPath exists
    const mergeFolderPathExists = existsSync(mergeFolderPath);
    if (!mergeFolderPathExists) {
      throw new Error(`Failed to find UXPin merge folder @ [${mergeFolderPath}]`);
    };

    // Write the prunedConfig configuration to a temporary file
    await fs.writeFile(
      sbWebpackConfigPath,
      `module.exports = ${JSON.stringify(prunedConfig, null, '  ')};`,
    );

    return config;
  },
};
