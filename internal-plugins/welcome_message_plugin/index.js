const { generateOpenAIMessage } = require("../../utils/apiClients");

module.exports = {
  manifest: require("./manifest.json"),

  /**
   * Executes the plugin logic.
   * @param {object} context - Includes eventData, membershipInfo, spaceData, openAIClient if requested.
   */
  execute: async (context) => {
    const { eventData, membershipInfo, spaceData, openAIClient } = context;
    // Extract user and space info from context
    const userId = membershipInfo?.userId || "Unknown User";
    const spaceName = (spaceData && spaceData.spaceName) || "the space";

    const prompt = `Welcome ${userId} to ${spaceName}! Please create a friendly, personalized greeting.`;

    const generatedText = await generateOpenAIMessage(prompt);

    return {
      type: "write:messages",
      content: generatedText,
    };
  },
};
