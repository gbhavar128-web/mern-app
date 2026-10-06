import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function Header({ onSearch, onCart, onAccount }) {
  const { cartCount, wishlist, user, logout } = useStore();
  const [q, setQ] = useState('');
  return <header className="header">
    <a className="brand" href="#home"><i className="bi bi-bag-fill"/> Shop</a>
    <nav>
      <a href="#home">Home</a><a href="#products">Products</a><a href="#offers">Offers</a><a href="#about">About</a>
    </nav>
    <div className="actions">
      <form onSubmit={e => { e.preventDefault(); onSearch(q); }} className="search">
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search shoes..." />
        <button><i className="bi bi-search"/></button>
      </form>
      <button onClick={() => document.getElementById('wishlist').scrollIntoView()}><i className="bi bi-heart"/> <span>{wishlist.length}</span></button>
      <button onClick={onAccount}><i className="bi bi-person"/></button>
      <button onClick={onCart}><i className="bi bi-cart4"/> <span>{cartCount}</span></button>
      {user && <button className="logout" onClick={logout}>Logout</button>}
    </div>
  </header>;
}
