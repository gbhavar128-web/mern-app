import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, min: 1, required: true }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [itemSchema], required: true },
  total: { type: Number, required: true },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    pincode: String
  },
  status: { type: String, enum: ['Placed','Processing','Shipped','Delivered','Cancelled'], default: 'Placed' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
