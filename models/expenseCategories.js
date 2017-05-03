var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseCategorySchema = new Schema(
    {
        expenseCategoryName:{type: String, required:true},
        expenseCategoryDescription: {type: String},
        isInUse: {type: Boolean, default: true}
    },
    {
        timestamps:true
    }
);

var ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);
module.exports = ExpenseCategory;