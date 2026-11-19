import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('تم تسجيل الدخول بنجاح!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="اسم المستخدم" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="كلمة المرور" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>دخول</button>
      </form>
    </div>
  );
}

export default Login;