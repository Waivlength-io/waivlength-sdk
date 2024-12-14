const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const axios = require("axios");
require("dotenv").config();
const { testPlugin } = require("waivlength-plugins-sdk");

const submitPlugin = async (pluginDir) => {
  try {
    const manifestPath = path.join(pluginDir, "manifest.json");

    // Step 1: Ensure manifest.json exists
    if (!fs.existsSync(manifestPath)) {
      throw new Error(
        `[SUBMISSION FAILED] manifest.json not found in ${pluginDir}. Ensure your plugin directory is correct.`
      );
    }

    // Load plugin metadata
    const manifest = require(manifestPath);
    const pluginName = manifest.uniqueName;
    if (!pluginName) {
      throw new Error(
        "[SUBMISSION FAILED] Plugin manifest must contain a uniqueName property."
      );
    }

    const branchName = `plugin-submission/${pluginName}`;
    const commitMessage = `Add plugin: ${pluginName}`;
    const sdkRepo =
      process.env.SDK_REPO ||
      "https://github.com/Waivlength-io/waivlength-plugins-sdk.git";
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      throw new Error(
        "Missing GITHUB_TOKEN environment variable. Ensure it is set as a GitHub secret or in the .env file."
      );
    }

    // Step 2: Validate and re-test the plugin
    console.log("[SUBMISSION] Validating and testing the plugin...");
    const testResult = await testPlugin(pluginDir);

    if (!testResult.success) {
      throw new Error(
        `[SUBMISSION FAILED] Plugin tests failed. Please address the following issue: ${testResult.error}`
      );
    }
    console.log("[SUBMISSION] Plugin tests passed successfully!");

    // Step 3: Stage plugin files
    console.log("[SUBMISSION] Staging plugin files...");
    execSync(`git add ${pluginDir}`, { stdio: "inherit" });

    // Step 4: Commit changes
    console.log("[SUBMISSION] Committing changes...");
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

    // Step 5: Create a new branch
    console.log("[SUBMISSION] Creating a new branch...");
    execSync(`git checkout -b ${branchName}`, { stdio: "inherit" });

    // Step 6: Push branch to SDK repository
    console.log("[SUBMISSION] Pushing the branch to the SDK repository...");
    execSync(
      `git push https://x-access-token:${githubToken}@${sdkRepo.replace(
        "https://",
        ""
      )} ${branchName}`,
      { stdio: "inherit" }
    );

    // Step 7: Create a pull request via GitHub API
    console.log("[SUBMISSION] Creating a pull request...");
    const response = await axios.post(
      `https://api.github.com/repos/${sdkRepo
        .replace("https://github.com/", "")
        .replace(".git", "")}/pulls`,
      {
        title: `Plugin Submission: ${pluginName}`,
        head: branchName,
        base: "main",
        body: `This pull request adds the plugin "${pluginName}" to the SDK.\n\n## Plugin Information\n- **Name**: ${manifest.name}\n- **Unique Name**: ${manifest.uniqueName}\n- **Version**: ${manifest.version}\n\n### Description\n${manifest.description}\n\n---\nSubmitted by the Waivlength Plugin Starter.`,
      },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );

    console.log("[SUCCESS] Pull request created successfully!");
    console.log(`Pull Request URL: ${response.data.html_url}`);
  } catch (error) {
    console.error("[SUBMISSION FAILED]", error.message);
    process.exit(1);
  }
};

module.exports = { submitPlugin };
