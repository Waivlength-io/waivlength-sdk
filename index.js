const triggers = require("./utils/triggers");
const customPluginRegistry = require("./utils/customPluginRegistry");
const { loadInternalPlugins } = require("./utils/pluginLoader");
const { validateManifest } = require("./tests/pluginValidator");
const { testPlugin } = require("./tests/testRunner");
const { getMockContext } = require("./tests/mockData");
const { createPlugin } = require("./tests/pluginSetup");

loadInternalPlugins();

module.exports = {
  getPluginsForTrigger: triggers.getPluginsForTrigger,

  getCustomPluginsByNames: async (uniqueNames) => {
    return customPluginRegistry.getPluginsByNames(uniqueNames);
  },

  createPlugin,
  testPlugin,
  validateManifest,
  getMockContext,
};
