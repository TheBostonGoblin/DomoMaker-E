const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    require: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    require: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.static.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  level: doc.level,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return DomoModel.find(search).select('name age level').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;
