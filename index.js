const path = require("path");
const { loadPluginsFromDirectory } = require("./utils/pluginLoader");
const triggers = require("./utils/triggers");
const customPluginRegistry = require("./utils/customPluginRegistry");

// Paths for internal and community plugins
const internalPluginsPath = path.join(__dirname, "./internal-plugins");
const communityPluginsPath = path.join(__dirname, "./community-plugins");

// Load internal plugins
function loadInternalPlugins() {
  return loadPluginsFromDirectory(internalPluginsPath, triggers.registerPlugin);
}

// Load community plugins
function loadCommunityPlugins() {
  return loadPluginsFromDirectory(
    communityPluginsPath,
    customPluginRegistry.registerCustomPlugin
  );
}

// Load both plugin types
const loadedInternalPlugins = loadInternalPlugins();
console.log("Loaded Internal Plugins:", loadedInternalPlugins);

const loadedCommunityPlugins = loadCommunityPlugins();
console.log("Loaded Community Plugins:", loadedCommunityPlugins);

module.exports = {
  getPluginsForTrigger: triggers.getPluginsForTrigger,
  getCustomPluginsByNames: customPluginRegistry.getPluginsByNames,
};
