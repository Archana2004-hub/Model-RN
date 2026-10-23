import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data/products';

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

const SEED = [
  { name: 'Admin User', email: 'admin@shop.com', password: 'admin123', role: 'admin', phone: '9999999999', address: 'Head Office' },
  { name: 'Demo Customer', email: 'user@shop.com', password: 'user123', role: 'customer', phone: '8888888888', address: 'Sathyamangalam' },
];

export function AppProvider({ children }) {
  const [users, setUsers] = useState(SEED);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState({}); // {productId: qty}
  const [favs, setFavs] = useState([]);

  const signUp = (d) => {
    if (users.some((u) => u.email.toLowerCase() === d.email.toLowerCase())) return 'Email already registered';
    const u = { ...d, phone: '', address: '' };
    setUsers([...users, u]); setUser(u); return null;
  };
  const signIn = (email, password, role) => {
    const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password && x.role === role);
    if (!u) return 'Invalid email, password or role';
    setUser(u); return null;
  };
  const signOut = () => { setUser(null); setCart({}); setFavs([]); };
  const updateProfile = (d) => {
    const u = { ...user, ...d };
    setUsers(users.map((x) => (x.email === user.email ? u : x))); setUser(u);
  };
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  const addToCart = (ids) => setCart((c) => {
    const n = { ...c }; [].concat(ids).forEach((id) => { n[id] = (n[id] || 0) + 1; }); return n;
  });
  const changeQty = (id, d) => setCart((c) => {
    const n = { ...c }; const q = (n[id] || 0) + d;
    if (q <= 0) delete n[id]; else n[id] = q; return n;
  });
  const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });
  const clearCart = () => setCart({});
  const removeProduct = (id) => { setProducts((p) => p.filter((x) => x.id !== id)); removeFromCart(id); };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  return (
    <Ctx.Provider value={{ user, products, cart, favs, cartCount, signUp, signIn, signOut, updateProfile, toggleFav, addToCart, changeQty, removeFromCart, clearCart, removeProduct }}>
      {children}
    </Ctx.Provider>
  );
}
