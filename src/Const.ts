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
export interface I_TYPE_DATA {
    metaType: E_META,
    minCount: number,
    relation: E_RELATION,
    val?:number|number[]
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