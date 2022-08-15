import express, { Request } from 'express';
import WarehouseModel from '../models/warehouse';
import UserModel from '../models/user';

export class WarehouseController {
    
    getMaxIdWar = (req: express.Request, res: express.Response)=>{
        WarehouseModel.find().sort({ idWar: -1}).limit(1).then(
            (warehouse)=>res.json(warehouse)
        ).catch((err)=>console.log(err))

    }

    addWarehouses = (req: express.Request, res: express.Response)=>{
        let war = new WarehouseModel({
            idWar: req.body.idWar,
            name: req.body.name,
            companyId: req.body.companyId
        })
        war.save((err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    deleteWarehouse = (req: express.Request, res: express.Response)=>{
        WarehouseModel.deleteOne({"idWar": req.body.idWar}, (err, resp)=>{
            if (err) console.log(err);
            else {
                UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfWarehouses": -1}}, (err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })

            }
        })
    }

    addWarehouse = (req: express.Request, res: express.Response)=>{
        WarehouseModel.find().sort({ idWar: -1}).limit(1).then(
            (warehouse)=>{
                let war = new WarehouseModel({
                    idWar: warehouse[0].idWar + 1,
                    name: req.body.name,
                    companyId: req.body.companyId
                })
                war.save((err, resp)=>{
                    if (err) {
                        console.log(err);
                        res.json({"message": "error"});
                    }
                    else {
                        UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfWarehouses": 1}}, (err, resp)=>{
                            if (err) console.log(err);
                            else res.json({"message": "ok"});
                        })
                    }
                });
            }
        ).catch((err)=>console.log(err))
    }

    addDepartment = (req: express.Request, res: express.Response)=>{
        WarehouseModel.updateOne({'idWar': req.body.idWar}, {$push: {'departments': req.body.department}}, (err, resp)=>{
            if (err) console.log(err);
            else res.json({"message": "ok"});
        })
    }

    getWarehouse = (req: express.Request, res: express.Response)=>{
        WarehouseModel.find({'idWar': req.body.idWar}, (err, warehouse)=>{
            if (err) console.log(err);
            else res.json(warehouse);
        })
    }
}