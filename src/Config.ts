
import { T_TYPE_DATA, E_META, E_RELATION, E_CARD_FACE } from "./Const";

export const StandardSerialArr = [
    0x03, 0x13, 0x23, 0x33,
    0x04, 0x14, 0x24, 0x34,
    0x05, 0x15, 0x25, 0x35,
    0x06, 0x16, 0x26, 0x36,
    0x07, 0x17, 0x27, 0x37,
    0x08, 0x18, 0x28, 0x38,
    0x09, 0x19, 0x29, 0x39,
    0x0A, 0x1A, 0x2A, 0x3A,
    0x0B, 0x1B, 0x2B, 0x3B,
    0x0C, 0x1C, 0x2C, 0x3C,
    0x0D, 0x1D, 0x2D, 0x3D,
    0x01, 0x11, 0x21, 0x31,
    0x02, 0x12, 0x22, 0x32,
    0x4E, 0x4F
]

export const FaceSerialsDic: { [face in E_CARD_FACE]?: number[] } = {
    [E_CARD_FACE.THREE]: [0x03, 0x13, 0x23, 0x33],
    [E_CARD_FACE.FOUR]: [0x04, 0x14, 0x24, 0x34],
    [E_CARD_FACE.FIVE]: [0x05, 0x15, 0x25, 0x35],
    [E_CARD_FACE.SIX]: [0x06, 0x16, 0x26, 0x36],
    [E_CARD_FACE.SEVEN]: [0x07, 0x17, 0x27, 0x37],
    [E_CARD_FACE.EIGHT]: [0x08, 0x18, 0x28, 0x38],
    [E_CARD_FACE.NINE]: [0x09, 0x19, 0x29, 0x39],
    [E_CARD_FACE.TEN]: [0x0A, 0x1A, 0x2A, 0x3A],
    [E_CARD_FACE.JACK]: [0x0B, 0x1B, 0x2B, 0x3B],
    [E_CARD_FACE.QUEEN]: [0x0C, 0x1C, 0x2C, 0x3C],
    [E_CARD_FACE.KING]: [0x0D, 0x1D, 0x2D, 0x3D],
    [E_CARD_FACE.ACE]: [0x01, 0x11, 0x21, 0x31],
    [E_CARD_FACE.DEUCE]: [0x02, 0x12, 0x22, 0x32],
    [E_CARD_FACE.B_JOKER]: [0x4E],
    [E_CARD_FACE.R_JOKER]: [0x4F],
}

export const ValueDic = {
    [E_CARD_FACE.THREE]: 3,
    [E_CARD_FACE.FOUR]: 4,
    [E_CARD_FACE.FIVE]: 5,
    [E_CARD_FACE.SIX]: 6,
    [E_CARD_FACE.SEVEN]: 7,
    [E_CARD_FACE.EIGHT]: 8,
    [E_CARD_FACE.NINE]: 9,
    [E_CARD_FACE.TEN]: 10,
    [E_CARD_FACE.JACK]: 11,
    [E_CARD_FACE.QUEEN]: 12,
    [E_CARD_FACE.KING]: 13,
    [E_CARD_FACE.ACE]: 14,
    [E_CARD_FACE.DEUCE]: 15,
    [E_CARD_FACE.B_JOKER]: 16,
    [E_CARD_FACE.R_JOKER]: 17
}

export const ValueCountDic = {
    [ValueDic[E_CARD_FACE.THREE]]: FaceSerialsDic[E_CARD_FACE.THREE].length,
    [ValueDic[E_CARD_FACE.FOUR]]: FaceSerialsDic[E_CARD_FACE.FOUR].length,
    [ValueDic[E_CARD_FACE.FIVE]]: FaceSerialsDic[E_CARD_FACE.FIVE].length,
    [ValueDic[E_CARD_FACE.SIX]]: FaceSerialsDic[E_CARD_FACE.SIX].length,
    [ValueDic[E_CARD_FACE.SEVEN]]: FaceSerialsDic[E_CARD_FACE.SEVEN].length,
    [ValueDic[E_CARD_FACE.EIGHT]]: FaceSerialsDic[E_CARD_FACE.EIGHT].length,
    [ValueDic[E_CARD_FACE.NINE]]: FaceSerialsDic[E_CARD_FACE.NINE].length,
    [ValueDic[E_CARD_FACE.TEN]]: FaceSerialsDic[E_CARD_FACE.TEN].length,
    [ValueDic[E_CARD_FACE.JACK]]: FaceSerialsDic[E_CARD_FACE.JACK].length,
    [ValueDic[E_CARD_FACE.QUEEN]]: FaceSerialsDic[E_CARD_FACE.QUEEN].length,
    [ValueDic[E_CARD_FACE.KING]]: FaceSerialsDic[E_CARD_FACE.KING].length,
    [ValueDic[E_CARD_FACE.ACE]]: FaceSerialsDic[E_CARD_FACE.ACE].length,
    [ValueDic[E_CARD_FACE.DEUCE]]: FaceSerialsDic[E_CARD_FACE.DEUCE].length,
    [ValueDic[E_CARD_FACE.B_JOKER]]: FaceSerialsDic[E_CARD_FACE.B_JOKER].length,
    [ValueDic[E_CARD_FACE.R_JOKER]]: FaceSerialsDic[E_CARD_FACE.R_JOKER].length
}

export enum E_CARDTYPE {
    ERROR,
    SINGLE,
    DOUBLE,
    TRIPLE,
    SINGLE_ORDER,
    DOUBLE_ORDER,
    TRIPLE_ORDER,
    THRIPLE_TAKE_ONE,
    THRIPLE_TAKE_TWO,
    THRIPLE_ORDER,
    THRIPLE_ORDER_TAKE_ONE,
    THRIPLE_ORDER_TAKE_TWO,
    QUADRUPLE_TAKE_ONE,
    QUADRUPLE_TAKE_TWO,
    QUADRUPLE,
    DOUBLE_JOKER
}

export enum E_TYPE_LEVEL {
    NONE,
    ONE,
    TWO,
    TOP
}

export const TypeLevelDic: { [level: number]: E_CARDTYPE[] } = {
    [E_TYPE_LEVEL.ONE]: [
        E_CARDTYPE.SINGLE,
        E_CARDTYPE.DOUBLE,
        E_CARDTYPE.TRIPLE,
        E_CARDTYPE.SINGLE_ORDER,
        E_CARDTYPE.DOUBLE_ORDER,
        E_CARDTYPE.TRIPLE_ORDER,
        E_CARDTYPE.THRIPLE_TAKE_ONE,
        E_CARDTYPE.THRIPLE_TAKE_TWO,
        E_CARDTYPE.THRIPLE_ORDER,
        E_CARDTYPE.THRIPLE_ORDER_TAKE_ONE,
        E_CARDTYPE.THRIPLE_ORDER_TAKE_TWO,
        E_CARDTYPE.QUADRUPLE_TAKE_ONE,
        E_CARDTYPE.QUADRUPLE_TAKE_TWO,
    ],
    [E_TYPE_LEVEL.TWO]: [
        E_CARDTYPE.QUADRUPLE
    ],
    [E_TYPE_LEVEL.TOP]: [
        E_CARDTYPE.DOUBLE_JOKER
    ]
}

export const TypeDefinition: { [type: number]: T_TYPE_DATA } = {
    [E_CARDTYPE.SINGLE]: { metaType: E_META.ONE, count: 1 },
    [E_CARDTYPE.DOUBLE]: { metaType: E_META.TWO, count: 1 },
    [E_CARDTYPE.TRIPLE]: { metaType: E_META.THREE, count: 1 },
    [E_CARDTYPE.SINGLE_ORDER]: { metaType: E_META.ONE, minCount: 5, relation: E_RELATION.INCREASE },
    [E_CARDTYPE.DOUBLE_ORDER]: { metaType: E_META.TWO, minCount: 3, relation: E_RELATION.INCREASE },
    [E_CARDTYPE.TRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE },
    [E_CARDTYPE.THRIPLE_ORDER]: { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE },
    [E_CARDTYPE.THRIPLE_ORDER_TAKE_ONE]: {
        metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_CARDTYPE.THRIPLE_ORDER_TAKE_TWO]: {
        metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_CARDTYPE.THRIPLE_TAKE_ONE]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 1 }
    },
    [E_CARDTYPE.THRIPLE_TAKE_TWO]: {
        metaType: E_META.THREE, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 1 }
    },
    [E_CARDTYPE.QUADRUPLE_TAKE_ONE]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.ONE, count: 2 }
    },
    [E_CARDTYPE.QUADRUPLE_TAKE_TWO]: {
        metaType: E_META.FOUR, count: 1,
        subTypeData: { metaType: E_META.TWO, count: 2 }
    },
    [E_CARDTYPE.QUADRUPLE]: { metaType: E_META.FOUR, count: 1 },
    [E_CARDTYPE.DOUBLE_JOKER]: { val: [FaceSerialsDic[E_CARD_FACE.B_JOKER][0], FaceSerialsDic[E_CARD_FACE.R_JOKER][0]] }
}

export const OrderLimitVal: number = ValueDic[E_CARD_FACE.ACE];
export const LimitOrderTypeArr: E_CARDTYPE[] = [
    E_CARDTYPE.SINGLE_ORDER,
    E_CARDTYPE.DOUBLE_ORDER,
    E_CARDTYPE.TRIPLE_ORDER,
    E_CARDTYPE.THRIPLE_ORDER,
    E_CARDTYPE.THRIPLE_ORDER_TAKE_ONE,
    E_CARDTYPE.THRIPLE_ORDER_TAKE_TWO
]