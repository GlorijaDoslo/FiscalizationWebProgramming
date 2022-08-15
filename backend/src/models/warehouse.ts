import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Warehouse = new Schema({
    idWar: {
        type: Number
    },
    name: {
        type: String
    },
    companyId: {
        type: Number
    },
    itemsInfo: { // in base is purchase price and selling price
        type: [{idIte: Number, name: String, purchasePrice: Number, sellingPrice: Number, currentStock: Number, minWantedStock: Number, maxWantedStock: Number}]
    },
    departments: {
        type: Array
    }

})

export default mongoose.model('WarehouseModel', Warehouse, 'warehouses');