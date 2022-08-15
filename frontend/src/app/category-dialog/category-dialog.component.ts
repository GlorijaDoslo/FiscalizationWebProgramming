import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/services/category.service';
import { ItemService } from 'src/services/item.service';
import { Category } from '../models/category';
import { Item } from '../models/item';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private itemService: ItemService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.page = 1;
    this.searchedItems = this.data.allItems;
    this.categoryService.getAllCategories().subscribe((categories: Category[])=>{
      this.allCategories = categories;
    })
    this.itemService.getAllItems().subscribe((items: Item[])=>{
      this.allItems = items;
      this.searchedItems = items;
    })
  }
  allCategories: Category[] = [];
  allItems: Item[] = [];
  page: number;
  itemsPerPage: number = 10;
  searchedItems: Item[] = [];
  itName: string;
  category: string;
  subcategory: string;
  categoryId: Number;
  categoryObject: Category = new Category();
  isCategoryChanged: boolean = false;
  message: string;


  searchItems() {
    this.page = 1;
    if (!this.itName) {
      this.searchedItems = this.allItems;
    } else {
      this.itemService.searchItemsByName(this.itName).subscribe((items: Item[])=>{
        this.searchedItems = items;
      })
    }

  }

  categoryChanged() {
    console.log(this.allCategories)
    for (let i in this.allCategories) {
      if (this.allCategories[i].idCat == this.categoryId) {
        this.categoryObject = this.allCategories[i];
      }
    }
    this.isCategoryChanged = true;

  }


  addToCategory(item: Item) {
    console.log(this.subcategory);
    this.itemService.addItemToCategoryAndSubcategory(item.idIte, this.categoryObject.idCat, this.categoryObject.name, this.subcategory)
    .subscribe((resp)=>{
      if (resp["message"] == "ok") {
        this.message = "Item added to category and subcategory successfully!";
        this.itemService.getAllItems().subscribe((items: Item[])=>{
          this.allItems = items;
          this.searchedItems = items;
        })
      }
      else if (resp["message"] == "error") this.message = "Item is already in category and subcategory!";
      else this.message = "Error!";
    })

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
