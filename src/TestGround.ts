import { E_CARDTYPE } from "./Config";
import { E_META } from "./Const";
import { Ruler } from "./Ruler";


var ruler = new Ruler();
let _res = ruler.isType([0x4e, 0x4f], E_CARDTYPE.DOUBLE);
_res = ruler.isType([0x4e, 0x4f], E_CARDTYPE.DOUBLE_JOKER);
_res = ruler.isType([0x03, 0x03, 0x03, 0x04, 0x04, 0x04], E_CARDTYPE.TRIPLE_ORDER);
_res = ruler.isType([0x03, 0x03, 0x03, 0x04, 0x04, 0x04, 0x4e, 0x4f], E_CARDTYPE.TRIPLE_ORDER_TAKE_ONE);
_res = ruler.isType([0x02, 0x02], E_CARDTYPE.DOUBLE);
_res = ruler.isType([0x4e], E_CARDTYPE.SINGLE);
_res = ruler.isType([0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b], E_CARDTYPE.SINGLE_ORDER);
console.log(_res);
