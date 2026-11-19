const router = require('express').Router();
const Photo = require('../models/Photo');
const multer = require('multer');
const path = require('path');

// إعداد التخزين للصور عبر Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// جلب جميع الصور
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().sort({ createdAt: -1 });
        res.status(200).json(photos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// رفع صورة جديدة
router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { title, description, userId, username } = req.body;
        if (!req.file) return res.status(400).json({ message: "يرجى اختيار صورة!" });

        const newPhoto = new Photo({
            title,
            description,
            imagePath: req.file.filename,
            user: userId,
            username
        });

        const savedPhoto = await newPhoto.save();
        res.status(201).json(savedPhoto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// جلب تفاصيل صورة معينة
router.get('/:id', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        res.status(200).json(photo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// إضافة تعليق على صورة
router.post('/:id/comment', async (req, res) => {
    try {
        const { userId, username, comment } = req.body;
        const photo = await Photo.findById(req.params.id);
        
        photo.comments.push({ user: userId, username, comment });
        await photo.save();
        res.status(200).json(photo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// حذف صورة
router.delete('/:id', async (req, res) => {
    try {
        await Photo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "تم حذف الصورة بنجاح" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;