# Welcome Message Plugin

The **Welcome Message Plugin** is designed to send personalized and friendly greetings to new users when they join a room in your community. By leveraging OpenAI's capabilities, the plugin ensures a warm and engaging user experience.

## Features

- Sends a personalized welcome message to new members.

- Automatically adapts messages based on the room's name and topic.

- Fully customizable greeting logic powered by OpenAI.

## How It Works

The plugin triggers whenever a new member joins a room. It gathers the necessary information about the user, the room, and its topic to craft a personalized message using OpenAI's API.

## Plugin Manifest

### Basic Information

- **Name:** Welcome Message Plugin

- **Unique Name:** welcome_message_plugin

- **Description:** Sends a personalized welcome message to new community members.

- **Version:** 1.0.0

- **Author:** Waivlength Core

- **Project Stage:** Early

- **Tags:** Community, Room, Membership

### Permissions

- **project-data**: Accesses space-level data.

- **read:room-data**: Reads metadata about the room.

- **use:openai-message**: Utilizes OpenAI API for message generation.

### Triggers

- **membership-join**: The plugin activates when a new user joins a room.

### Outcomes

- **write:messages**: Sends the crafted message to the room.