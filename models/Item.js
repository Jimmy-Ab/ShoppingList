const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { 
    type: String,
     required: true
  },
    description: {
      type: String
    },
    price: {
      type: Number
    },
  date: { 
    type: Date,
     default: Date.now
  },
  image: {
    data: Buffer,
    contentType: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  } 
});

module.exports = Item = mongoose.model('item', ItemSchema);
