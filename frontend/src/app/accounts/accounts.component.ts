import { Component, OnInit } from '@angular/core';
import { ReceiptService } from 'src/services/receipt.service';
import { Receipt } from '../models/receipt';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.page = localStorage.getItem("returnPage");
    this.numLK = localStorage.getItem("numLK");
    this.isShowDetails = false;
    this.receiptService.getAllReceiptsWithId(this.numLK).subscribe((receipts: Receipt[])=>{
      this.allReceipts = receipts;
      this.monthReceipts = [];
      let todayDate = new Date();
      for (let i in this.allReceipts) {
        let str = JSON.stringify(this.allReceipts[i].dateOfReceipt);
        let d = new Date(str);
        if (d.getMonth() == todayDate.getMonth() && d.getFullYear() == todayDate.getFullYear()) this.monthReceipts.push(this.allReceipts[i]);
      }

      for (let i in this.monthReceipts) {
        let sum = this.monthReceipts[i].totalValue;
        let str = JSON.stringify(this.monthReceipts[i].dateOfReceipt);
        let d = new Date(str);
        
        for (let j = 0; j < this.monthReceipts.length; j++) {
          if (this.monthReceipts[i] == this.monthReceipts[j]) continue;
          let str2 = JSON.stringify(this.monthReceipts[j].dateOfReceipt);
          if (str == str2) {
            sum += this.monthReceipts[j].totalValue;
          }
        }
        this.fullMonthReceipts.push({dateOfReceipt: d, totalValue: sum});
      }
      const sortedAsc = this.fullMonthReceipts.sort(
        (objA, objB) => objA.dateOfReceipt.getTime() - objB.dateOfReceipt.getTime(),
      );
      this.single = sortedAsc.map(rec => ({ name: rec.dateOfReceipt, value: rec.totalValue }));



      this.monthReceipts = [];
      this.fullMonthReceipts = [];
      let dates = this.last12Month();
      for (let i in this.allReceipts) {
        let str = JSON.stringify(this.allReceipts[i].dateOfReceipt);
        let d = new Date(str);
        let yes = false;
        for (let j in dates) {
          let str = JSON.stringify(dates[j]);
          let dat = new Date(str);
          if (dat.getMonth() == d.getMonth() && dat.getFullYear() <= d.getFullYear()) {
            yes = true;
            break;
          }
        }
          if (yes) this.monthReceipts.push(this.allReceipts[i]);
      }

      for (let i in this.monthReceipts) {
        let sum = this.monthReceipts[i].totalValue;
        let str = JSON.stringify(this.monthReceipts[i].dateOfReceipt);
        let d = new Date(str);
        let skip = false;
        for (let z in this.fullMonthReceipts) {
          if (this.fullMonthReceipts[z].dateOfReceipt.getMonth() == d.getMonth()) {
            skip = true;
            break;
          }
        }
        if (!skip) {
          for (let j = 0; j < this.monthReceipts.length; j++) {
            if (this.monthReceipts[i] == this.monthReceipts[j]) continue;
            let str2 = JSON.stringify(this.monthReceipts[j].dateOfReceipt);
            let d2 = new Date(str2);
  
            if (d.getMonth() == d2.getMonth()) {
              sum += this.monthReceipts[j].totalValue;
            }
          }
          this.fullMonthReceipts.push({dateOfReceipt: d, totalValue: sum});
        }
        
      }

      const sortedAsc1 = this.fullMonthReceipts.sort(
        (objA, objB) => objA.dateOfReceipt.getTime() - objB.dateOfReceipt.getTime(),
      );

      this.single1 = sortedAsc1.map(rec => ({ name: this.getNameOfMonth(rec.dateOfReceipt), value: rec.totalValue }));
    })

  }

  getNameOfMonth(i) {
    if (i.getMonth() == 0) return "January";
    else if (i.getMonth() == 1) return "February";
    else if (i.getMonth() == 2) return "March";
    else if (i.getMonth() == 3) return "April";
    else if (i.getMonth() == 4) return "May";
    else if (i.getMonth() == 5) return "Jun";
    else if (i.getMonth() == 6) return "July";
    else if (i.getMonth() == 7) return "August";
    else if (i.getMonth() == 8) return "September";
    else if (i.getMonth() == 9) return "October";
    else if (i.getMonth() == 10) return "November";
    else if (i.getMonth() == 11) return "December";
    return "January";
  }

  padMonth(month){
    if(month < 10){
        return '0' + month;
    } else {
        return month;
    }
}

  last12Month() {
    var dates = [];
        let d = new Date(),
        y = d.getFullYear(),
        m = d.getMonth();

    if(m === 11) {
        for(var i = 1; i < 13; i++) {
 
            dates.push(y + "-" + this.padMonth(i) + "-01");
        }
    } else {
        for(var i = m + 1; i < m + 13; i++) {
            if((i % 12) > m) {
                dates.push( (y - 1) + "-" +  this.padMonth(i + 1) + "-01" );
            } else {
                dates.push( y + "-" + this.padMonth((i % 12) + 1) + "-01" );
            }
        }
    }
 
    return dates;
}

  page: string;
  numLK: string;
  allReceipts: Receipt[] = [];
  monthReceipts: Receipt[] = [];
  fullMonthReceipts = [];
  isShowDetails: boolean;
  selectedReceipt: Receipt = new Receipt();

  showDetails(i: Receipt) {
    this.isShowDetails = true;
    this.selectedReceipt = i;
  }
  single: any[];
  single1: any[];
  multi: any[];

  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Total Value';

  // colorScheme = 
  //   ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // ;

  onSelect(event) {
    console.log(event);
  }

}
