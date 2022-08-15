import express from 'express';
import { AccountController } from '../controllers/account.controller';


const accountRouter = express.Router();

accountRouter.route('/getMaxIdAcc').get(
    (req, res)=>new AccountController().getMaxIdAcc(req, res)
)

accountRouter.route('/addAccounts').post(
    (req, res)=>new AccountController().addAccounts(req, res)
)

accountRouter.route('/deleteAccount').post(
    (req, res)=>new AccountController().deleteAccount(req, res)
)

accountRouter.route('/addAccount').post(
    (req, res)=>new AccountController().addAccount(req, res)
)



export default accountRouter;