import express from 'express';
import { CategoryController } from '../controllers/category.controller';


const categoryRouter = express.Router();

categoryRouter.route('/getCategories').get(
    (req, res)=>new CategoryController().getCategories(req, res)
)

categoryRouter.route('/addCategory').post(
    (req, res)=>new CategoryController().AddCategory(req, res)
)



export default categoryRouter;