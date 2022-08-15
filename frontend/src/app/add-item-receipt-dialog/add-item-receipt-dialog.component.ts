import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/services/item.service';
import { ReceiptService } from 'src/services/receipt.service';
import { TableService } from 'src/services/table.service';
import { WarehouseService } from 'src/services/warehouse.service';
import { Item } from '../models/item';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-add-item-receipt-dialog',
  templateUrl: './add-item-receipt-dialog.component.html',
  styleUrls: ['./add-item-receipt-dialog.component.css']
})
export class AddItemReceiptDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddItemReceiptDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private warehouseService: WarehouseService, private itemService: ItemService, private receiptService: ReceiptService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.warehouseService.getWarehouse(this.data.receipt.objectId).subscribe((warehouse: Warehouse)=>{
      this.warehouse = warehouse;
      this.itemsInfo = this.warehouse[0].itemsInfo;
    })
    this.itemService.getAllItems().subscribe((items: Item[])=>{
      this.allItems = items;
    })
  }

  warehouse: Warehouse = new Warehouse();
  itemsInfo;
  itemId: number;
  amount: number;
  isItem: boolean = false;
  taxRate: number;
  price: number;

  addItemToReceipt() {
    this.receiptService.addItemToReceipt(this.data.receipt.idRec, this.itemId, this.selectedItem.itemName, this.price, this.amount, this.taxRate)
      .subscribe(resp=>{
        if (resp["message"] == "ok") {
          let sum = 0;
          for (let i in this.data.receipt.items) {
            sum += (this.data.receipt.items[i].price + this.data.receipt.items[i].price * (this.data.receipt.items[i].pdvPercent / 100))
              * this.data.receipt.items[i].amount;
          }
          sum += (this.price + this.price * (this.taxRate / 100)) * this.amount;
          this.receiptService.updateReceiptTotalValue(this.data.receipt.idRec, sum).subscribe(resp=>{
            if (resp["message"] == "ok") {
                if (this.data.receipt.tableId) {
                  this.tableService.updateOccupationOfTable(this.data.receipt.tableId, true).subscribe(resp=>{
                    if (resp["message"] == "ok") {
                      this.message = "Item added successfully to receipt!";
                      this.dialogRef.close();
                    } else this.message = "Error!";
                  })
                }
                else {
                  this.message = "Item added successfully to receipt!";
                  this.dialogRef.close();
                }


            }
            else this.message = "Error!";
          })

        }
        else this.message = "Error!";
      })

  }

  allItems: Item[] = [];
  selectedItem: Item = new Item();
  message: string;

  changeItem() {
    this.isItem = true;
    this.itemService.getAllItems().subscribe((items: Item[])=>{
      this.allItems = items;
      for (let i in this.allItems) {
        if (this.allItems[i].idIte == this.itemId) {
          this.selectedItem = this.allItems[i];
          break;
        }
      }
      for (let i in this.itemsInfo) {
        if (this.itemsInfo[i].idIte == this.itemId) {
          this.price = this.itemsInfo[i].sellingPrice;
        }
      }
      if (this.data.isPDV) {
        if (this.selectedItem.taxRate == "opsta") this.taxRate = 20;
        else if (this.selectedItem.taxRate == "posebna") this.taxRate = 10;
        else this.taxRate = 0;
      } else this.taxRate = 0;
    })
  }

  onCancel(): void {
    this.dialogRef.close({event:'Cancel'});
  }
}
