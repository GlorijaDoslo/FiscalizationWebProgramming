import express, { Request } from 'express';
import ItemModel from '../models/item';
import UserModel from '../models/user';

export class ItemController {

    getAllItems = (req: express.Request, res: express.Response)=>{
        ItemModel.find({}, (err, items)=>{
            if (err) console.log(err);
            else res.json(items);
        })
    }

    getItem = (req: express.Request, res: express.Response)=>{
        ItemModel.find({'idIte': req.body.idIte}, (err, items)=>{
            if (err) console.log(err);
            else res.json(items);
        })
    }

    addItem = (req: express.Request, res: express.Response)=>{
        let found = false;
        UserModel.find({"idCom": req.body.idCom}, (err, company)=>{
            if (err) console.log(err);
            else {
                for (let i = 0; i < company[0].items.length; i++) {
                    UserModel.find({"idIte": company[0].items[i].idIte}, (err, foundItem)=>{
                        if (err) console.log(err);
                        else {
                            if (foundItem[0].itemCipher == req.body.itemCipher) {
                                res.json({"message": "found"});
                                found = true;
                            }   
                        }
                    })
                }
                if (!found) {
                    ItemModel.find().sort({idIte: -1}).limit(1).then(
                        (item)=>{
                            let newItem = new ItemModel({
                                idIte: item[0].idIte + 1,
                                itemCipher: req.body.itemCipher,
                                itemName: req.body.itemName,
                                unitOfMeasure: req.body.unitOfMeasure,
                                taxRate: req.body.taxRate,
                                type: req.body.type,
                                originCountry: req.body.originCountry,
                                foreignName: req.body.foreignName,
                                barCode: req.body.barCode,
                                nameOfManufacturer: req.body.nameOfManufacturer,
                                customsTariff: req.body.customsTariff,
                                ecoTax: req.body.ecoTax,
                                exciseTax: req.body.exciseTax,
                                description: req.body.description,
                                declaration: req.body.declaration,
                                image: req.body.image
                            })
                            newItem.save((err, resp)=>{
                                if (err) console.log(err);
                                else {
                                    let it = {
                                        idIte: item[0].idIte + 1,
                                        itemName: req.body.itemName,
                                        minStock: req.body.minWantedStock,
                                        maxStock: req.body.maxWantedStock
                                    }
                                    UserModel.updateOne({'idCom': req.body.idCom}, {$push: {'items': it}}, (err, resp)=>{
                                        if (err) console.log(err);
                                        else res.json({"message": "ok"});
                                    })
                                }
                            })
                        }
                    ).catch((err)=>console.log(err))
                }
                
            }
        })
       
    }

    addItemToCompany = (req: express.Request, res: express.Response)=>{
        let it = {
            idIte: req.body.idIte,
            itemName: req.body.itemName,
            manufacturer: req.body.manufacturer,
            minStock: req.body.minWantedStock,
            maxStock: req.body.maxWantedStock
        }
        UserModel.updateOne({'idCom': req.body.idCom}, {$push: {'items': it}}, (err, resp)=>{
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })

    } 

    // deleteItem = (req: express.Request, res: express.Response)=>{
    //     ItemModel.deleteOne({"idIte": req.body.idIte}, (err, resp)=>{
    //         if (err) console.log(err);
    //         else {
    //             UserModel.updateOne({"idCom": req.body.idCom}, {$pull: {'items': {idIte: req.body.idIte}}}, (err, resp)=>{
    //                 if (err) console.log(err);
    //                 else res.json({"message":"ok"});
    //             })
    //         }
    //     })
    // }

    deleteItem = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({"idCom": req.body.idCom}, {$pull: {'items': {idIte: req.body.idIte}}}, (err, resp)=>{
            if (err) console.log(err);
            else res.json({"message":"ok"});
        })

    }

    updateItem = (req: express.Request, res: express.Response)=>{
        ItemModel.updateOne({'idIte': req.body.idIte}, {$set: {"itemCipher": req.body.itemCipher, "itemName": req.body.itemName,
        "unitOfMeasure": req.body.unitOfMeasure, "taxRate": req.body.taxRate, "type": req.body.type, "originCountry": req.body.originCountry,
        "foreignName": req.body.foreignName, "barCode": req.body.barCode, "nameOfManufacturer": req.body.nameOfManufacturer,
        "customsTariff": req.body.customsTariff, "ecoTax": req.body.ecoTax, "exciseTax": req.body.exciseTax, "description": req.body.description,
        "declaration": req.body.declaration, "image": req.body.image}}, (err, resp)=>{
            if (err) console.log(err);
            else {
                UserModel.updateOne({"idCom": req.body.idCom}, {$set: {"items.$[item].minStock": req.body.minWantedStock
                , "items.$[item].maxStock": req.body.maxWantedStock}}, {arrayFilters: [{
                    "item.idIte": req.body.idIte
                }]} ,(err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message":"ok"});
                })
            }
        })
    }

    // forbid changes
    addItemToCategoryAndSubcategory = (req: express.Request, res: express.Response)=>{
        ItemModel.find({'idIte': req.body.idIte}, (err, item)=>{
            if (err) console.log(err);
            else {
                if (item[0].category.length != 0) res.json({"message": "error"})
                else {
                    let category = {
                        idCat: req.body.idCat,
                        name: req.body.name,
                        subcategory: req.body.subcategory
                    }
                    ItemModel.updateOne({'idIte': item[0].idIte}, {$push: {"category": category}}, (err, resp)=>{
                        if (err) console.log(err)
                        else res.json({"message": "ok"});
                    })
                }
            }
        })
        
    }

    searchItemsByName = (req: express.Request, res: express.Response)=>{
        ItemModel.find({'itemName': {$regex: req.body.itemName}}, (err, items)=>{
            if (err) console.log(err);
            else res.json(items);
        })
    }
}