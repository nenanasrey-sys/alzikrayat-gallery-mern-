const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoute = require('./routes/auth');
const photoRoute = require('./routes/photos');

app.use('/api/auth', authRoute);
app.use('/api/photos', photoRoute);

// الاتصال بقاعدة بيانات MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/alzikrayat_mern';
mongoose.connect(MONGO_URI)
  .then(() => console.log(' MongoDB Connected Successfully'))
  .catch((err) => console.error(' MongoDB Connection Error:', err));

// مسار تجريبي للتأكد من عمل السيرفر
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});