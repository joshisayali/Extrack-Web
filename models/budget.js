var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema();

var Budget = mongoose.model('Budget',budgetSchema);
module.exports = Budget;