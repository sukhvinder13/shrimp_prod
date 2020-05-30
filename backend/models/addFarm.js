var mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  farmId:{type:String,required:true},
  farmOwner: { type: String, required: true },
  farmHistory: { type: String, required: true },
  state: { type: String, required: true },
  mandal: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  village: { type: String, required: true },
  country: { type: String, required: true },
  noOfTanks: { type: String, required: true },
  noOfEmployess: { type: String, required: true },
});

module.exports = mongoose.model('AddFarm', postSchema);

// module.exports = mongoose.model('AddFarm', {
//     farmOwner:String,
//     farmHistory: String,
//     state: String,
//     mandal: String,
//     city: String,
//     // date: Date,
//     zip: Number,
//     village: String,
//     country: String,
//     noOfTanks: Number,
//     noOfEmployess: Number
// })