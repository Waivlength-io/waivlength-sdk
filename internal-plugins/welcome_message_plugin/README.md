# Welcome Message Plugin

**Trigger:** `membership-join`  

**Permissions:**

- `read:membership`: Access membershipInfo (membership type, userId, displayName).
- `read:space-data`: Get space data (spaceName, spaceId).
- `use:openai`: Generate messages via OpenAI.

**Outcome:**

- `write:messages`: Produces a text message to send to the space.

This plugin uses OpenAI to produce a personalized welcome message when a user joins the space.
