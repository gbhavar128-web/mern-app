import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import AccountModal from './components/AccountModal.jsx';
import ProductModal from './components/ProductModal.jsx';
import { useStore } from './context/StoreContext.jsx';
import { api } from './api.js';

export default function App() {
  const { products, setProducts, loading, toast } = useStore();
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const shown = useMemo(() => category === 'All' ? products : products.filter(p => p.category === category), [products, category]);
  const search = async q => { try { setProducts(await api.products(q)); setCategory('All'); } catch {} };

  return <div>
    <Header onSearch={search} onCart={() => setCartOpen(true)} onAccount={() => setAccountOpen(true)}/>
    <main>
      <section id="home" className="hero"><div><span>NEW COLLECTION</span><h1>Step Into Your Best.</h1><p>Discover stylish shoes made for comfort, performance and everyday life.</p><a href="#products" className="primary">Shop Now</a></div><img src="https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000" alt="shoes"/></section>
      <section id="products" className="products"><div className="section-head"><div><small>OUR COLLECTION</small><h2>Find Your Style</h2></div><div className="filters">{categories.map(c => <button className={c===category?'active':''} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
      {loading ? <p className="empty">Loading products...</p> : <ProductGrid products={shown} onOpen={setSelected}/>}</section>
      <section id="offers" className="banner"><h2>Comfort meets style.</h2><p>Quality footwear for every step.</p></section>
      <section id="about" className="about"><h2>About Shop</h2><p>A MERN stack e-commerce demo with React, Express, MongoDB and JWT authentication.</p></section>
    </main>
    <footer>© 2026 Shop. MERN E-Commerce.</footer>
    <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)}/>
    {accountOpen && <AccountModal onClose={()=>setAccountOpen(false)}/>}
    <ProductModal product={selected} onClose={()=>setSelected(null)}/>
    {toast && <div className="toast">{toast}</div>}
  </div>;
}
