const fs = require("fs");
const path = require("path");
const triggers = require("./triggers");

const internalPluginsPath = path.join(__dirname, "internal-plugins");

/**
 * Dynamically loads and registers plugins from the internal-plugins directory.
 */
function loadInternalPlugins() {
  const loadedPlugins = [];
  const pluginDirs = fs.readdirSync(internalPluginsPath);

  for (const pluginDir of pluginDirs) {
    const pluginPath = path.join(internalPluginsPath, pluginDir);
    const manifestPath = path.join(pluginPath, "manifest.json");
    const indexPath = path.join(pluginPath, "index.js");

    // Ensure both manifest and index.js exist
    if (fs.existsSync(manifestPath) && fs.existsSync(indexPath)) {
      try {
        const manifest = require(manifestPath);
        const plugin = require(indexPath);

        // Validate required properties
        if (!manifest.uniqueName || typeof plugin.execute !== "function") {
          console.warn(`Invalid plugin in ${pluginPath}. Skipping.`);
          continue;
        }

        // Register the plugin
        triggers.registerPlugin({
          manifest,
          execute: plugin.execute,
        });

        loadedPlugins.push(manifest.uniqueName);
      } catch (error) {
        console.error(`Error loading plugin from ${pluginPath}:`, error);
      }
    } else {
      console.warn(`Skipping invalid plugin directory: ${pluginPath}`);
    }
  }

  console.log(`Loaded Plugins: ${loadedPlugins.join(", ")}`);
  return loadedPlugins;
}

module.exports = {
  loadInternalPlugins,
};
