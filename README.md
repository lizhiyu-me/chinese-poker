# Chinese Poker
>This repository primarily focuses on the rule logic of Chinese poker, catering not only to the classic version but also to any customizations you might want to make.


## Installation:

To use this package, run either:
```bash
npm install chinese-poker
```
or
```bash
yarn add chinese-poker
```

**Configure in <code>src/Config.ts</code> without modifying any logic code.**

```typescript
//define poker type

/*
* - metaType
* - minCount
* - increment

* - subTypeData
* - val
*/
export const TypeDefinition: { [type: number]: T_TYPE_DATA } = {
    [E_TYPE.SINGLE]: { metaType: E_META.ONE, count: 1 },
    [E_TYPE.DOUBLE]: { metaType: E_META.TWO, count: 1 },
    [E_TYPE.TRIPLE]: { metaType: E_META.THREE, count: 1 },
    [E_TYPE.SINGLE_ORDER]: { metaType: E_META.ONE, minCount: 5, increment: true },
    [E_TYPE.DOUBLE_ORDER]: { metaType: E_META.TWO, minCount: 3, increment: true },
    [E_TYPE.TRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, increment: true },
    [E_TYPE.TRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, increment: true },
    [E_TYPE.TRIPLE_ORDER_TAKE_ONE]: {
        metaType: E_META.THREE, minCount: 2, increment: true,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_TYPE.TRIPLE_ORDER_TAKE_TWO]: {
        metaType: E_META.THREE, minCount: 2, increment: true,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_TYPE.TRIPLE_TAKE_ONE]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_TYPE.TRIPLE_TAKE_TWO]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_TYPE.QUADRUPLE_TAKE_TWO_SINGLE]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 2 }
    },
    [E_TYPE.QUADRUPLE_TAKE_TWO_DOUBLE]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 2 }
    },
    [E_TYPE.QUADRUPLE]: { metaType: E_META.FOUR, count: 1 },
    [E_TYPE.DOUBLE_JOKER]: { metaType: E_META.ONE, count: 2, val: [FaceSerialsDic[E_FACE.B_JOKER][0], FaceSerialsDic[E_FACE.R_JOKER][0]] }
}
```

### Here's an example of how to use the code:
``` typescript
import * as poker from "chinese-poker";
let ruler = new  poker.Ruler();
let checkRes=  ruler.checkCardType([3,4,5,6,7])
let defeatRes=  ruler.canDefeat([4,5,6,7,8],[3,4,5,6,7],poker.E_TYPE.SINGLE_ORDER)
console.log(checkRes,defeatRes);
```

### To verify the accuracy of the card types, you can utilize [jest](https://jestjs.io/):
- Update <code>src/__tests__/ruler_spec.ts</code>.
- Execute <code>npm run test</code> from the root directory to view the test outcomes.