module.exports = {
  getMockContext: () => ({
    // Mock project data for "read:project-data"
    projectData: {
      projectName: "Mock Project",
      projectDescription: "A sample project for testing.",
      projectSector: "Technology",
      otherSector: "N/A",
      projectVisibility: "Public",
    },

    // Mock room data for "read:room-data"
    roomData: {
      roomName: "Mock Room",
      roomTopic: "Testing Room Features",
      visibility: "private",
      summaryJoinedMemberCount: 42,
    },

    // Mock OpenAI client for "use:openai-message"
    openAIClient: async (prompt, options) => {
      console.log(`[MOCK OpenAI Client] Received Prompt: "${prompt}"`);
      console.log(`[MOCK OpenAI Client] Options:`, options);

      return {
        content: `Mocked response for: "${prompt}"`,
        rawData: {
          prompt,
          options,
          mock: true,
        },
      };
    },
  }),
};
