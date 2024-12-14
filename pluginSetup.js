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
    tags: [],
    projectStage: "early",
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

  console.log("\n[INFO] Creating plugin structure...\n");

  files.forEach((file) => {
    const filePath = path.join(pluginDir, file.name);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, file.content);
      console.log(`✔ Created: ${file.name}`);
    } else {
      console.log(`⚠ Skipped (already exists): ${file.name}`);
    }
  });

  console.log("\n[SUCCESS] Plugin files created successfully!");
  console.log("\nNext Steps:");
  console.log(
    "1. Open the `manifest.json` file to configure your plugin's metadata."
  );
  console.log("2. Implement your plugin logic in `index.js`.");
  console.log("3. Run `npm run test` to validate your plugin.\n");
};

module.exports = { createPlugin };
