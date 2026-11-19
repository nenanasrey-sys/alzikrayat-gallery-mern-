import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#333', color: '#fff' }}>
      <h2>Alzikrayat 📸</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>الرئيسية</Link>
        {user ? (
          <>
            <Link to="/upload" style={{ color: '#fff', textDecoration: 'none' }}>رفع ذكرى</Link>
            <span>مرحباً، {user.username}</span>
            <button onClick={handleLogout} style={{ background: '#ff4d4d', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>تسجيل خروج</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>تسجيل الدخول</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>حساب جديد</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;