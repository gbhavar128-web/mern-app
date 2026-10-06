import { useStore } from '../context/StoreContext.jsx';

export default function ProductCard({ product, onOpen }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const liked = wishlist.includes(product._id);
  return <article className="card">
    <button className={`heart ${liked ? 'liked' : ''}`} onClick={() => toggleWishlist(product._id)}><i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'}`}/></button>
    <img src={product.image} alt={product.name} onClick={() => onOpen(product)} />
    <div className="card-body">
      <small>{product.category}</small><h3>{product.name}</h3>
      <div className="rating">★ {product.rating ? product.rating.toFixed(1) : 'New'}</div>
      <strong>₹{product.price.toLocaleString('en-IN')}</strong>
      <div className="card-buttons"><button onClick={() => onOpen(product)}>View</button><button onClick={() => addToCart(product)}>Add to Cart</button></div>
    </div>
  </article>;
}
