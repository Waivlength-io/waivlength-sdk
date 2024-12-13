const path = require("path");
const mockData = require("./mockData");

const testPlugin = async (pluginPath) => {
  try {
    const plugin = require(path.join(pluginPath, "index.js"));
    const context = mockData.getMockContext();

    console.log(`[TESTING PLUGIN] Testing plugin at: ${pluginPath}`);
    const result = await plugin.execute(context);

    console.log(`[TEST SUCCESS] Plugin executed successfully:`, result);
    return { success: true, result };
  } catch (error) {
    console.error(`[TEST FAILURE] Plugin execution failed:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { testPlugin };
