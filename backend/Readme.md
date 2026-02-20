# Product API Backend

### Tech Stack
This backend is built with **Node.js** and **TypeScript** to provide a fast, reliable, and type-safe REST API. It utilizes **Prisma ORM** connected to a local **SQLite** database, which allows for seamless data modeling and easy relational querying without a complex setup.

### How to Run the Project
To get the server running locally, open your terminal in the `backend` folder and run the following commands:

1. **Install dependencies:**
   ```bash
   npm install
Initialize and seed the database:

Bash
npx prisma migrate dev --name init
npx prisma db seed
Start the development server:

Bash
npm run dev
(The server will start on http://localhost:3000)

API Documentation & Sample Requests

1. Get All Products

Returns a list of all products in the database, including their available variants.

Endpoint: GET /products

Sample Request:

Bash
curl http://localhost:3000/products
2. Get Products by Category

Filters the product list to only return items matching a specific category.

Endpoint: GET /products?category=Apparel

Sample Request:

Bash
curl http://localhost:3000/products?category=Apparel
3. Get a Single Product

Returns a single product and its variants by its unique ID.

Endpoint: GET /products/:id

Sample Request:

Bash
curl http://localhost:3000/products/YOUR_PRODUCT_ID_HERE
4. Create a New Product (Bonus)

Accepts a new product payload, validates the required fields, and adds it to the database along with any nested variants.

Endpoint: POST /products

Headers: Content-Type: application/json

Sample Request:

Bash
curl -X POST http://localhost:3000/products \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Vintage Denim Jacket",
       "category": "Apparel",
       "priceCents": 6500,
       "imageUrl": "[https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80](https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80)",
       "variants": [{ "label": "Small" }, { "label": "Large" }]
     }'