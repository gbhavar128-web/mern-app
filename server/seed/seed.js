import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  ['Running Shoes','Running',2499,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'],
  ['Classic Sneakers','Sneakers',1999,'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800'],
  ['Basketball Shoes','Basketball',2999,'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800'],
  ['Casual Shoes','Casual',1799,'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800'],
  ['Leather Boots','Boots',3499,'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800'],
  ['Summer Sandals','Sandals',999,'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800']
].map(([name, category, price, image]) => ({
  name, category, price, image, stock: 30,
  description: `${name} designed for everyday comfort and style.`
}));

await connectDB();
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`Seeded ${products.length} products`);
await mongoose.connection.close();
