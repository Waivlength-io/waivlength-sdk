const triggers = require("./triggers");
const customPluginRegistry = require("./customPluginRegistry");
const { loadInternalPlugins } = require("./pluginLoader");

// Dynamically load and register all internal plugins
loadInternalPlugins();

module.exports = {
  // Export getPluginsForTrigger directly
  getPluginsForTrigger: triggers.getPluginsForTrigger,

  // Custom plugins functionality
  getCustomPluginsByNames: async (uniqueNames) => {
    return customPluginRegistry.getPluginsByNames(uniqueNames);
  },
};
