// Hypothetical storage for custom plugins
const customRegisteredPlugins = [];

function registerCustomPlugin(plugin) {
  customRegisteredPlugins.push(plugin);
}

function getPluginsByNames(uniqueNames) {
  return customRegisteredPlugins.filter((plugin) =>
    uniqueNames.includes(plugin.manifest.uniqueName)
  );
}

module.exports = {
  registerCustomPlugin,
  getPluginsByNames,
};
