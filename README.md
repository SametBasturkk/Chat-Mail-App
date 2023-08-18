
# User Message System - README

## Description
Welcome to the **User Message System**! This project provides a backend API service using Node.js, Express, and PostgreSQL to manage user messages. It allows users to register, send and receive messages, and retrieve user information.

## Endpoints
The User Message System offers the following API endpoints:

1. `POST /newuser`: Registers a new user by inserting their username into the `message_users` table if it doesn't already exist. Returns the user ID associated with the newly registered user.

2. `POST /newmessage`: Creates a new message by inserting recipient details, title, and message content into the `messages` table. The recipient's user ID is obtained from the `message_users` table.

3. `POST /showmessage`: Retrieves distinct messages sent to a specific recipient based on their user ID from the `messages` table.

4. `GET /users`: Fetches a list of all registered user names from the `message_users` table.
