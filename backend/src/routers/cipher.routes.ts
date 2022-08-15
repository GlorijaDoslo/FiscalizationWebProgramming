import express from 'express';
import { CipherController } from '../controllers/cipher.controller';


const cipherRouter = express.Router();

cipherRouter.route('/getCiphers').get(
    (req, res)=>new CipherController().getCiphers(req, res)
)

export default cipherRouter;