import express from 'express';
import type { Request, Response } from 'express'; // Separate type import
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; //
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors()); // 👈 2. Enable CORS so your frontend can connect
app.use(express.json());
// 1 & 3. GET /products
app.get('/products', async (req: Request, res: Response) => {
  const { category } = req.query;
  
  try {
    const products = await prisma.product.findMany({
      where: category && category !== 'All' ? { category: String(category) } : {},
      include: { variants: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 2. GET /products/:id
app.get('/products/:id', async (req: Request, res: Response) => {
  const id = String(req.params.id); // Explicitly cast to string
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true }
    });
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving product" });
  }
});

// 4. POST /products
app.post('/products', async (req: Request, res: Response) => {
  const { name, category, priceCents, imageUrl, variants } = req.body;

  if (!name || !category || !priceCents || !imageUrl) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Build the data object conditionally to keep Prisma happy
    const productData: any = {
      name,
      category,
      priceCents,
      imageUrl,
    };

    if (variants && variants.length > 0) {
      productData.variants = { create: variants };
    }

    const newProduct = await prisma.product.create({
      data: productData,
      include: { variants: true }
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // Helpful for debugging
    res.status(500).json({ error: "Could not create product" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});