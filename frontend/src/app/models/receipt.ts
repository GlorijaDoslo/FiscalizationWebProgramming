import { ItemForReceipt } from "./itemForReceipt";

export class Receipt {
    idRec: number;
    items: ItemForReceipt[];
    totalValue: number;
    isPDV: boolean;
    paymentMethod: string;
    customerValue: number;
    change: number;
    numLK: string;
    firstname: string;
    lastname: string;
    slipAccount: string;
    ordererId: number;
    dateOfReceipt: string;
    nameOfCompany: string;
    companyId: number;
    isClosed: boolean;
    tableObject: string;
    tableDepartment: string;
    tableId: number;
    objectId: number;
}