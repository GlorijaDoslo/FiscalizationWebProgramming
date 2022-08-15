import express, { Request } from 'express';
import CategoryModel from '../models/category';

export class CategoryController {


    getCategories = (req: express.Request, res: express.Response)=>{
        CategoryModel.find({}, (err, categories)=>{
            if (err) console.log(err);
            else res.json(categories);
        })
    }

    AddCategory = (req: express.Request, res: express.Response)=>{
        CategoryModel.find().sort({idCat: -1}).limit(1).then(
            (category)=>{
                let cat = new CategoryModel({
                    idCat: category[0].idCat + 1,
                    name: req.body.name,
                    subcategories: req.body.subcategories
                })
                cat.save((err, resp)=>{
                    if (err) console.log(err);
                    else res.json({"message": "ok"});
                })
            }
        ).catch((err)=>console.log(err))

    }

}