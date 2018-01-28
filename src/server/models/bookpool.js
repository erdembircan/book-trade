import mongoose from 'mongoose';

const BookPool = new mongoose.Schema({
  book: Object,
  owners: Array,
});

module.exports = mongoose.model('BookPool', BookPool);
