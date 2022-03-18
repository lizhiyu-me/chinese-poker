import { E_TYPE } from "../Config";
import {Ruler} from "../Ruler";

var ruler = new Ruler();

describe('type-check', () => {
    it('DOUBLE_JOKER', () => {
        expect(ruler.checkCardType([0x4e, 0x4f])).toBe(E_TYPE.DOUBLE_JOKER);
    })
    it('QUADRUPLE', () => {
        expect(ruler.checkCardType([0x02, 0x02, 0x02, 0x02])).toBe(E_TYPE.QUADRUPLE);
    })
    it('SINGLE', () => {
        expect(ruler.checkCardType([0x02])).toBe(E_TYPE.SINGLE);
    })
    it('QUADRUPLE_TAKE_TWO_DOUBLE', () => {
        expect(
            ruler.checkCardType([0x03, 0x03, 0x03, 0x03, 0x04, 0x04, 0x05, 0x05])
        ).toBe(E_TYPE.QUADRUPLE_TAKE_TWO_DOUBLE);
    });
    it('QUADRUPLE_TAKE_TWO_SINGLE', () => {
        expect(
            ruler.checkCardType([0x03, 0x03, 0x03, 0x03, 0x04, 0x05])
        ).toBe(E_TYPE.QUADRUPLE_TAKE_TWO_SINGLE);
    });
})

describe('can-defeat', () => {
    it('DOUBLE_JOKER vs SINGLE', () => {
        expect(ruler.canDefeat([0x4e, 0x4f], [0x01], E_TYPE.SINGLE).can).toBe(true);
    })
})
