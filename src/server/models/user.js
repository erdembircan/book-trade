import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  password: { type: String },
  books: Array,
});

module.exports = mongoose.model('User', UserSchema);
