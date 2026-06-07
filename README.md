# 🛒 MERN E-Commerce Platform

A full-stack E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js).

The application allows customers to browse products, add items to their cart, and place orders, while administrators can manage products through a dedicated admin dashboard.

---

# 📋 Table of Contents

- Project Overview
- Features
- System Architecture
- Technology Stack
- Folder Structure
- Installation Guide
- Environment Variables
- Running the Application
- API Overview
- Screenshots
- Challenges Faced
- Future Enhancements
- Author

---

# 📖 Project Overview

The MERN E-Commerce Platform is designed to provide a seamless online shopping experience.

The project consists of three independent modules:

### 1. Customer Frontend
Provides an interactive user interface where customers can:

- Browse products
- View product details
- Add products to cart
- Manage shopping cart
- Place orders

### 2. Admin Dashboard
Provides administrative functionalities such as:

- Add new products
- Delete products
- Manage inventory
- Upload product images

### 3. Backend API
Acts as the communication layer between frontend, admin dashboard, and database.

Responsibilities include:

- Authentication
- Product Management
- Database Operations
- Image Uploads
- API Services

---

# ✨ Features

## Customer Features

### Product Browsing
Users can:

- View all products
- Browse by category
- Search products

### Product Details

Each product includes:

- Product Name
- Description
- Price
- Category
- Product Image

### Shopping Cart

Customers can:

- Add products
- Remove products
- Update quantities
- View total amount

### Responsive Design

The application is fully responsive and works on:

- Desktop
- Tablet
- Mobile Devices

---

## Admin Features

### Product Management

Admins can:

- Add products
- Delete products
- Upload product images

### Inventory Control

Admins can:

- View available products
- Manage stock information

---

## Backend Features

### REST API

Provides endpoints for:

- Product Management
- User Authentication
- Cart Management

### Image Upload

Images are uploaded using:

- Multer Middleware

### Database Integration

Uses MongoDB for:

- Product Storage
- User Information
- Order Data

---

# 🏗️ System Architecture

```

Frontend (React)
│
├── Customer UI
│
└── Admin Dashboard

↓

Backend (Node.js + Express)

↓

MongoDB Database

```

The React frontend communicates with Express APIs.

The backend handles:

- Business Logic
- Authentication
- Database Operations

MongoDB stores all application data.

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|------------|----------|
| React.js | User Interface |
| Vite | Build Tool |
| React Router DOM | Routing |
| Tailwind CSS | Styling |
| Axios | API Requests |

---

## Backend

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime Environment |
| Express.js | Server Framework |
| JWT | Authentication |
| Multer | Image Upload |
| Bcrypt | Password Hashing |

---

## Database

| Technology | Purpose |
|------------|----------|
| MongoDB | NoSQL Database |
| Mongoose | ODM |

---

# 📂 Folder Structure

```bash
Ecommerce/
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Admin/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── upload/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/ecommerce-project.git
```

```bash
cd ecommerce-project
```

---


## Step 2: Install Frontend Dependencies

```bash
cd Frontend
npm install
```
<img width="1437" height="740" alt="image" src="https://github.com/user-attachments/assets/79cc5d22-657a-4a12-aec5-d3d288333005" />
for output of the frontend we need to add 
npm run dev 
<img width="1093" height="375" alt="image" src="https://github.com/user-attachments/assets/4fea6e93-ef03-4669-9008-3ed1cb20d514" />
output as followed :
<img width="1864" height="1045" alt="image" src="https://github.com/user-attachments/assets/4463452d-a790-46c1-a800-18d9d518bd8e" />

---

## Step 3: Install Admin Dependencies

```bash
cd ../Admin
npm install
```


---

## Step 4: Install Backend Dependencies

```bash
cd ../Backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Example:

```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=mysecretkey
```

---

# ▶️ Running the Application

## Start Backend

```bash
cd Backend

npm start
```

or

```bash
node index.js
```

---

## Start Frontend

```bash
cd Frontend

npm run dev
```

---

## Start Admin Dashboard

```bash
cd Admin

npm run dev
```

---

# 🌐 Application URLs

| Module | URL |
|----------|----------|
| Frontend | http://localhost:5173 |
| Admin Dashboard | http://localhost:5174 |
| Backend API | http://localhost:4000 |

---

# 🔌 API Overview

## Products

### Get All Products

```http
GET /api/products
```

### Add Product

```http
POST /api/products
```

### Delete Product

```http
DELETE /api/products/:id
```

---

## Authentication

### Register User

```http
POST /api/user/register
```

### Login User

```http
POST /api/user/login
```

---

## Cart

### Add to Cart

```http
POST /api/cart/add
```

### Remove From Cart

```http
POST /api/cart/remove
```

### Get Cart Data

```http
GET /api/cart
```

---

# 📸 Screenshots

## Home Page



## Product Details

Add screenshot here

```
screenshots/product-details.png
```

---

## Shopping Cart

Add screenshot here

```
screenshots/cart.png
```

---

## Admin Dashboard

Add screenshot here

```
screenshots/admin-dashboard.png
```

---

# 🚧 Challenges Faced

During development the following challenges were addressed:

- Managing application state
- Handling image uploads
- API integration between frontend and backend
- MongoDB data modeling
- Authentication and authorization
- Responsive design implementation

---

# 🚀 Future Enhancements

### Payment Gateway

Integrate:

- Razorpay
- Stripe
- PayPal

### Order Management

- Order Tracking
- Order History
- Order Status

### Wishlist

Allow users to save products.

### Reviews & Ratings

Customers can:

- Review Products
- Rate Products

### Email Notifications

Send:

- Order Confirmation
- Shipping Updates
- Password Reset Emails

### Admin Analytics Dashboard

Display:

- Sales Reports
- User Statistics
- Revenue Tracking

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Input Validation
- MongoDB Data Sanitization

---

# 📈 Performance Optimizations

- Component Reusability
- API Optimization
- Efficient Database Queries
- Lazy Loading
- Optimized Images

---

# 👩‍💻 Author

### Shruti Vishwas Deshpande

Software Developer | MERN Stack Developer

GitHub:
https://github.com/your-github-username

LinkedIn:
https://linkedin.com/in/your-linkedin-profile

Email:
your-email@example.com

---

# ⭐ Support

If you found this project useful, please consider giving it a star on GitHub.

```
⭐ Star this repository if you like the project!
```
