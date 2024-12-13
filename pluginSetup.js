const fs = require("fs");
const path = require("path");

const createPlugin = (pluginDir) => {
  const manifestTemplate = {
    name: "My Plugin",
    uniqueName: "my_plugin",
    description: "Description of my plugin.",
    triggers: ["example-trigger"],
    permissions: [],
    outcomes: [],
    version: "1.0.0",
    author: "Your Name",
  };

  const files = [
    {
      name: "manifest.json",
      content: JSON.stringify(manifestTemplate, null, 2),
    },
    {
      name: "index.js",
      content: `module.exports = {
  manifest: require("./manifest.json"),

  /**
   * Executes the plugin logic.
   * @param {object} context
   */
  execute: async (context) => {
    console.log("Executing plugin logic with context:", context);
    return { success: true, message: "Plugin executed successfully." };
  },
};`,
    },
  ];

  files.forEach((file) => {
    const filePath = path.join(pluginDir, file.name);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
    }
  });

  console.log(`Plugin files created successfully in ${pluginDir}`);
};

module.exports = { createPlugin };
