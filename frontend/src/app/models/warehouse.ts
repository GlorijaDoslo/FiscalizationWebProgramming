import { ItemData } from "./itemData";

export class Warehouse {
    idWar: number;
    name: string;
    companyId: number;
    itemsInfo: ItemData[];
    departments: Array<string>;
}