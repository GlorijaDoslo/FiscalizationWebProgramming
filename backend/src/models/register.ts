import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Register = new Schema({
    idReg: {
        type: Number
    },
    location: {
        type: String
    },
    type: {
        type: String
    },
    companyId: {
        type: Number
    }

})

export default mongoose.model('RegisterModel', Register, 'cashRegisters');