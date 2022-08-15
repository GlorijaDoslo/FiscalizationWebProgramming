import express, { Request } from 'express';
import UserModel from '../models/user';



export class UserController {
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({'username': username, 'password': password}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user);
        })
    }

    
    register = (req: express.Request, res: express.Response)=>{
        UserModel.find().sort({ idCom: -1}).limit(1).then(
            (user)=>{
                let request = new UserModel({
                    idCom: user[0].idCom + 1,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    username: req.body.username,
                    password: req.body.password,
                    type: req.body.type,
                    phone: req.body.phone,
                    email: req.body.email,
                    comname: req.body.comname,
                    address: req.body.address,
                    pib: req.body.pib,
                    comnumber: req.body.comnumber,
                    isAccepted: req.body.isAccepted,
                    isActivated: req.body.isActivated,
                    isFirstLogin: req.body.isFirstLogin,
                    image: req.body.image
                })
                request.save((err, resp)=>{
                    if (err) {
                        console.log(err);
                        res.status(400).json({"message": "error"});
                    }
                    else res.json({"message": "ok"});
                });
            }
        ).catch((err)=>console.log(err))

        
    }
    
    chpass = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;
        let oldPassword = req.body.oldPassword;

        UserModel.updateOne({'username': username, 'password': oldPassword}, {$set: {password: password}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.status(400).json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }


    getAllRequests = (req: express.Request, res: express.Response)=>{
        UserModel.find({'isAccepted': 0, 'type': 2}, (err, users)=>{
            if (err) console.log(err);
            else res.json(users);
        })
    }

    getCompanies = (req: express.Request, res: express.Response)=>{
        UserModel.find({'type': 2}, (err, companies)=>{
            if (err) console.log(err);
            else res.json(companies);
        })
    }

    activateUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'isActivated': true}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    deactivateUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'isActivated': false}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    acceptUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'isAccepted': 1}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    declineUser = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        UserModel.updateOne({'username': username}, {$set: {'isAccepted': -1}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    registerBuyer = (req: express.Request, res: express.Response)=>{
        let user = new UserModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            type: req.body.type,
            phone: req.body.phone,
            numLK: req.body.numLK
        })
        user.save((err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    addCompanyData = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'category': req.body.category, 'activityCipher': req.body.activityCipher,
    'isPDV': req.body.isPDV, 'numOfAccounts': req.body.numOfAccounts, 'numOfWarehouses': req.body.numOfWarehouses,
     'numOfRegisters': req.body.numOfRegisters}}, (err, resp)=>{
            if (err) {
                console.log(err);
                res.json({"message": "error"});
            }
            else res.json({"message": "ok"});
        });
    }

    makeFirstLoginTrue = (req: express.Request, res: express.Response)=>{
        UserModel.updateOne({'username': req.body.username}, {$set: {'isFirstLogin': true}}, (err, resp)=>{
                if (err) {
                    console.log(err);
                    res.json({"message": "error"});
                }
                else res.json({"message": "ok"});
            });
    }

    checkUsername = (req: express.Request, res: express.Response)=>{
        UserModel.find({'username': req.body.username}, (err, user)=>{
            if (err) console.log(err);
            else if (user.length == 0) res.json({"message": "nothing"});
            else res.json({"message": "found"});
        })
    }

    checkEmail = (req: express.Request, res: express.Response)=>{
        UserModel.find({'email': req.body.email}, (err, user)=>{
            if (err) console.log(err);
            else if (user.length == 0) res.json({"message": "nothing"});
            else res.json({"message": "found"});
        })
    }

    // uploadImage = (req: express.Request, res: express.Response)=>{

    // }

}