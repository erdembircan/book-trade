import mongoose from 'mongoose';
import envData from 'env-data';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    password: { type: String },
    books: Array,
  },
  { collection: 'book_users' },
);

UserSchema.pre('save', function hook(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const hash = crypto
    .createHmac('sha256', envData.getData('sha256Secret'))
    .update(user.password)
    .digest('hex');

  user.password = hash;
  return next();
});

module.exports = mongoose.model('User', UserSchema);
