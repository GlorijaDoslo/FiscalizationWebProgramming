import express from 'express';
import { TableController } from '../controllers/table.controller';


const tableRouter = express.Router();

tableRouter.route('/getAllTables').post(
    (req, res)=>new TableController().getAllTables(req, res)
)

tableRouter.route('/addTable').post(
    (req, res)=>new TableController().addTable(req, res)
)

tableRouter.route('/deleteTable').post(
    (req, res)=>new TableController().deleteTable(req, res)
)

tableRouter.route('/updateTable').post(
    (req, res)=>new TableController().updateTable(req, res)
)

tableRouter.route('/updateOccupationOfTable').post(
    (req, res)=>new TableController().updateOccupationOfTable(req, res)
)


export default tableRouter;