import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Acc = new Schema({
    idAcc: {
        type: Number
    },
    accNum: {
        type: String
    },
    bank: {
        type: String
    },
    companyId: {
        type: Number
    }

})

export default mongoose.model('AccountModel', Acc, 'businessAccounts');