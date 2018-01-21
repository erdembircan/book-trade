import mongoose from 'mongoose';

module.exports.connect = (uri) => {
  mongoose.connect(uri);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('error', (err) => {
    console.log(`An error occured: ${err}`);
  });

};
