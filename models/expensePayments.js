var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expensePaymentSchema = new Schema(
    {
        expensePaymentMode:{type: String, required:true},
        expensePaymentModeDescription: {type: String},
        isInUse: {type: Boolean, default: true}        
    },
    {
        timestamps:true
    }
);

var ExpensePayment = mongoose.model('ExpensePayment',expensePaymentSchema);

module.exports = ExpensePayment;