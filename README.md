Local Services
A full-stack web application that allows users to find and manage local service providers efficiently. The platform features secure authentication, CRUD operations for services, and a user-friendly interface for browsing and managing service providers.

🚀 Features
🔑 Secure Login

Admin authentication to manage services securely.
📜 Browse Local Services

Fetch and display all available services from the database.
🔍 Search & Filter

Find services based on categories, ratings, and location.
➕ Add New Service

Register new service providers with details like name, contact, address, service type, and ratings.
✏️ Update Service Details

Modify existing service provider details.
🗑️ Delete Service

Remove service providers from the platform.
📱 Mobile-Friendly UI

Fully responsive design optimized for mobile, tablet, and desktop.
📋 Application Flow
Landing Page

Overview of the platform with a button to explore services.
Login Page

Admin authentication to manage service providers.
Services Listing Page

Display all available services with search and filter options.
Add Service Page

Form to add a new service provider.
Update Service Page

Edit service details.
Admin Dashboard

Manage services (Add, Update, Delete).
🛠 Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MySQL
Hosting:
Backend: Hosted on [Render]
Frontend: Hosted on [Netlify]
📌 API Endpoints
Authentication
POST /login → Admin login
Service Management
GET /get_all_services → Fetch all services
GET /get_services?service={type} → Get services by category
POST /add_service → Add a new service provider
PUT /update_service/:id → Update service details
DELETE /delete_service/:id → Delete a service provider
🌐 Live Demo
🚀 Try it here: Live Link (Update with actual URL if deployed)

