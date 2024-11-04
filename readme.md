# WellnessX

a REST API for managing clients in the WellnessZ system, including advanced features
such as multi-level user roles, scheduling, and analytics. The API should be built using Node.js,
Express, and MongoDB

## Table of Contents

-   [Project Setup](#project-setup)
-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [API Documentation](#api-documentation)
-   [License](#license)

---

### Project Setup

This project is built using Node.js, Express, MongoDB, and TypeScript. It uses additional packages like `mongoose` for MongoDB integration, `zod` for validation, `jsonwebtoken` for authentication, and other essential libraries.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/ajay0993/wellnessx
    cd wellnessx
    ```

2. **Install dependencies**
   npm install

3. **Setup environment variables**:
   Create a .env file in the root directory and configure the following variables:
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   JWT_SECRET=<your-jwt-secret-key>
   DB_PASSWORD=<your-db-password>
   DB_STRING=<your-db-uri>
   GMAIL=<gamil>
   GMAIL_PASSWORD=<app-password>

4. **Run the application**  
   npm run dev
# wellnessx
