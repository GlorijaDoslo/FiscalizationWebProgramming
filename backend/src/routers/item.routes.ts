import express from 'express';
import { ItemController } from '../controllers/item.controller';


const itemRouter = express.Router();

itemRouter.route('/getAllItems').get(
    (req, res)=>new ItemController().getAllItems(req, res)
)

itemRouter.route('/getItem').post(
    (req, res)=>new ItemController().getItem(req, res)
)

itemRouter.route('/addItem').post(
    (req, res)=>new ItemController().addItem(req, res)
)

itemRouter.route('/addItemToCompany').post(
    (req, res)=>new ItemController().addItemToCompany(req, res)
)

itemRouter.route('/deleteItem').post(
    (req, res)=>new ItemController().deleteItem(req, res)
)

itemRouter.route('/updateItem').post(
    (req, res)=>new ItemController().updateItem(req, res)
)

itemRouter.route('/searchItemsByName').post(
    (req, res)=>new ItemController().searchItemsByName(req, res)
)

itemRouter.route('/addItemToCategoryAndSubcategory').post(
    (req, res)=>new ItemController().addItemToCategoryAndSubcategory(req, res)
)

export default itemRouter;