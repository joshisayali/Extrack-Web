var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseRepeatSchema = new Schema(
    {
        expenseRepeatFrequency:{type: String, required:true},
        expenseRepeatDescription: {type: String},
        isInUse: {type: Boolean, default: true}        
    },
    {
        timestamps:true
    }
);

var ExpenseRepeat = mongoose.model('ExpenseRepeat',expenseRepeatSchema);
module.exports = ExpenseRepeat;