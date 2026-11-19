import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { username, email, password });
      alert('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'حدث خطأ أثناء التسجيل');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="اسم المستخدم" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <input 
          type="email" 
          placeholder="البريد الإلكتروني" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>تسجيل</button>
      </form>
    </div>
  );
}

export default Register;