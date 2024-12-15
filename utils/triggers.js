const registeredPlugins = [];

/**
 * Registers an internal plugin.
 * @param {Object} plugin - The plugin object.
 */
function registerPlugin(plugin) {
  registeredPlugins.push(plugin);
}

/**
 * Gets plugins that match a specific trigger type.
 * @param {string} triggerType - Trigger type to filter plugins by.
 * @returns {Array} - Matching plugins.
 */
function getPluginsForTrigger(triggerType) {
  return registeredPlugins.filter((plugin) =>
    plugin.manifest.triggers.includes(triggerType)
  );
}

module.exports = {
  registerPlugin,
  getPluginsForTrigger,
};
