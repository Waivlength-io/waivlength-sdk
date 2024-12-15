const customRegisteredPlugins = [];

function getPluginsByNames(pluginIds) {
  return customRegisteredPlugins.filter((plugin) =>
    pluginIds.includes(plugin.plugin_id)
  );
}

module.exports = {
  getPluginsByNames,
};
