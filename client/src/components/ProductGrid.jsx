import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, onOpen }) {
  if (!products.length) return <p className="empty">No products found.</p>;
  return <div className="grid">{products.map(p => <ProductCard key={p._id} product={p} onOpen={onOpen}/>)}</div>;
}
