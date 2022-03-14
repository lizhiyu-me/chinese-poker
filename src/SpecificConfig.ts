
import { I_TYPE_DATA, E_META, E_RELATION } from "./Const";
export enum E_CARD_FACE {
    ACE = 1,
    DEUCE,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    B_JOKER,
    R_JOKER
}
/**标准一副牌序列号数组 */
export const standardSerialArr = [
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

export const PCL_FaceSerialDic: { [face in E_CARD_FACE]?: number[] | number } = {
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
    [E_CARD_FACE.B_JOKER]: 0x4E,
    [E_CARD_FACE.R_JOKER]: 0x4F,
}




// enum E_POKER_SUIT {
//     NONE,
//     /**方块*/
//     DIAMONDS,
//     /**梅花 */
//     CLUBS,
//     /**红心 */
//     HEARTS,
//     /**黑桃 */
//     SPADES,
//     JOKER
//     // /**黑Joker */
//     // B_JOKER,
//     // /**红Joker */
//     // R_JOKER
// }

/**游戏中的牌值 */
export var ValueDic = {
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
/**游戏中的牌值对应的数量 */
export let PCL_valueCountDic = {
    [ValueDic[E_CARD_FACE.THREE]]: 4,
    [ValueDic[E_CARD_FACE.FOUR]]: 4,
    [ValueDic[E_CARD_FACE.FIVE]]: 4,
    [ValueDic[E_CARD_FACE.SIX]]: 4,
    [ValueDic[E_CARD_FACE.SEVEN]]: 4,
    [ValueDic[E_CARD_FACE.EIGHT]]: 4,
    [ValueDic[E_CARD_FACE.NINE]]: 4,
    [ValueDic[E_CARD_FACE.TEN]]: 4,
    [ValueDic[E_CARD_FACE.JACK]]: 4,
    [ValueDic[E_CARD_FACE.QUEEN]]: 4,
    [ValueDic[E_CARD_FACE.KING]]: 4,
    [ValueDic[E_CARD_FACE.ACE]]: 4,
    [ValueDic[E_CARD_FACE.DEUCE]]: 4,
    [ValueDic[E_CARD_FACE.B_JOKER]]: 1,
    [ValueDic[E_CARD_FACE.R_JOKER]]: 1
}

/**牌型 */
export enum E_CARDTYPE {
    CT_ERROR,
    CT_SINGLE,
    CT_DOUBLE,
    CT_THREE,
    CT_SINGLE_LINE,
    CT_DOUBLE_LINE,
    CT_THREE_LINE,
    CT_THREE_TAKE_ONE,
    CT_THREE_TAKE_TWO,
    CT_FOUR_TAKE_ONE,
    CT_FOUR_TAKE_TWO,
    CT_BOMB_CARD,
    CT_MISSILE_CARD,
    CT_PLANE_THREE_LINE,
    CT_PLANE_THREE_TAKE_ONE,
    CT_PLANE_THREE_TAKE_TWO
}

/**类型层级 */
export enum E_LEVEL {
    NONE,
    ONE,
    TWO,
    THREE,
    TOP
}
export let TypeLevelDic: { [level: number]: E_CARDTYPE[] } = {
    [E_LEVEL.ONE]: [
        E_CARDTYPE.CT_SINGLE,
        E_CARDTYPE.CT_DOUBLE,
        E_CARDTYPE.CT_THREE,
        E_CARDTYPE.CT_SINGLE_LINE,
        E_CARDTYPE.CT_DOUBLE_LINE,
        E_CARDTYPE.CT_THREE_LINE,
        E_CARDTYPE.CT_THREE_TAKE_ONE,
        E_CARDTYPE.CT_THREE_TAKE_TWO,
        E_CARDTYPE.CT_PLANE_THREE_LINE,
        E_CARDTYPE.CT_PLANE_THREE_TAKE_ONE,
        E_CARDTYPE.CT_PLANE_THREE_TAKE_TWO,
        E_CARDTYPE.CT_FOUR_TAKE_ONE,
        E_CARDTYPE.CT_FOUR_TAKE_TWO,
    ],
    [E_LEVEL.TWO]: [
        E_CARDTYPE.CT_BOMB_CARD
    ],
    [E_LEVEL.TOP]: [
        E_CARDTYPE.CT_MISSILE_CARD
    ]
}

/**
 * 配置规范（限制条件）：
 * - 1.英雄在最前，且英雄元类型唯一,只占第一项,元类型数量最多
 * - 2.设val值项必须全部设置
 * - 3.英雄minCount定义牌型所需英雄个数,随从miCount定义的是单个英雄所带随从的个数
 * - 例外:火箭等指定值的类型,特设val值即可
 * */
export let TypeDefine: { [type: number]: I_TYPE_DATA[] } = {
    [E_CARDTYPE.CT_SINGLE]: [
        { metaType: E_META.ONE, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_DOUBLE]: [
        { metaType: E_META.TWO, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_THREE]: [
        { metaType: E_META.THREE, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_SINGLE_LINE]: [
        { metaType: E_META.ONE, minCount: 5, relation: E_RELATION.INCREASE }
    ],
    [E_CARDTYPE.CT_DOUBLE_LINE]: [
        { metaType: E_META.TWO, minCount: 3, relation: E_RELATION.INCREASE }
    ],
    [E_CARDTYPE.CT_THREE_LINE]: [
        { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE }
    ],
    [E_CARDTYPE.CT_PLANE_THREE_LINE]: [
        { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE }
    ],
    [E_CARDTYPE.CT_PLANE_THREE_TAKE_ONE]: [
        { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE },
        { metaType: E_META.ONE, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_PLANE_THREE_TAKE_TWO]: [
        { metaType: E_META.THREE, minCount: 2, relation: E_RELATION.INCREASE },
        { metaType: E_META.TWO, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_THREE_TAKE_ONE]: [
        { metaType: E_META.THREE, minCount: 1, relation: E_RELATION.NONE },
        { metaType: E_META.ONE, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_THREE_TAKE_TWO]: [
        { metaType: E_META.THREE, minCount: 1, relation: E_RELATION.NONE },
        { metaType: E_META.TWO, minCount: 1, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_FOUR_TAKE_ONE]: [
        { metaType: E_META.FOUR, minCount: 1, relation: E_RELATION.NONE },
        { metaType: E_META.ONE, minCount: 2, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_FOUR_TAKE_TWO]: [
        { metaType: E_META.FOUR, minCount: 1, relation: E_RELATION.NONE },
        { metaType: E_META.TWO, minCount: 2, relation: E_RELATION.NONE }
    ],
    [E_CARDTYPE.CT_BOMB_CARD]: [
        { metaType: E_META.FOUR, minCount: 1, relation: E_RELATION.NONE }
        // { metaType: E_PCL_META.ONE, minCount: 4, relation: E_PCL_RELATION.EQUEAL }
    ],
    [E_CARDTYPE.CT_MISSILE_CARD]: [
        { metaType: E_META.ONE, minCount: 1, relation: E_RELATION.NONE, val: PCL_FaceSerialDic[E_CARD_FACE.B_JOKER] },
        { metaType: E_META.ONE, minCount: 1, relation: E_RELATION.NONE, val: PCL_FaceSerialDic[E_CARD_FACE.R_JOKER] }
    ]
}

/**顺子,连对,飞机等最高限制值 */
export const LineLimitVal: number = ValueDic[E_CARD_FACE.ACE];
/**存在最高值限制的类型 */
export const LimitValTypeArr: E_CARDTYPE[] = [
    E_CARDTYPE.CT_SINGLE_LINE,
    E_CARDTYPE.CT_DOUBLE_LINE,
    E_CARDTYPE.CT_THREE_LINE,
    E_CARDTYPE.CT_PLANE_THREE_LINE,
    E_CARDTYPE.CT_PLANE_THREE_TAKE_ONE,
    E_CARDTYPE.CT_PLANE_THREE_TAKE_TWO
]
