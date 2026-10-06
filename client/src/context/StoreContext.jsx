import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user'); }, [user]);
  useEffect(() => {
    api.products().then(setProducts).catch(e => setToast(e.message)).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(''), 2500); return () => clearTimeout(t); }
  }, [toast]);

  const addToCart = (product) => {
    setCart(c => {
      const found = c.find(i => i.id === product._id);
      return found ? c.map(i => i.id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
                   : [...c, { id: product._id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
    setToast('Added to cart');
  };
  const removeFromCart = id => setCart(c => c.filter(i => i.id !== id));
  const changeQty = (id, quantity) => setCart(c => c.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  const toggleWishlist = id => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  const value = useMemo(() => ({
    products, setProducts, loading, cart, wishlist, user, setUser, addToCart, removeFromCart,
    changeQty, toggleWishlist, logout, toast, setToast,
    cartCount: cart.reduce((s, i) => s + i.quantity, 0),
    cartTotal: cart.reduce((s, i) => s + i.price * i.quantity, 0)
  }), [products, loading, cart, wishlist, user, toast]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export const useStore = () => useContext(StoreContext);
