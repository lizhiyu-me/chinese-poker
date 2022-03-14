import { PokerCalculator } from "./Ruler";
import { E_CARDTYPE } from "./SpecificConfig";


var ruler = new PokerCalculator();
let _res = ruler.checkCardType([0x4e,0x4f]);
console.log(_res);
