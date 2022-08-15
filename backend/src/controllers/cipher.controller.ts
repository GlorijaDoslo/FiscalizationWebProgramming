import express, { Request } from 'express';
import CipherModel from '../models/cipher';

export class CipherController {


    getCiphers = (req: express.Request, res: express.Response)=>{
        CipherModel.find({}, (err, ciphers)=>{
            if (err) console.log(err);
            else res.json(ciphers);
        })
    }
}