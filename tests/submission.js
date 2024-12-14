const fs = require("fs");
const path = require("path");
const axios = require("axios");

const submitPlugin = async (pluginDir) => {
  try {
    const manifestPath = path.join(pluginDir, "manifest.json");

    // Step 1: Validate manifest.json exists
    if (!fs.existsSync(manifestPath)) {
      throw new Error(
        `[SUBMISSION FAILED] manifest.json not found in ${pluginDir}.`
      );
    }

    const manifest = require(manifestPath);

    if (!manifest.uniqueName || !manifest.version) {
      throw new Error(
        "[SUBMISSION FAILED] manifest.json is missing required fields."
      );
    }

    console.log("[SUBMISSION] Validating plugin...");

    // Step 2: Prepare payload for GitHub Actions
    const payload = {
      pluginName: manifest.uniqueName,
      version: manifest.version,
      description: manifest.description,
    };

    console.log("[SUBMISSION] Triggering GitHub Actions workflow...");

    // Step 3: Send plain request to the repository_dispatch API
    await axios.post(
      "https://api.github.com/repos/Waivlength-io/waivlength-plugins-sdk/dispatches", // Adjust your repo URL
      {
        event_type: "plugin_submission", // Custom event for your Actions workflow
        client_payload: payload,
      },
      {
        headers: {
          Accept: "application/vnd.github.everest-preview+json",
        },
      }
    );

    console.log("[SUCCESS] Plugin submission triggered successfully!");
  } catch (error) {
    console.error("[SUBMISSION FAILED]", error.response?.data || error.message);
    process.exit(1);
  }
};

module.exports = { submitPlugin };
