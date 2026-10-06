import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  value: { type: Number, required: true, min: 1, max: 5 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  description: { type: String, default: '' },
  stock: { type: Number, default: 20, min: 0 },
  ratings: [ratingSchema]
}, { timestamps: true });

productSchema.virtual('rating').get(function () {
  if (!this.ratings.length) return 0;
  return this.ratings.reduce((sum, r) => sum + r.value, 0) / this.ratings.length;
});
productSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Product', productSchema);
