const registeredPlugins = [];

/**
 * Registers a plugin (used internally within the SDK).
 * @param {Object} plugin - The plugin object containing manifest and execute function.
 */
function registerPlugin(plugin) {
  registeredPlugins.push(plugin);
}

/**
 * Gets plugins that match the specified trigger type.
 * @param {string} triggerType - The trigger type to filter plugins by.
 * @returns {Array} - Array of matching plugins.
 */
function getPluginsForTrigger(triggerType) {
  return registeredPlugins.filter((plugin) =>
    plugin.manifest.triggers.includes(triggerType)
  );
}

module.exports = {
  registerPlugin, // Not exported in SDK, only used internally
  getPluginsForTrigger,
};
