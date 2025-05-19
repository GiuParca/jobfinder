# Job Finder

**Job Finder** is a job search platform built with **Node.js**, **Express**, and **Handlebars**, where only registered and authenticated users can view available job postings.


## Features

- User registration and login
- Secure password hashing using **bcrypt**
- JWT-based authentication stored in **HTTP-only cookies**
- Job search functionality with keyword filtering
- Dynamic views rendered using **Handlebars


## Built With
- Node.js
- Express
- Sequelize
- SQLite
- Handlebars
- bcrypt
- jsonwebtoken
- dotenv


## Tech Stack

- **Backend:** Node.js, Express
- **Templating:** Handlebars
- **Authentication:** bcrypt, JSON Web Tokens (JWT)
- **Database:** SQLite with Sequelize ORM
- **Environment Variables:** Managed with dotenv
- **Static Files:** Served from `public/` (CSS, images)


## Architecture

This project follows the MVC (Model-View-Controller) pattern:

- **Models**: Sequelize models located in `/models`
- **Views**: Handlebars templates in `/views`
- **Controllers/Routes**: Express route handlers in `/routes`


## Installation & Usage

### 1. Clone the repository

```bash```
git clone https://github.com/your-username/job-finder.git
cd job-finder

### 2. Install dependencies
npm install

### 3. Configure environment variables
Create a .env file at the root of the project: 
SECRET=your_jwt_secret_key
(This secret is used to sign JWT tokens for user sessions.)

### 4. Start the application
npm run dev
(The server will run at http://localhost:3000)


## Available Routes

| Method | Route             | Description                 |
|--------|-------------------|-----------------------------|
| GET    | `/`               | Home with job search        |
| GET    | `/auth/login`     | Login form                  |
| POST   | `/auth/login`     | Login and receive JWT       |
| GET    | `/auth/register`  | Registration form           |
| POST   | `/auth/register`  | Register new user           |
| GET    | `/jobs/add`       | Add job form                |
