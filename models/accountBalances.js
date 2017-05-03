var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountBalanceSchema = new Schema();

var AccountBalance = mongoose.model('AccountBalance',accountBalanceSchema);
module.exports = AccountBalance;