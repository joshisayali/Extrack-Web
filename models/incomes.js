var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incomeSourceSchema = new Schema(
    {
        incomeSourceName:{type: String, required:true},
        incomeSourceDescription: {type: String},
        isInUse: {type: Boolean, default: true}
    },
    {
        timestamps:true
    }
);

var incomeSchema = new Schema(
    
    {
        incomeDate:{type:Date, required:true},
        incomeItem:{type:String, required:true},
        incomeAmount:{type:Number, required:true},
        incomeSource: incomeSourceSchema        
    },
    {
        timestamps:true
    }
);

var Income = mongoose.model('Income',incomeSchema);
module.exports = Income;