module.exports = {
  manifest: require("./manifest.json"),

  /**
   * Executes the plugin logic.
   * @param {object} context
   */
  execute: async (context) => {
    const { projectData } = context;

    // Prompt for OpenAI to generate a question
    const prompt = `A user has joined a room named "${projectData.projectVisibility}". 
      Write a thoughtful, engaging question for the user. Ensure it is relevant to the topic of the room, 
      but not personal or intrusive.`;

    const openAIOptions = {
      model: "gpt-4o-mini",
      maxTokens: 150,
      temperature: 0.7,
      systemRole:
        "You are a helpful assistant that creates engaging questions.",
    };

    try {
      // Generate the question using OpenAI
      const openAIResult = await context.openAIClient(prompt, openAIOptions);

      return {
        type: "write:messages",
        content: openAIResult.content,
        openAIResponse: openAIResult.rawData,
      };
    } catch (error) {
      console.error(
        "[Ask a Question Plugin] Error generating question:",
        error
      );
      throw error;
    }
  },
};
