var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSchema = new Schema(
    
    {
        expenseDate:{type:Date, required:true},
        expenseItem:{type:String, required:true},
        expenseAmount:{type:Number, required:true},
        expensePayment: {type: mongoose.Schema.Types.ObjectId, ref:'ExpensePayment'},
        expenseSubCategory: {type: mongoose.Schema.Types.ObjectId, ref:'ExpenseSubCategory'},
        expenseRepeat:{type: mongoose.Schema.Types.ObjectId, ref:'ExpenseRepeat'}
    },
    {
        timestamps:true
    }
);


var Expense = mongoose.model('Expense',expenseSchema);

module.exports = Expense;
