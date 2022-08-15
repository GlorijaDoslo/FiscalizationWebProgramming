import express, { Request } from 'express';
import TableModel from '../models/table';
import ReceiptModel from '../models/receipt';
import UserModel from '../models/user';

export class TableController {

    getAllTables = (req: express.Request, res: express.Response)=>{
        TableModel.find({'companyId': req.body.companyId, 'objectId': req.body.objectId, 'department': req.body.department}, (err, tables)=>{
            if (err) console.log(err);
            else res.json(tables);
        })
    }

    addTable = (req: express.Request, res: express.Response)=>{
        // dodavanje racuna pre stola i onda dodaj idRec u receiptId
        UserModel.find({'idCom': req.body.companyId}, (err, company)=>{
            if (err) console.log(err);
            else {
                ReceiptModel.find({}, (err, receipts)=>{
                    if (receipts.length == 0) {
                        let rec = new ReceiptModel({
                            idRec: 1,
                            companyId: req.body.companyId,
                            isClosed: false,
                            tableObject: req.body.objectName,
                            tableDepartment: req.body.department,
                            objectId: req.body.objectId,
                            nameOfCompany: company[0].comname
                        })
                        rec.save((err, resp)=>{
                            if (err) console.log(err);
                            else {
                                TableModel.find({}, (err, tables)=>{
                                    if (tables.length == 0) {
                                        let tab = new TableModel({
                                            idTab: 1,
                                            shape: req.body.shape,
                                            xPos: req.body.xPos,
                                            yPos: req.body.yPos,
                                            radius: req.body.radius,
                                            width: req.body.width,
                                            length: req.body.length,
                                            occupied: req.body.occupied,
                                            department: req.body.department,
                                            receiptId: 1,
                                            companyId: req.body.companyId,
                                            objectId: req.body.objectId
                                        })
                                        tab.save((err, resp)=>{
                                            if (err) {
                                                console.log(err);
                                                res.json({"message": "error"});
                                            }
                                            else {
                                                ReceiptModel.updateOne({'idRec': 1}, {$set: {'tableId': 1}}, (err, resp)=>{
                                                    if (err) console.log(err);
                                                    else res.json({"message": "ok"});
                                                })
                                            }
                                        });
                                            
                                    }
                                    else {
                                        TableModel.find().sort({ idTab: -1}).limit(1).then(
                                            (table)=>{
                                                let tab = new TableModel({
                                                    idTab: table[0].idTab + 1,
                                                    shape: req.body.shape,
                                                    xPos: req.body.xPos,
                                                    yPos: req.body.yPos,
                                                    radius: req.body.radius,
                                                    width: req.body.width,
                                                    length: req.body.length,
                                                    occupied: req.body.occupied,
                                                    department: req.body.department,
                                                    receiptId: 1,
                                                    companyId: req.body.companyId,
                                                    objectId: req.body.objectId
                                                })
                                                tab.save((err, resp)=>{
                                                    if (err) {
                                                        console.log(err);
                                                        res.json({"message": "error"});
                                                    }
                                                    else {
                                                        ReceiptModel.updateOne({'idRec': 1}, {$set: {'tableId': table[0].idTab + 1}}, (err, resp)=>{
                                                            if (err) console.log(err);
                                                            else res.json({"message": "ok"});
                                                        })
                                                    }
                                                });
                                            }
                                        ).catch((err)=>console.log(err))
                                    }
                                    
                                })
                            }
                        })
                    }
                    else {  // if receipts.length != 0
                        ReceiptModel.find().sort({idRec: -1}).limit(1).then(
                            (receipt)=>{
                                let rec = new ReceiptModel({
                                    idRec: receipt[0].idRec + 1,
                                    companyId: req.body.companyId,
                                    isClosed: false,
                                    tableObject: req.body.objectName,
                                    tableDepartment: req.body.department,
                                    objectId: req.body.objectId,
                                    nameOfCompany: company[0].comname
                                })
                                rec.save((err, resp)=>{
                                    if (err) console.log(err);
                                    else {
                                        TableModel.find({}, (err, tables)=>{
                                            if (tables.length == 0) {
                                                let tab = new TableModel({
                                                    idTab: 1,
                                                    shape: req.body.shape,
                                                    xPos: req.body.xPos,
                                                    yPos: req.body.yPos,
                                                    radius: req.body.radius,
                                                    width: req.body.width,
                                                    length: req.body.length,
                                                    occupied: req.body.occupied,
                                                    department: req.body.department,
                                                    receiptId: receipt[0].idRec + 1,
                                                    companyId: req.body.companyId,
                                                    objectId: req.body.objectId
                                                })
                                                tab.save((err, resp)=>{
                                                    if (err) {
                                                        console.log(err);
                                                        res.json({"message": "error"});
                                                    }
                                                    else {
                                                        ReceiptModel.updateOne({'idRec': receipt[0].idRec + 1}, {$set: {'tableId': 1}}, (err, resp)=>{
                                                            if (err) console.log(err);
                                                            else res.json({"message": "ok"});
                                                        })
                                                    }
                                                });
                                                    
                                            }
                                            else {
                                                TableModel.find().sort({ idTab: -1}).limit(1).then(
                                                    (table)=>{
                                                        let tab = new TableModel({
                                                            idTab: table[0].idTab + 1,
                                                            shape: req.body.shape,
                                                            xPos: req.body.xPos,
                                                            yPos: req.body.yPos,
                                                            radius: req.body.radius,
                                                            width: req.body.width,
                                                            length: req.body.length,
                                                            occupied: req.body.occupied,
                                                            department: req.body.department,
                                                            receiptId: receipt[0].idRec + 1,
                                                            companyId: req.body.companyId,
                                                            objectId: req.body.objectId
                                                        })
                                                        tab.save((err, resp)=>{
                                                            if (err) {
                                                                console.log(err);
                                                                res.json({"message": "error"});
                                                            }
                                                            else {
                                                                ReceiptModel.updateOne({'idRec': receipt[0].idRec + 1}, {$set: {'tableId': table[0].idTab + 1}},
                                                                 (err, resp)=>{
                                                                    if (err) console.log(err);
                                                                    else res.json({"message": "ok"});
                                                                })
                                                            }
                                                        });
                                                    }
                                                ).catch((err)=>console.log(err))
                                            }
                                            
                                        })
                                    }
                                })
                            }
                        ).catch(err=>console.log(err));
                    }
                })
                
        
        
                
            }
        })
        

    }
    
    deleteTable = (req: express.Request, res: express.Response)=>{
        TableModel.deleteOne({"idTab": req.body.idTab}, (err, resp)=>{
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    // for now i only update position of table
    updateTable = (req: express.Request, res: express.Response)=>{
        TableModel.updateOne({'idTab': req.body.idTab}, {$set: {'xPos': req.body.xPos, 'yPos': req.body.yPos}}, (err, resp)=>{
            if (err) console.log(err);
            else {
                res.json({"message":"ok"}); 
            }
        })
    }

    updateOccupationOfTable = (req: express.Request, res: express.Response)=>{
        TableModel.updateOne({'idTab': req.body.idTab}, {$set: {'occupied': req.body.occupied}}, (err, resp)=>{
            if (err) console.log(err);
            else {
                res.json({"message":"ok"}); 
            }
        })
    }
}