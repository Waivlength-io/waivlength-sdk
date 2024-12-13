const path = require("path");
const fs = require("fs");

const validateManifest = (pluginPath) => {
  const manifestPath = path.join(pluginPath, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Manifest file not found in: ${pluginPath}`);
  }

  const manifest = require(manifestPath);

  // Required fields in the manifest
  const requiredFields = [
    "name",
    "uniqueName",
    "description",
    "triggers",
    "permissions",
    "outcomes",
    "version",
    "author",
  ];

  const missingFields = requiredFields.filter((field) => !manifest[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Manifest missing required fields: ${missingFields.join(", ")}`
    );
  }

  console.log(
    `[VALIDATION PASSED] Manifest for plugin "${manifest.uniqueName}" is valid.`
  );
  return true;
};

module.exports = { validateManifest };
