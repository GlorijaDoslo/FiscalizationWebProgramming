import express, { Request } from 'express';
import ReceiptModel from '../models/receipt';

export class ReceiptController {

    getAllUnclosedReceipts = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({'isClosed': false, 'companyId': req.body.companyId}, (err, receipts)=>{
            if (err) console.log(err);
            else res.json(receipts);
        })
    }

    getAllClosedReceipts = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({'isClosed': true, 'companyId': req.body.companyId}, (err, receipts)=>{
            if (err) console.log(err);
            else res.json(receipts);
        })
    }

    getAllReceipts = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({'companyId': req.body.companyId}, (err, receipts)=>{
            if (err) console.log(err);
            else res.json(receipts);
        })
    }

    
    getAllReceiptsWithId = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({'numLK': req.body.numLK}, (err, receipts)=>{
            if (err) console.log(err);
            else res.json(receipts);
        })
    }

    addReceipt = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({}, (err, receipts)=>{
            if (receipts.length == 0) {
                let rec = new ReceiptModel({
                    idRec: 1,
                    totalValue: req.body.totalValue,
                    isPDV: req.body.isPDV,
                    paymentMethod: req.body.paymentMethod,
                    customerValue: req.body.customerValue,
                    change: req.body.change,
                    numLK: req.body.numLK,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    slipAccount: req.body.slipAccount,
                    ordererId: req.body.ordererId,
                    dateOfReceipt: req.body.dateOfReceipt,
                    nameOfCompany: req.body.nameOfCompany,
                    companyId: req.body.companyId,
                    isClosed: req.body.isClosed,
                    objectId: req.body.objectId,
                    tableObject: req.body.tableObject
                })
                rec.save((err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })
            }
            else {  // if receipts.length != 0
                ReceiptModel.find().sort({idRec: -1}).limit(1).then(
                    (receipt)=>{
                        let rec = new ReceiptModel({
                            idRec: receipt[0].idRec + 1,
                            totalValue: req.body.totalValue,
                            isPDV: req.body.isPDV,
                            paymentMethod: req.body.paymentMethod,
                            customerValue: req.body.customerValue,
                            change: req.body.change,
                            numLK: req.body.numLK,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            slipAccount: req.body.slipAccount,
                            ordererId: req.body.ordererId,
                            dateOfReceipt: req.body.dateOfReceipt,
                            nameOfCompany: req.body.nameOfCompany,
                            companyId: req.body.companyId,
                            isClosed: req.body.isClosed,
                            objectId: req.body.objectId,
                            tableObject: req.body.tableObject
                        })
                        rec.save((err, resp)=>{
                            if (err) console.log(err);
                            else res.json({"message": "ok"});
                        })
                    }
                ).catch(err=>console.log(err));
            }
        })
    }

    updateReceipt = (req: express.Request, res: express.Response)=>{
        ReceiptModel.updateOne({'idRec': req.body.idRec}, {$set: {'totalValue': req.body.totalValue,
            'isPDV': req.body.isPDV,
            'paymentMethod': req.body.paymentMethod,
            'customerValue': req.body.customerValue,
            'change': req.body.change,
            'numLK': req.body.numLK,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'slipAccount': req.body.slipAccount,
            'ordererId': req.body.ordererId,
            'dateOfReceipt': req.body.dateOfReceipt,
            'nameOfCompany': req.body.nameOfCompany,
            'companyId': req.body.companyId,
            'isClosed': req.body.isClosed
        }}, (err, resp)=>{
                if (err) console.log(err);
                else res.json({"message": "ok"});
            })
    }

    updateReceiptTotalValue = (req: express.Request, res: express.Response)=>{
        ReceiptModel.updateOne({'idRec': req.body.idRec}, {$set: {'totalValue': req.body.totalValue}}, (err, resp)=>{
                if (err) console.log(err);
                else res.json({"message": "ok"});
            })
    }

    addItemToReceipt = (req: express.Request, res: express.Response)=>{
        let item = {itemId: req.body.itemId, itemName: req.body.itemName
            , price: req.body.price, amount: req.body.amount, pdvPercent: req.body.pdvPercent}
        ReceiptModel.updateOne({'idRec': req.body.idRec}, {$push: {'items': item}}, (err, resp)=>{
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getLastReceipts = (req: express.Request, res: express.Response)=>{
        ReceiptModel.find({'isClosed': true}, (err, recs)=>{
            if (err) console.log(err);
            else res.json(recs);
        })
    }

}