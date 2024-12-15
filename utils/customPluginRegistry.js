const customRegisteredPlugins = [];

/**
 * Registers a community plugin.
 * @param {Object} plugin - The plugin object.
 */
function registerCustomPlugin(plugin) {
  customRegisteredPlugins.push(plugin);
}

/**
 * Gets community plugins by their plugin IDs.
 * @param {string[]} pluginIds - List of plugin IDs to retrieve.
 * @returns {Array} - Matching plugins.
 */
function getPluginsByNames(pluginIds) {
  return customRegisteredPlugins.filter((plugin) =>
    pluginIds.includes(plugin.manifest.plugin_id)
  );
}

module.exports = {
  registerCustomPlugin,
  getPluginsByNames,
};
