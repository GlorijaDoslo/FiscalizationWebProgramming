import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Item = new Schema({
    idIte: {
        type: Number
    },
    itemCipher: {
        type: String
    },
    itemName: {
        type: String
    },
    unitOfMeasure: {
        type: String
    },
    taxRate: {
        type: String
    },
    type: {
        type: String
    },

    // dopunski podaci
    originCountry: {
        type: String
    },
    foreignName: {
        type: String
    },
    barCode: {
        type: String
    },
    nameOfManufacturer: {
        type: String
    },
    customsTariff: {
        type: Number
    },
    ecoTax: {
        type: Boolean
    },
    exciseTax: {
        type: Boolean
    },
    description: {
        type: String
    },
    declaration: {
        type: String
    },
    category: {
        type: [{idCat: Number, name: String, subcategory: String}]
    },
    image: String
})

export default mongoose.model('ItemModel', Item, 'items');