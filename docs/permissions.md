# Permissions

**read:membership**

- Required to access membership-related information when istening to the `membership-join` trigger.
- Data Structure for the `read:membership-join` permission.

```bash
{
  "displayname": "string",         // The display name of the user.
  "membership": "join",            // The membership status.
  "userId": "string",              // The unique identifier of the user.
  "roomId": "string",              // The unique identifier of the room.
  "timestamp": "number"            // The timestamp of the event in milliseconds.
}
```