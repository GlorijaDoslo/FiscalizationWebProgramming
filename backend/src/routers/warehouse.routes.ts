import express from 'express';
import { WarehouseController } from '../controllers/warehouse.controller';

const warehouseRouter = express.Router();

warehouseRouter.route('/getMaxIdWar').get(
    (req, res)=>new WarehouseController().getMaxIdWar(req, res)
)

warehouseRouter.route('/addWarehouses').post(
    (req, res)=>new WarehouseController().addWarehouses(req, res)
)

warehouseRouter.route('/deleteWarehouse').post(
    (req, res)=>new WarehouseController().deleteWarehouse(req, res)
)

warehouseRouter.route('/addWarehouse').post(
    (req, res)=>new WarehouseController().addWarehouse(req, res)
)

warehouseRouter.route('/addDepartment').post(
    (req, res)=>new WarehouseController().addDepartment(req, res)
)

warehouseRouter.route('/getWarehouse').post(
    (req, res)=>new WarehouseController().getWarehouse(req, res)
)


export default warehouseRouter;