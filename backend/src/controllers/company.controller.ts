import express, { Request } from 'express';
import UserModel from '../models/user';
import AccountModel from '../models/businessAccount';
import WarehouseModel from '../models/warehouse';
import RegisterModel from '../models/register';

export class CompanyController {

    getMaxIdCom = (req: express.Request, res: express.Response)=>{
        UserModel.find().sort({ idCom: -1}).limit(1).then(
            (user)=>res.json(user)
        ).catch((err)=>console.log(err))
    }

    getAllCompanyData = (req: express.Request, res: express.Response)=>{
        UserModel.find({'username': req.body.username}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
        })

    }

    getCompany = (req: express.Request, res: express.Response)=>{
        UserModel.find({'idCom': req.body.idCom}, (err, user)=>{
            if (err) console.log(err);
            else res.json(user);
        })

    }

    changeFirstname = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'firstname': req.body.firstname}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeLastname = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'lastname': req.body.lastname}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changePhone = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'phone': req.body.phone}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeEmail = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'email': req.body.email}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeUsername = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'username': req.body.username1}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeComname = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'comname': req.body.comname}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeAddress = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'address': req.body.address}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changePIB = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'pib': req.body.pib}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changeComnumber = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'comnumber': req.body.comnumber}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    changePDV = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'isPDV': req.body.isPDV}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        })
    }

    getAllAccounts = (req: express.Request, res: express.Response)=>{
        AccountModel.find({'companyId': req.body.idCom}, (err, accounts)=>{
            if (err) console.log(err);
            else res.json(accounts);
        })
    }

    getAllWarehouses = (req: express.Request, res: express.Response)=>{
        WarehouseModel.find({'companyId': req.body.idCom}, (err, warehouses)=>{
            if (err) console.log(err);
            else {
                res.json(warehouses);
            }
            
        })
    }

    getAllRegisters = (req: express.Request, res: express.Response)=>{
        RegisterModel.find({'companyId': req.body.idCom}, (err, register)=>{
            if (err) console.log(err);
            else res.json(register);
        })
    }

    searchCompaniesByPIB = (req: express.Request, res: express.Response)=>{
        let searchParam = req.body.searchParam;
        UserModel.find({'pib': {$regex: searchParam}}, (err, companies)=>{
            if (err) console.log(err);
            else res.json(companies);
        })
    }

    searchCompaniesByName = (req: express.Request, res: express.Response)=>{
        let searchParam = req.body.searchParam;
        UserModel.find({'comname': {$regex: searchParam}}, (err, companies)=>{
            if (err) console.log(err);
            else res.json(companies);
        })
    }

    searchCompaniesByPIBAndName = (req: express.Request, res: express.Response)=>{
        let searchParam = req.body.searchParam;
        UserModel.find({'pib': {$regex: searchParam}, 'comname': {$regex: req.body.searchName}}, (err, companies)=>{
            if (err) console.log(err);
            else res.json(companies);
        })
    }

    addOrderer = (req: express.Request, res: express.Response)=>{
        if (req.body.ordererIdCom == 0) {
            UserModel.find().sort({ idCom: -1 }).limit(1).then(
                (user)=>{
                    let orderer = {
                        idCom: user[0].idCom,
                        numOfDays: req.body.numOfDays,
                        discount: req.body.discount
                    }
                    UserModel.updateOne({'idCom': req.body.idCom}, {$push: {'orderers': orderer}}, (err, resp)=>{
                            if (err) console.log(err);
                            else res.json({'message': 'ok'});
                    })
                }
            ).catch((err)=>console.log(err))
            
        } else {
            UserModel.find({"idCom": req.body.idCom}, (err, company)=>{
                let error = false;
                if (err) console.log(err);
                else {
                    for (let i = 0; i < company[0].orderers.length; i++) {
                        if (company[0].orderers[i].idCom == req.body.ordererIdCom) {
                            error = true;
                            res.json({"message": "error"});
                        }
                    }
                    if (!error) {
                        let orderer = {
                            idCom: req.body.ordererIdCom,
                            numOfDays: req.body.numOfDays,
                            discount: req.body.discount
                        }
                        UserModel.updateOne({'idCom': req.body.idCom}, {$push: {'orderers': orderer}}, (err, resp)=>{
                                if (err) console.log(err);
                                else res.json({'message': 'ok'});
                        })
                    }
    
                }
            })
        }
    }

}