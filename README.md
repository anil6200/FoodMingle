# - Food Delivery Platform or Food Reel app

A full-stack food delivery application or Reel app that connects customers with food partners. Users can view scroll videos like reels & browse food items, save favorites, and food partners can manage their profiles and menu.

## 🏗️ Project Structure
├── backend/ # Backend Server
│ ├── src/
│ │ ├── controllers/ # Business logic
│ │ ├── db/ # Database configuration
│ │ ├── middleware/ # Custom middleware
│ │ └── routes/ # API routes
│ ├── app.js # Express app configuration
│ ├── server.js # Server entry point
│ └── package.json
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── Pages/ # All application pages
│ │ ├── routes/ # React Router configuration
│ │ └── assets/ # Static files
│ └── package.json


## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose)
- **JWT** - Authentication
- **Multer** - File uploads
- **ImageKit** - Image management
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js installed
- MongoDB database

### Backend Setup

cd backend
npm install

# Create .env file and add your environment variables
cp .env.example .env

# Start development server
npx nodemon server.js

Server runs on: http://localhost:2000


Frontend Setup..

cd frontend
npm install

# Start development server
npm run dev

Frontend runs on: http://localhost:5173

🔌**API Routes**

Authentication

POST /api/user/register - User registration

POST /api/user/login - User login

POST /api/food-partner/register - Food partner registration

POST /api/food-partner/login - Food partner login

**Food Management**

GET /api/food - Get food items

POST /api/food - Create food item (Food partners)

GET /api/food-partner/:id - Get food partner profile


🎯 Features

**For Users**

User registration and login

Browse food items

Save favorite items

View food partner profiles

**For Food Partners**

Partner registration and login

Create and manage food items

Profile management

Menu management

🔧 **Environment Variables**

Create a .env file in backend directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_Url_Endpoint

**Available Scripts**

Backend..

npx nodemon server.js - Start server

Frontend..

npm run dev - Start development server

