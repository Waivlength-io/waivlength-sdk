const fs = require("fs");
const path = require("path");

/**
 * Dynamically loads and registers plugins from the specified directory.
 * @param {string} pluginsPath - Path to the plugins directory.
 * @param {function} registerPluginCallback - Callback to register the plugin.
 * @returns {string[]} - List of successfully loaded plugin IDs.
 */
function loadPluginsFromDirectory(pluginsPath, registerPluginCallback) {
  const loadedPlugins = [];
  if (!fs.existsSync(pluginsPath)) {
    console.warn(`Plugins directory does not exist: ${pluginsPath}`);
    return loadedPlugins;
  }

  const pluginDirs = fs.readdirSync(pluginsPath);

  for (const pluginDir of pluginDirs) {
    const pluginPath = path.join(pluginsPath, pluginDir);
    const manifestPath = path.join(pluginPath, "manifest.json");
    const indexPath = path.join(pluginPath, "index.js");

    if (fs.existsSync(manifestPath) && fs.existsSync(indexPath)) {
      try {
        const manifest = require(manifestPath);
        const plugin = require(indexPath);

        // Validate required properties
        if (!manifest.plugin_id || typeof plugin.execute !== "function") {
          console.warn(
            `Invalid plugin in ${pluginPath}. Missing 'plugin_id' or 'execute'. Skipping.`
          );
          continue;
        }

        // Register the plugin
        registerPluginCallback({
          manifest,
          execute: plugin.execute,
        });

        loadedPlugins.push(manifest.plugin_id); // Track loaded plugin IDs
      } catch (error) {
        console.error(`Error loading plugin from ${pluginPath}:`, error);
      }
    } else {
      console.warn(`Skipping invalid plugin directory: ${pluginPath}`);
    }
  }

  return loadedPlugins;
}

module.exports = { loadPluginsFromDirectory };
