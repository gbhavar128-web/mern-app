import { useState } from 'react';
import { useStore } from '../context/StoreContext.jsx';

export default function AccountDropdown() {
  const { user, authenticate, logout, setAccountOpen } = useStore();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await authenticate(mode, mode === 'login' ? { email: form.email, password: form.password } : form);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <div className="account-dropdown" onClick={(e) => e.stopPropagation()}>
        <p className="account-title">Hi, {user.name}</p>
        <p className="account-text">{user.email}</p>
        <button className="account-btn secondary" onClick={() => { logout(); setAccountOpen(false); }}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="account-dropdown" onClick={(e) => e.stopPropagation()}>
      <p className="account-title">{mode === 'login' ? 'Welcome back' : 'Create account'}</p>
      <p className="account-text">Sign in to place orders and rate products.</p>
      {mode === 'register' && <input placeholder="Name" value={form.name} onChange={set('name')} />}
      <input type="email" placeholder="Email" value={form.email} onChange={set('email')} />
      <input type="password" placeholder="Password (6+ characters)" value={form.password} onChange={set('password')}
        onKeyDown={(e) => e.key === 'Enter' && submit()} />
      {error && <p className="account-error">{error}</p>}
      <button className="account-btn" disabled={busy} onClick={submit}>
        {mode === 'login' ? 'Log in' : 'Create account'}
      </button>
      <button className="link-btn" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
        {mode === 'login' ? 'New here? Create an account' : 'Have an account? Log in'}
      </button>
    </div>
  );
}
