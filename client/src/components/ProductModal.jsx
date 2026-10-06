import { useStore } from '../context/StoreContext.jsx';
export default function ProductModal({ product, onClose }) {
  const { addToCart } = useStore();
  if (!product) return null;
  return <div className="overlay"><div className="modal product-modal"><button className="close" onClick={onClose}>×</button><img src={product.image}/><div><small>{product.category}</small><h2>{product.name}</h2><h3>₹{product.price.toLocaleString('en-IN')}</h3><p>{product.description}</p><p>Stock: {product.stock}</p><button className="primary" onClick={() => { addToCart(product); onClose(); }}>Add to Cart</button></div></div></div>;
}
