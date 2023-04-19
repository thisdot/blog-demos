const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    /**
     * No need to add "id" column
     * It is being created by mLab as "_id"
     */
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema);