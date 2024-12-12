# Waivlength SDK

Empower your Web3 project with AI-driven automation and dynamic integrations. The Waivlength SDK is an open-source plugin framework that enables developers to create and manage agent-driven plugins for Web3 spaces. It supports triggers, permissions, outcomes, and AI integrations, making it easy to extend the functionality of your Waivlength-powered ecosystem.

## Key Features 🚀

- **AI-Powered Plugins:** Create plugins that leverage AI to automate tasks, personalize interactions, and drive growth.
- **Trigger-Based Architecture:** React to events like membership changes, governance votes, or custom triggers.
- **Permission-Driven Access:** Fine-grained control over data access and execution capabilities.
- **Dynamic Outcomes:** Plugins can write messages, create spaces, manage tokens, and more.
- **Open Source Contribution:** Build your own plugins and contribute to the Waivlength ecosystem.

## Installation 📦

```bash
npm install waivlength-sdk
```

How It Works 🛠️

### 1\. **Triggers**

Plugins react to specific events (e.g., `membership-join`). Triggers define the conditions under which a plugin executes.

### 2\. **Permissions**

Plugins declare the data they require and the actions they can take. Examples:

- `read:membership`: Access membership event details.
- `read:space-data`: Fetch information about the space.
- `use:openai`: Integrate AI-generated content via the app's secure API proxy.

### 3\. **Outcomes**

The output of a plugin is called an outcome. Examples:

- `write:messages`: Produce a message to send.
- `create:space`: Instruct the app to create a new space.

---

Plugin Example 🌟

A welcome message plugin sends a personalized greeting when a user joins a room.

### Manifest

```bash

{

  "name": "Welcome Message Plugin",

  "uniqueName": "welcome_message_plugin",

  "description": "Sends a personalized welcome message to new community members.",

  "triggers": ["membership-join"],

  "permissions": ["read:membership", "read:space-data", "use:openai"],

  "outcomes": ["write:messages"],

  "tags": ["community", "growth"],

  "stage": "initial-building",

  "author": "0xProjectTeam",

  "version": "1.2.0",

  "documentation_url": "https://github.com/Waivlength-io/waivlength-sdk/community-plugins/welcome_message_plugin/README.md"

}

```

### Logic

```bash

const { generateOpenAIMessage } = require("../../utils/apiClients");

module.exports = {

  manifest: require("./manifest.json"),

  execute: async (context) => {

    const { membershipInfo, spaceData, openAIClient } = context;

    const userId = membershipInfo?.userId || "Unknown User";

    const spaceName = spaceData?.spaceName || "the space";

    const prompt = `Welcome ${userId} to ${spaceName}! Please create a friendly, personalized greeting.`;

    const generatedText = await generateOpenAIMessage(prompt);

    return {

      type: "write:messages",

      content: generatedText

    };

  },

};

```

Developer Workflow 🌐

1.  **Create a Plugin:** Use the [Waivlength Plugin Starter](https://github.com/waivlength/waivlength-plugin-starter) to build your plugin.
2.  **Contribute:** Submit your plugin to the Waivlength SDK repository for inclusion in the Foundry.

Documentation 📚

- **Triggers:** Learn about available triggers and how to use them. See `/docs/triggers.md`.
- **Permissions:** Understand permissions and the data they provide. See `/docs/permissions.md`.
- **Outcomes:** Explore the outcomes your plugins can produce. See `/docs/outcomes.md`.

Contributing 🤝

We welcome contributions from the community! If you'd like to contribute:

1.  Fork the [Waivlength Plugin Starter](https://github.com/waivlength/waivlength-plugin-starter).
2.  Build and test your plugin.
3.  Submit a pull request to the Waivlength SDK repository.

License 📝

This project is licensed under the MIT License. See the `LICENSE` file for details.
