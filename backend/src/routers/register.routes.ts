import express from 'express';
import { RegisterController } from '../controllers/register.controller';

const registerRouter = express.Router();

registerRouter.route('/getMaxIdReg').get(
    (req, res)=>new RegisterController().getMaxIdReg(req, res)
)

registerRouter.route('/addRegisters').post(
    (req, res)=>new RegisterController().addRegisters(req, res)
)

registerRouter.route('/deleteRegister').post(
    (req, res)=>new RegisterController().deleteRegister(req, res)
)

registerRouter.route('/addRegister').post(
    (req, res)=>new RegisterController().addRegister(req, res)
)



export default registerRouter;