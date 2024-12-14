module.exports = {
  manifest: require("./manifest.json"),

  /**
   * Executes the plugin logic.
   * @param {object} context
   */
  execute: async (context) => {
    const { eventData, roomData } = context;
    const userId = eventData.userId;
    const roomName = roomData.roomName;
    const roomTopic = roomData.roomTopic;

    const prompt = `Please create a friendly, personalized greeting for the user with ID: ${userId}. They have joined the room "${roomName}", which is focused on the topic "${roomTopic}".`;

    const model = "gpt-4o-mini";
    const maxTokens = 150;
    const temperature = 0.8;
    const systemRole =
      "You are a friendly assistant designed to help welcome users to rooms.";

    const openAIOptions = {
      model,
      maxTokens,
      temperature,
      systemRole,
    };

    const openAIResult = await context.openAIClient(prompt, openAIOptions);

    return {
      type: "write:messages",
      content: openAIResult.content,
      openAIResponse: openAIResult.rawData,
    };
  },
};
