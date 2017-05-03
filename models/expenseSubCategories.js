var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var expenseSubCategorySchema = new Schema(
    {
        expenseCategory: {type: mongoose.Schema.Types.ObjectId, ref:'ExpenseCategory'},
        expenseSubCategoryName:{type: String, required:true},
        expenseSubCategoryDescription: {type: String},
        isInUse: {type: Boolean, default: true}
    },
    {
        timestamps:true
    }
);

var ExpenseSubCategory = mongoose.model('ExpenseSubCategory', expenseSubCategorySchema);
module.exports = ExpenseSubCategory;