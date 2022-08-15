import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Cipher = new Schema({
    cipher: {
        type: String
    }
})

export default mongoose.model('CipherModel', Cipher, 'codebook');