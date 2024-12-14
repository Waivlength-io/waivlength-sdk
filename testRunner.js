const path = require("path");
const mockData = require("./mockData");

const testPlugin = async (pluginPath) => {
  const log = console.log;
  const error = console.error;

  try {
    log("\n🔍 Starting Plugin Tests...\n");

    // Load Plugin
    const plugin = require(path.join(pluginPath, "index.js"));
    const { manifest } = plugin;
    const context = mockData.getMockContext();

    // Step 1: Validate Manifest
    log("[1/3] Validating manifest...");
    if (!manifest.version) {
      throw new Error("Manifest is missing the 'version' field.");
    }

    const semverRegex = /^\d+\.\d+\.\d+$/;
    if (!semverRegex.test(manifest.version)) {
      throw new Error(
        `Invalid version format: "${manifest.version}". Expected semantic versioning (e.g., 1.0.0).`
      );
    }
    log("✅ Manifest version is valid.");

    // Step 2: Validate Permissions for Triggers
    log("[2/3] Validating trigger permissions...");
    for (const trigger of manifest.triggers) {
      const requiredPermission = `read:${trigger}`;
      if (!manifest.permissions.includes(requiredPermission)) {
        throw new Error(
          `Trigger "${trigger}" requires missing permission: "${requiredPermission}".`
        );
      }
    }
    log("✅ All trigger permissions are valid.");

    // Step 3: Run Plugin Logic
    log("[3/3] Testing plugin logic...");
    const result = await plugin.execute(context);
    if (!result.openAIResponse) {
      throw new Error("Plugin execution result is missing 'openAIResponse'.");
    }
    log("✅ Plugin executed successfully and returned 'openAIResponse'.");

    log("\n🎉 All tests passed!\n");
    return { success: true, result };
  } catch (err) {
    error(`\n❌ Test failed: ${err.message}\n`);
    return { success: false, error: err.message };
  }
};

module.exports = { testPlugin };
