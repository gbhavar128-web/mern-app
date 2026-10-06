import { useState } from 'react';
import { api } from '../api.js';
import { useStore } from '../context/StoreContext.jsx';

export default function AccountModal({ onClose }) {
  const { setUser, setToast } = useStore();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const submit = async e => {
    e.preventDefault();
    try {
      const data = mode === 'login' ? await api.login({ email: form.email, password: form.password }) : await api.register(form);
      localStorage.setItem('token', data.token); setUser(data.user); onClose(); setToast(`Welcome ${data.user.name}`);
    } catch (err) { setToast(err.message); }
  };
  return <div className="overlay"><div className="modal small"><button className="close" onClick={onClose}>×</button>
    <h2>{mode === 'login' ? 'Login' : 'Create Account'}</h2>
    <form onSubmit={submit}>{mode === 'register' && <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}
      <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input required minLength="6" type="password" placeholder="Password (6+ characters)" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="primary">{mode === 'login' ? 'Login' : 'Register'}</button>
    </form>
    <button className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create new account' : 'Already have an account? Login'}</button>
  </div></div>;
}
