import mongoose from 'mongoose';

const RequestsSchema = new mongoose.Schema({
  owner: String,
  requester: String,
  bookId: Number,
  status: String,
});

module.exports = mongoose.model('Requests', RequestsSchema);
