const triggers = require("./triggers");
const customPluginRegistry = require("./customPluginRegistry");
const { loadInternalPlugins } = require("./pluginLoader");
const { validateManifest } = require("./pluginValidator");
const { testPlugin } = require("./testRunner");
const { getMockContext } = require("./mockData");
const { createPlugin } = require("./pluginSetup");
const { submitPlugin } = require("./submission");

loadInternalPlugins();

module.exports = {
  getPluginsForTrigger: triggers.getPluginsForTrigger,

  getCustomPluginsByNames: async (uniqueNames) => {
    return customPluginRegistry.getPluginsByNames(uniqueNames);
  },

  createPlugin,
  testPlugin,
  submitPlugin,
  validateManifest,
  getMockContext,
};
