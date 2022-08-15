import express from 'express';
import { ReceiptController } from '../controllers/receipt.controller';


const receiptRouter = express.Router();

receiptRouter.route('/getAllUnclosedReceipts').post(
    (req, res)=>new ReceiptController().getAllUnclosedReceipts(req, res)
)

receiptRouter.route('/getAllReceipts').post(
    (req, res)=>new ReceiptController().getAllReceipts(req, res)
)

receiptRouter.route('/addReceipt').post(
    (req, res)=>new ReceiptController().addReceipt(req, res)
)

receiptRouter.route('/updateReceipt').post(
    (req, res)=>new ReceiptController().updateReceipt(req, res)
)

receiptRouter.route('/addItemToReceipt').post(
    (req, res)=>new ReceiptController().addItemToReceipt(req, res)
)

receiptRouter.route('/updateReceiptTotalValue').post(
    (req, res)=>new ReceiptController().updateReceiptTotalValue(req, res)
)

receiptRouter.route('/getAllClosedReceipts').post(
    (req, res)=>new ReceiptController().getAllClosedReceipts(req, res)
)

receiptRouter.route('/getLastReceipts').get(
    (req, res)=>new ReceiptController().getLastReceipts(req, res)
)

receiptRouter.route('/getAllReceiptsWithId').post(
    (req, res)=>new ReceiptController().getAllReceiptsWithId(req, res)
)

export default receiptRouter;