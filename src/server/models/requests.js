import mongoose from 'mongoose';

const RequestsSchema = new mongoose.Schema(
  {
    owner: String,
    requester: String,
    bookId: Number,
    status: String,
  },
  { collection: 'book_requests' },
);

module.exports = mongoose.model('Requests', RequestsSchema);
