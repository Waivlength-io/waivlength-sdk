const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const axios = require("axios");
require("dotenv").config();
const { testPlugin } = require("waivlength-sdk");

const submitPlugin = async (pluginDir) => {
  try {
    const manifest = require(path.join(pluginDir, "manifest.json"));
    const pluginName = manifest.uniqueName;
    const branchName = `plugin-submission/${pluginName}`;
    const commitMessage = `Add plugin: ${pluginName}`;
    const sdkRepo = "https://github.com/Waivlength-io/waivlength-sdk.git";
    const githubToken = process.env.GITHUB_TOKEN;

    if (!githubToken) {
      throw new Error(
        "Missing GITHUB_TOKEN environment variable. Ensure it is set in the plugin starter."
      );
    }

    // Step 1: Validate and re-test the plugin
    console.log("[SUBMISSION] Re-testing plugin...");
    const testResult = await testPlugin(pluginDir);

    if (!testResult.success) {
      throw new Error(
        `[SUBMISSION FAILED] Plugin tests failed. Please fix the following issue: ${testResult.error}`
      );
    }
    console.log("[SUBMISSION] Plugin tests passed!");

    // Step 2: Stage plugin files
    console.log("[SUBMISSION] Staging plugin files...");
    execSync(`git add ${pluginDir}`, { stdio: "inherit" });

    // Step 3: Commit changes
    console.log("[SUBMISSION] Committing changes...");
    execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

    // Step 4: Create a new branch
    console.log("[SUBMISSION] Creating new branch...");
    execSync(`git checkout -b ${branchName}`, { stdio: "inherit" });

    // Step 5: Push branch to SDK repository
    console.log("[SUBMISSION] Pushing changes to the SDK repository...");
    execSync(
      `git push https://x-access-token:${githubToken}@${sdkRepo.replace(
        "https://",
        ""
      )} ${branchName}`,
      {
        stdio: "inherit",
      }
    );

    // Step 6: Create a pull request via GitHub API
    console.log("[SUBMISSION] Creating pull request...");
    const response = await axios.post(
      `https://api.github.com/repos/Waivlength-io/waivlength-sdk/pulls`,
      {
        title: `Plugin Submission: ${pluginName}`,
        head: branchName,
        base: "main",
        body: `This pull request adds the plugin "${pluginName}" to the SDK.`,
      },
      {
        headers: {
          Authorization: `token ${githubToken}`,
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
