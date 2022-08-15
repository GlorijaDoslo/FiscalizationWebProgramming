import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let cat = new Schema({
    idCat: {
        type: Number
    },
    name: {
        type: String
    },
    subcategories: {
        type: Array
    }

})

export default mongoose.model('CategoryModel', cat, 'categories');