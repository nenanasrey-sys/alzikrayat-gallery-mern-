const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const PhotoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    imagePath: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String },
    comments: [CommentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Photo', PhotoSchema);