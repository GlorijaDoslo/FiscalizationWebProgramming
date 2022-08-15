import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    idCom: {
        type: Number
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
        //unique: true
    },
    password: {
        type: String
    },
    type: {
        type: Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
        //unique: true
    },
    comname: {
        type: String
    },
    address: {
        type: String
    },
    pib: {
        type: String
    },
    comnumber: {
        type: Number
    },
    isAccepted: { // -1 if it is declined, 0 if it isn't and 1 if it is accepted
        type: Number
    },
    numLK: {
        type: String
    },
    isActivated: {
        type: Boolean
    },
    isFirstLogin: { // if company login for first time
        type: Boolean
    },
    category: {
        type: String
    },
    activityCipher: {
        type: Array
    },
    isPDV: {
        type: Boolean
    },
    numOfAccounts: {
        type: Number
    },
    numOfWarehouses: {
        type: Number
    },
    numOfRegisters: {
        type: Number
    },
    orderers: {
        type: [{idCom: Number, numOfDays: Number, discount: Number}]
    },
    items: {
        type: [{idIte: Number, itemName: String, manufacturer: String, minStock: Number, maxStock: Number}]
    },
    image: {
        type: String
    }

})

export default mongoose.model('UserModel', User, 'users');