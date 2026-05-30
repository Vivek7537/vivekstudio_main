# Security Specification - Vivek Studio

## Data Invariants
- `config/site`: Only one document (`site`) exists in the `config` collection. Its values define the entire UI.
- `messages`: Each document must have a `name`, `email`, `message`, and `timestamp`.

## The "Dirty Dozen" Payloads

### config/site
1.  **Anonymous Write**: Attempting to update settings without being logged in.
2.  **Unverified Admin**: Attempting to update settings with a matching email but `email_verified: false`.
3.  **Shadow Update**: Attempting to inject a `customField: "hack"` into the settings document.
4.  **Malicious Script**: Injecting a `<script>` tag into the `hero.heading`.

### messages
5.  **Anonymous Read**: Attempting to list all messages without being an admin.
6.  **Owner Spoof**: Attempting to create a message with a spoofed `timestamp` from the past.
7.  **Resource Exhaustion**: Sending a message with a 1MB `message` string.
8.  **ID Poisoning**: Creating a message with a document ID that is 2KB long.
9.  **Unauthorized Delete**: A visitor trying to delete someone else's message.
10. **Admin Bypass**: Attempting to update a message after it's been sent (messages should be immutable).
11. **Type Mismatch**: Sending `timestamp` as a boolean.
12. **Field Omission**: Sending a message without the `email` field.

## The Test Runner
(I will assume a standard test runner structure for the logic, but focus on the `firestore.rules` implementation next).
