Description

Local Services is a private project designed to provide a platform for managing and accessing various local services. It enables users to add, update, delete, and retrieve service provider information, including contact details, addresses, and ratings. The system is built with a Node.js backend and a MySQL database, ensuring efficient data handling and scalability.

Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MySQL

Hosting: Render (Backend), Netlify (Frontend)

Features

User Authentication: Login system for admin authentication.

Service Management: Add, update, and delete local service providers.

Service Retrieval: Fetch all services or filter by specific criteria.

Database Connection: Uses MySQL connection pooling for better performance.

API Endpoints

Authentication

POST /login - Admin login

Service Management

GET /get_all_services - Retrieve all services

GET /get_services?service=<service> - Retrieve services by type

POST /add_service - Add a new service

PUT /update_service/:id - Update service details

DELETE /delete_service/:id - Remove a service

Installation

Clone the repository

Install dependencies: npm install

Set up environment variables (.env file) for MySQL configuration

Start the backend server: node server.js

Deploy frontend on Netlify

Limitations

No user roles beyond admin

No automated service verification

Future Enhancements

Implement JWT-based authentication

Enhance UI for better user experience

Add service provider verification system

