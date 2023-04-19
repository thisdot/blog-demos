const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  /**
   * No need to add "id" column
   * It is being created by mLab as "_id"
   */
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);