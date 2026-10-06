import Product from '../models/Product.js';

export async function listProducts(req, res) {
  const q = (req.query.q || '').trim();
  const filter = q ? { $or: [
    { name: { $regex: q, $options: 'i' } },
    { category: { $regex: q, $options: 'i' } }
  ] } : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
}

export async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

export async function rateProduct(req, res) {
  const value = Number(req.body.value);
  if (!Number.isInteger(value) || value < 1 || value > 5) return res.status(400).json({ message: 'Rating must be 1 to 5' });
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  const old = product.ratings.find(r => r.user.toString() === req.user._id.toString());
  if (old) old.value = value; else product.ratings.push({ user: req.user._id, value });
  await product.save();
  res.json(product);
}
