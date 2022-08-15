import express, { Request } from 'express';
import RegisterModel from '../models/register';
import UserModel from '../models/user';

export class RegisterController {

    getMaxIdReg = (req: express.Request, res: express.Response)=>{
        RegisterModel.find().sort({ idReg: -1}).limit(1).then(
            (register)=>res.json(register)
        ).catch((err)=>console.log(err))

    }

    addRegisters = (req: express.Request, res: express.Response)=>{
        let reg = new RegisterModel({
            idReg: req.body.idReg,
            location: req.body.location,
            type: req.body.type,
            companyId: req.body.companyId
        })
        reg.save((err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    deleteRegister = (req: express.Request, res: express.Response)=>{
        RegisterModel.deleteOne({"idReg": req.body.idReg}, (err, resp)=>{
            if (err) console.log(err);
            else {
                UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfRegisters": -1}}, (err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })
            }
            
        })
    }

    addRegister = (req: express.Request, res: express.Response)=>{
        RegisterModel.find().sort({ idReg: -1}).limit(1).then(
            (register)=>{       
                let reg = new RegisterModel({
                    idReg: register[0].idReg + 1,
                    location: req.body.location,
                    type: req.body.type,
                    companyId: req.body.companyId
                })
                reg.save((err, resp)=>{
                    if (err) {
                        console.log(err);
                        res.json({"message": "error"});
                    }
                    else {
                        UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfRegisters": 1}}, (err, resp)=>{
                            if (err) console.log(err);
                            else res.json({"message": "ok"});
                        })
                    }
                });
            }
        ).catch((err)=>console.log(err))

    }
}