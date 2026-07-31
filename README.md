# SHOPEZ : E-Commerce Application

**Retail individual ShopEZ is your one-stop destination for effortless online shopping.** Designed and implemented with clean MERN Stack architecture (MongoDB, Express, React Vite, Node.js) and modern **Glassmorphism UI** visual design aesthetics.

---

## DEMO AND GITHUB REPOSITORY LINKS

> [!IMPORTANT]
> - ⚡ **Live Render Backend API**: [https://shopez-backend-2938.onrender.com](https://shopez-backend-2938.onrender.com)
> - 📦 **GitHub Repository**: [https://github.com/livin-renith/shopez-ecommerce](https://github.com/livin-renith/shopez-ecommerce)
> - 🔑 **Pre-configured Admin Account**:
>   - **Account Email**: `admin@gmail.com`
>   - **Password**: `admin123`


---

## 1. PROJECT ARCHITECTURE

### TECHNICAL ARCHITECTURE

The application follows a decoupled client-server architecture:

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND LAYER                                   |
|  - React 18 (Vite)                                                                |
|  - Glassmorphism Design Tokens & Vanilla CSS System                               |
|  - Context API (AuthContext, CartContext)                                         |
|  - React Router DOM Navigation                                                    |
|  - Pages: Home, Catalog, Product Detail, Cart/Checkout, Profile, Admin Portal     |
+-----------------------------------------+-----------------------------------------+
                                          | REST API (HTTP / JSON / JWT)
                                          v
+-----------------------------------------------------------------------------------+
|                                 BACKEND LAYER                                     |
|  - Node.js & Express.js REST API Server                                           |
|  - JWT Authentication & Bcrypt Hashing Middleware                                 |
|  - Controllers: AuthController, ProductController, CartController, OrderController|
+-----------------------------------------+-----------------------------------------+
                                          | Mongoose ORM
                                          v
+-----------------------------------------------------------------------------------+
|                                 DATABASE LAYER                                    |
|  - MongoDB (Users, Products, Cart, Orders)                                       |
+-----------------------------------------------------------------------------------+
```

---

### ER DIAGRAM

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o| CART : owns
    PRODUCT ||--o{ CART_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : ordered_in

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string mobile
        string address
        string pincode
        string userType "user | admin"
    }

    PRODUCT {
        ObjectId _id PK
        string title
        string description
        string mainImg
        string[] carousel
        string category
        string gender "Men | Women | Kids | Unisex"
        string[] sizes
        number price
        number discount
        number stock
        number rating
    }

    CART {
        ObjectId _id PK
        ObjectId userId FK
        Array items
    }

    ORDER {
        ObjectId _id PK
        ObjectId userId FK
        string name
        string email
        string mobile
        string address
        string pincode
        string paymentMethod "COD | Card | UPI"
        number totalAmount
        string status "Placed | Processing | Shipped | Delivered | Cancelled"
        Date orderDate
    }
```

---

### FEATURES

1. **Comprehensive Product Catalog**: Extensive listing of products across categories (Electronics, Fashion, Footwear, Furniture) with real-time category filtering, search keyword matching, gender tags, and price sorting.
2. **Shop Now Button (Direct Checkout Flow)**: Each product listing features a prominent "Shop Now" button that immediately adds the item to the order queue and opens the checkout screen.
3. **Cart & Order Details Form**: Review items, adjust quantities, select clothing sizes, enter recipient shipping address, pincode, and pick preferred payment method (COD, Card, UPI).
4. **User Profile & Tracking**: User profile page showing saved shipping information alongside live status updates on placed orders ("Placed", "Processing", "Shipped", "Delivered").
5. **Unified Admin Console (`admin@gmail.com` / `admin123`)**:
   - Total sales metrics & revenue tracking.
   - Product Management: Add new store items, edit pricing/stock, and delete items.
   - User Management: View registered accounts, view contact info, and manage user accounts.
   - Order Management: View all customer orders and update shipping delivery status.

---

### ROLES AND RESPONSIBILITIES

- **Customer (User)**: Browse catalog, filter items, add to cart, trigger direct "Shop Now", manage shipping details, place orders, and track order history.
- **Admin**: Log in using `admin@gmail.com` / `admin123`, access the Admin Portal, create new store inventory items, monitor platform sales, manage registered accounts, and update order statuses.

---

### USER FLOW

```
[ Visitor / Customer ]
       |
       v
[ Browse Home / Product Catalog ]
       |
       +---> Click "Product Details" ---> Select Size & Qty ---> Click "Add to Cart"
       |                                                                |
       +---> Click "Shop Now" Button -----------------------------------+
                                                                        |
                                                                        v
                                                          [ Shopping Cart & Order Form ]
                                                                        |
                                                                        +---> (If Not Logged In) ---> [ Auth Page ]
                                                                        |
                                                                        v
                                                            [ Place Order Confirmation ]
                                                                        |
                                                                        v
                                                          [ Track Order in User Profile ]
```

---

### MVC PATTERN EXPLANATION

- **Model Layer (`server/models/`)**: Mongoose models defining schemas for `User.js`, `Product.js`, `Cart.js`, and `Order.js`.
- **View Layer (`client/src/`)**: Dynamic React components rendered with glassmorphism CSS backdrop filters, responsive grid structures, and interactive states.
- **Controller Layer (`server/controllers/`)**: Business logic processing requests, performing database CRUD operations, and returning structured JSON API payloads.

---

## 2. PROJECT SETUP AND CONFIGURATION

### Folder Structure
```
E-commerce application/
├── client/          # Vite + React Frontend
├── server/          # Node.js + Express Backend REST API
└── README.md
```

### Installation Steps

1. **Server Setup**:
   ```bash
   cd server
   npm install
   ```

2. **Client Setup**:
   ```bash
   cd ../client
   npm install
   ```

---

## 3. BACKEND DEVELOPMENT

### Backend Server Configuration (`server/server.js`)
- Express app mounting routes: `/api/auth`, `/api/products`, `/api/cart`, `/api/orders`, `/api/admin`.
- Middleware: CORS enabled, JSON parsing, JWT validation.

### Database Seeding:
Populates default admin account `admin@gmail.com` / `admin123` and sample product inventory:
```bash
cd server
npm run seed
```

---

## 4. DATABASE DEVELOPMENT (MongoDB)

- **MongoDB URI**: `mongodb://127.0.0.1:27017/shopez`
- Database connector: `server/config/db.js` using Mongoose ORM.

---

## 5. FRONTEND DEVELOPMENT

Built with React 18, Vite, Lucide Icons, and Vanilla CSS styled with **Glassmorphism Design System** (`glass-panel`, `glass-card`, `glass-nav`, backdrop blurs, glow borders, and responsive flex/grid layouts).

---

## 6. PROJECT EXECUTION

### Step 1: Start Backend API Server
```bash
cd server
npm run seed
npm run dev
# Running on http://localhost:8000
```

### Step 2: Start Frontend React Server
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

---

## DEMO & EVALUATION LINKS SUMMARY

- **GitHub Repository**: [https://github.com/livin-renith/shopez-ecommerce](https://github.com/livin-renith/shopez-ecommerce)
- **Live Render Backend API**: [https://shopez-backend-2938.onrender.com](https://shopez-backend-2938.onrender.com)
- **Admin Email**: `admin@gmail.com`
- **Admin Password**: `admin123`

