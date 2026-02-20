# Full-Stack E-Commerce Product Catalog

A complete full-stack e-commerce product catalog featuring a React frontend and a Node.js/Express backend. This project demonstrates responsive UI design, global state management for a shopping cart, and a RESTful API connected to a local database.

---

## ✨ Features

**Frontend (User Interface)**
* **Responsive Product Grid:** Adapts seamlessly from mobile (1 column) to large desktops (4 columns).
* **Dynamic UI States:** Handles loading, error, and empty states gracefully. Automatically disables the "Add to Cart" button for out-of-stock items.
* **Category Filtering:** Dynamically fetches and filters products based on user selection.
* **Global Cart State:** Utilizes React Context to manage the shopping cart, including adding items, removing items, and calculating the total cart count.

**Backend (API & Database)**
* **RESTful Endpoints:** Supports GET and POST requests for fetching and creating products.
* **Relational Database:** Uses Prisma ORM with SQLite to handle complex relations between Products and their specific Variants (e.g., sizes, colors).
* **Data Seeding:** Includes an automated seed script to populate the database with mock e-commerce data.

---

## 🛠 Tech Stack

### Frontend
* **Framework:** React (via Vite)
* **Styling:** CSS Modules
* **State Management:** React Context API & Custom Hooks
* **Language:** TypeScript

### Backend
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database & ORM:** SQLite & Prisma ORM
* **Language:** TypeScript (executed via `tsx`)

---

## 🚀 Getting Started

To run this full-stack application locally, you will need to run both the backend and frontend servers simultaneously in separate terminal windows.

### 1. Frontend & Backend Setup 
Open a terminal and navigate to the `backend` directory:
```bash
cd backend

# Install dependencies
npm install

# Initialize the database and run migrations
npx prisma migrate dev --name init

# Seed the database with initial products
npx prisma db seed

# Start the API server (runs on http://localhost:3000)
npm run dev

### 2. Frontend Setup
cd frontend

# Install dependencies
npm install

# Create environment variables
# Create a .env file in the root of the frontend folder and add:
# VITE_API_BASE_URL=http://localhost:3000

# Start the development server (usually runs on http://localhost:5173)
npm run dev

### API Documentation
curl http://localhost:3000/products

### 3. Get Products by Category
curl http://localhost:3000/products?category=Apparel

#### 4. Get a Single Product
curl http://localhost:3000/products/YOUR_PRODUCT_ID_HERE