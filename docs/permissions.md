# Permissions 🔒

## **read:project-data** 📁

- **Description:**
  - Required to retrieve the project details from a space.
- **Data Structure for the `read:project-data` permission:**

  ```json
  {
    "projectName": "string", // The name of the project.
    "projectDescription": "string", // A brief description of the project.
    "projectSector": "string", // The sector associated with the project (e.g., CEX).
    "otherSector": "string", // Custom sector input if projectSector is "Other".
    "projectVisibility": "string" // The visibility status of the project (e.g., Public).
  }
  ```

## **read:room-data** 🏠

- **Description:**
  - Required to retrieve the details about a specific room.
- **Data Structure for the `read:room-data` permission:**

  ```json
  {
    "roomName": "string", // The name of the room (e.g., "Project Chat Room").
    "roomTopic": "string", // The topic of the room, as set in the room's state.
    "visibility": "string", // Visibility of the room (e.g., "public" or "private").
    "summaryJoinedMemberCount": "number" // The count of currently joined members in the room.
  }
  ```

## **use:openai-message** 🤖

- **Description:**

  - This permission allows you to generate dynamic messages using OpenAI's API.
  - When using the `use:openai-message` permission, you must access the `context.openAIClient` function and provide two key arguments:

    1. **prompt**: A string containing the user prompt or message that the model should respond to.
    2. **openAIOptions**: A configuration object detailing model parameters and options.

- **Usage Example:**

  ```javascript
  const prompt =
    "Write a short greeting that includes the user's name and the room topic.";
  ```

  ```json
  {
    "model": "string", // The OpenAI model to use ("gpt-4o" or "gpt-4o-mini").
    "maxTokens": "number", // Maximum tokens in the generated response.
    "temperature": "number", // A value between 0 and 1 that controls randomness. Lower values = more predictable.
    "presencePenalty": "number", // A value between 0 and 1 that encourages the model to use new tokens.
    "frequencyPenalty": "number", // A value between 0 and 1 that decreases the likelihood of repeating common tokens.
    "systemRole": "string" // A role definition that provides context to the model’s behavior.
  }
  ```
