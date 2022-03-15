export type T_CHECK_RES = {
    arr: number[];
}
export enum E_META {
    NONE,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
}
export enum E_RELATION {
    NONE,
    EQUAL,
    INCREASE,
    DECREASE,
}
export type T_TYPE_DATA = {
    metaType?: E_META,
    minCount?: number,
    count?: number,
    relation?: E_RELATION,
    val?: number[],
    subTypeData?: { metaType: E_META, count: number }
}
export type T_VALUE_ITEM = {
    value:number,
    count:number,
    arr:number[]
}

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

export enum E_POKER_SUIT {
    NONE,
    /**方块*/
    DIAMONDS,
    /**梅花 */
    CLUBS,
    /**红心 */
    HEARTS,
    /**黑桃 */
    SPADES,
    /**黑Joker */
    B_JOKER,
    /**红Joker */
    R_JOKER
}