import { ItemCategory } from "./itemCategory";

export class Item {
    // obavezni opsti podaci
    idIte: number;
    itemCipher: string;
    itemName: string;
    unitOfMeasure: string;
    taxRate: string;    // opsta 20%, posebna 10%, nema 0%
    type: string;   // kod ugostitelja hrana/pice/sirovina

    // dopunski podaci
    originCountry: string;
    foreignName: string;
    barCode: string;
    nameOfManufacturer: string;
    customsTariff: number; // u %
    ecoTax: boolean;
    exciseTax: boolean;
    description: string;
    declaration: string;
    category: ItemCategory[];
    image: string;

    // cene i stanje robe
}