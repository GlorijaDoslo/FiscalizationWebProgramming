import { ItemList } from "./itemList";
import { Orderer } from "./orderer";


export class User {
    idCom: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    type: number;
    phone: string;
    numLK: string;
    email: string;
    comname: string;
    address: string;
    pib: string;
    comnumber: number;
    isAccepted: number;
    isActivated: boolean;
    isFirstLogin: boolean;
    category: string;
    activityCipher: Array<string>;  // keeps cipher field of Cipher
    isPDV: boolean;
    numOfAccounts: number;  // default: 1
    numOfWarehouses: number; // default: 1
    numOfRegisters: number; // default: 1
    orderers: Orderer[];
    items: ItemList[];
    image: string;

}