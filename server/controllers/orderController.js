import Order from '../models/Order.js';
import Product from '../models/Product.js';

export async function createOrder(req, res) {
  const { items, shippingAddress } = req.body;
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const ids = items.map(i => i.productId);
  const products = await Product.find({ _id: { $in: ids } });
  const map = new Map(products.map(p => [p._id.toString(), p]));

  let total = 0;
  const safeItems = [];
  for (const item of items) {
    const product = map.get(String(item.productId));
    const quantity = Math.max(1, Number(item.quantity) || 1);
    if (!product) return res.status(400).json({ message: 'One or more products no longer exist' });
    if (product.stock < quantity) return res.status(400).json({ message: `${product.name} is out of stock` });
    total += product.price * quantity;
    safeItems.push({ product: product._id, name: product.name, price: product.price, image: product.image, quantity });
  }

  for (const item of safeItems) await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  const order = await Order.create({ user: req.user._id, items: safeItems, total, shippingAddress });
  res.status(201).json(order);
}

export async function myOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}
