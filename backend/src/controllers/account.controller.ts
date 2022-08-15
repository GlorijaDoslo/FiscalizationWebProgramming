import express, { Request } from 'express';
import AccountModel from '../models/businessAccount';
import UserModel from '../models/user';

export class AccountController {

    getMaxIdAcc = (req: express.Request, res: express.Response)=>{
        AccountModel.find().sort({ idAcc: -1}).limit(1).then(
            (account)=>res.json(account)
        ).catch((err)=>console.log(err))

    }

    addAccounts = (req: express.Request, res: express.Response)=>{
        let acc = new AccountModel({
            idAcc: req.body.idAcc,
            accNum: req.body.accNum,
            bank: req.body.bank,
            companyId: req.body.companyId
        })
        acc.save((err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    
    }

    deleteAccount = (req: express.Request, res: express.Response)=>{
        AccountModel.deleteOne({"idAcc": req.body.idAcc}, (err, resp)=>{
            if (err) console.log(err);
            else {
                UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfAccounts": -1}}, (err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })
            }
        })
    }

    addAccount = (req: express.Request, res: express.Response)=>{
        AccountModel.find().sort({ idAcc: -1}).limit(1).then(
            (account)=>{
                let acc = new AccountModel({
                    idAcc: account[0].idAcc + 1,
                    accNum: req.body.accNum,
                    bank: req.body.bank,
                    companyId: req.body.companyId
                })
                acc.save((err, resp)=>{
                    if (err) {
                        console.log(err);
                        res.json({"message": "error"});
                    }
                    else {
                        
                        UserModel.updateOne({"idCom": req.body.companyId}, {$inc: {"numOfAccounts": 1}}, (err, resp)=>{
                            if (err) console.log(err);
                            else res.json({"message": "ok"});
                        })
                    }
                });
            }
        ).catch((err)=>console.log(err))

    }

}