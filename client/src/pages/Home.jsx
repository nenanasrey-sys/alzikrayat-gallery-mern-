import React, { useState, useEffect } from 'react';
import API from '../services/api';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await API.get('/photos');
        setPhotos(res.data);
      } catch (err) {
        console.error("Error fetching photos", err);
      }
    };
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنتِ متأكدة من حذف هذه الذكرى؟")) return;
    try {
      await API.delete(`/photos/${id}`);
      setPhotos(photos.filter(photo => photo._id !== id));
    } catch (err) {
      alert('فشل حذف الصورة');
    }
  };

const handleAddComment = async (photoId, e) => {
  e.preventDefault();
  const commentText = commentInputs[photoId];
  if (!commentText || !commentText.trim()) return;

  try {
    const res = await API.post(`/photos/${photoId}/comment`, {
      comment: commentText,
      username: "amna"
    });

    setPhotos(photos.map(photo =>
      photo._id === photoId ? res.data : photo
    ));
    setCommentInputs({ ...commentInputs, [photoId]: '' });
  } catch (err) {
    console.error("Error adding comment", err);
    alert(err.response?.data?.error || err.response?.data?.message || 'حدث خطأ أثناء إضافة التعليق');
  }
};

  return (
    <div style={{ padding: '30px', direction: 'rtl', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Cairo, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* عنوان الصفحة */}
        <div style={{ marginBottom: '25px', textAlign: 'center' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '28px', fontWeight: 'bold' }}>Alzikrayat Gallery</h2>
          <p style={{ color: '#7f8c8d', fontSize: '14px' }}>استعرض أجمل لحظاتك وشاركيها مع الجميع</p>
        </div>

        {/* شبكة عرض البطاقات */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {photos.map(photo => (
            <div key={photo._id} style={{ 
              background: '#ffffff', 
              borderRadius: '12px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
              overflow: 'hidden', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s ease',
              border: '1px solid #eaeaea'
            }}>
              
              {/* رأس الكارت (اسم المستخدم) */}
              <div style={{ padding: '12px 15px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f1f1' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#3498db', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px', marginLeft: '10px' }}>
                  {photo.username ? photo.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <span style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{photo.username}</span>
              </div>

              {/* عرض الصورة بحجم متناسق */}
              <div style={{ width: '100%', height: '200px', backgroundColor: '#000', overflow: 'hidden' }}>
                <img 
                  src={`http://localhost:5000/uploads/${photo.imagePath}`} 
                  alt={photo.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              
              {/* تفاصيل الكارت (العنوان والتعليقات) */}
              <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px', flex: '1' }}>
                
                <h3 style={{ margin: '0', fontSize: '18px', color: '#2c3e50' }}>{photo.title}</h3>
                
                {/* صندوق التعليقات */}
                <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', maxHeight: '110px', overflowY: 'auto', fontSize: '13px', border: '1px solid #e9ecef' }}>
                  <strong style={{ display: 'block', marginBottom: '5px', color: '#495057' }}>التعليقات:</strong>
                  {photo.comments && photo.comments.length > 0 ? (
                    photo.comments.map((comment, index) => (
                      <div key={index} style={{ borderBottom: '1px solid #dee2e6', padding: '4px 0', color: '#333' }}>
                        <span>{comment.comment || comment.text || comment}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: '#adb5bd', margin: '0', fontStyle: 'italic' }}>لا توجد تعليقات بعد.</p>
                  )}
                </div>

                {/* نموذج إضافة تعليق */}
                <form onSubmit={(e) => handleAddComment(photo._id, e)} style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="اكتب تعليقاً..." 
                    value={commentInputs[photo._id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [photo._id]: e.target.value })}
                    style={{ flex: '1', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '13px', outline: 'none' }}
                  />
                  <button type="submit" style={{ background: '#3498db', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }}>
                    نشر
                  </button>
                </form>

                {/* زر الحذف بتصميم أنيق */}
                <button 
                  onClick={() => handleDelete(photo._id)} 
                  style={{ background: '#fff', color: '#e74c3c', border: '1px solid #e74c3c', padding: '8px', cursor: 'pointer', borderRadius: '6px', width: '100%', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', marginTop: 'auto' }}
                  onMouseOver={(e) => { e.target.style.backgroundColor = '#e74c3c'; e.target.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#e74c3c'; }}
                >
                  حذف الذكرى 
                </button>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;