var mongoose = require('mongoose');

const tankSchema = mongoose.Schema({
  farmId:{type:String,required:true},
  tankId:{type:String,required:true}
});

module.exports = mongoose.model('Tanks', tankSchema);
