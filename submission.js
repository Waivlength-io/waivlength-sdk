const fs = require("fs");
const path = require("path");
const fse = require("fs-extra"); // Use fs-extra for easy folder copying

const submitPlugin = (pluginDir) => {
  const manifest = require(path.join(pluginDir, "manifest.json"));
  const pluginName = manifest.uniqueName;
  const sdkPluginsDir = path.resolve(__dirname, "community-plugins");
  const targetDir = path.join(sdkPluginsDir, pluginName);

  // Ensure target directory exists
  if (fs.existsSync(targetDir)) {
    console.error(`Plugin "${pluginName}" already exists in the SDK.`);
    process.exit(1);
  }

  // Copy the entire plugin folder
  fse.copySync(pluginDir, targetDir);
  console.log(`Plugin "${pluginName}" submitted successfully to the SDK.`);
};

module.exports = { submitPlugin };
