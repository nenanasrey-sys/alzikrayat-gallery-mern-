import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('يجب تسجيل الدخول أولاً!');
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('userId', user.id);
    formData.append('username', user.username);

    try {
      await API.post('/photos/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('تم رفع الذكرى بنجاح!');
      navigate('/');
    } catch (err) {
      alert('حدث خطأ أثناء رفع الصورة');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>رفع ذكرى جديدة 📸</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="عنوان الذكرى" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '10px' }}
        />
        <textarea 
          placeholder="وصف الذكرى أو قصتها..." 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          rows="4" 
          style={{ padding: '10px' }}
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
        />
        <button type="submit" style={{ padding: '10px', background: '#ffc107', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>رفع الصورة</button>
      </form>
    </div>
  );
}

export default Upload;