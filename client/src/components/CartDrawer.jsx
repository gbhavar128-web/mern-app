import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { api } from '../api.js';

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, changeQty, removeFromCart, user, setToast } = useStore();
  const [busy, setBusy] = useState(false);
  const checkout = async () => {
    if (!user) return setToast('Please login before checkout');
    setBusy(true);
    try {
      await api.order({ items: cart.map(i => ({ productId: i.id, quantity: i.quantity })), shippingAddress: {} });
      cart.forEach(i => removeFromCart(i.id));
      setToast('Order placed successfully');
      onClose();
    } catch (e) { setToast(e.message); } finally { setBusy(false); }
  };
  return <aside className={`drawer ${open ? 'open' : ''}`}>
    <div className="drawer-head"><h2>Your Cart</h2><button onClick={onClose}>×</button></div>
    {cart.length ? cart.map(i => <div className="cart-item" key={i.id}>
      <img src={i.image} /><div><b>{i.name}</b><p>₹{i.price.toLocaleString('en-IN')}</p>
      <div><button onClick={() => changeQty(i.id, i.quantity-1)}>-</button><span>{i.quantity}</span><button onClick={() => changeQty(i.id, i.quantity+1)}>+</button>
      <button className="remove" onClick={() => removeFromCart(i.id)}>Remove</button></div></div></div>) : <p className="empty">Your cart is empty.</p>}
    <div className="drawer-total"><b>Total</b><strong>₹{cartTotal.toLocaleString('en-IN')}</strong></div>
    <button disabled={!cart.length || busy} className="checkout" onClick={checkout}>{busy ? 'Processing...' : 'Place Order'}</button>
  </aside>;
}
