import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let receipt = new Schema({
    idRec: Number,
    items: [{itemId: Number, itemName: String, price: Number, amount: Number, pdvPercent: Number}],
    totalValue: Number,
    isPDV: Boolean,
    paymentMethod: String,
    customerValue: Number,
    change: Number,
    numLK: String,
    firstname: String,
    lastname: String,
    slipAccount: String,
    ordererId: Number,
    dateOfReceipt: String,
    nameOfCompany: String,
    companyId: Number,
    isClosed: Boolean,
    tableObject: String,
    tableDepartment: String,
    tableId: Number,
    objectId: Number

})

export default mongoose.model('ReceiptModel', receipt, 'receipts');