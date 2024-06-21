# Web Invitation Project with Laravel, React JS, and Inertia JS

Welcome to the Web Invitation Project! This project is a full-stack web application built using Laravel, React.js, and Inertia.js. It provides users with the ability to create, manage, and send digital invitations for various events.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)

## Features

- User authentication and authorization
- Create and manage invitations
- Send invitations via email
- View and RSVP to invitations
- User-friendly interface with React.js
- Seamless server-client integration with Inertia.js

## Technologies Used

- **Backend:** Laravel
- **Frontend:** React.js
- **Routing and Server-Side Rendering:** Inertia.js
- **Database:** MySQL (or any other preferred database)
- **Authentication:** Laravel Breeze or Laravel Jetstream

## Installation

### Prerequisites

- PHP >= 8.0
- Composer
- Node.js >= 12.x
- NPM or Yarn
- MySQL (or any other preferred database)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/web-invitation.git
   cd web-invitation
    ```

2. **Install dependencies**

   ```bash
   composer install
    ```
3. **Copy the .env file and configure your environment variables:**

   ```bash
   cp .env.example .env
    ```
   Update the .env file with your database credentials and other configurations.
   
5. **Generate an application key:**
   ```bash
   php artisan key:generate
    ```
6. **Run the migrations:**
   ```bash
   php artisan migrate
    ```

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd resources/js
    ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Build the frontend assets:**
   ```bash
   npm run dev
   # or
   yarn dev
    ```

### Usage
#### Running The Application
To start the development server, run:
```bash
    php artisan serve
```
Visit http://localhost:8000 in your browser to see the application in action.

#### Building for Production
To build the frontend assets for production, run:
```bash
    npm run production
    # or
    yarn production
```



   
   

