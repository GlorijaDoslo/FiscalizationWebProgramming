import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Table = new Schema({
    idTab: Number,
    shape: String,
    xPos: Number,
    yPos: Number,
    radius: Number,
    width: Number,
    length: Number,
    occupied: Boolean,
    department: String,
    receiptId: Number,
    companyId: Number,
    objectId: Number

})

export default mongoose.model('TableModel', Table, 'tables');