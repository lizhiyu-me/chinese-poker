/**masterValArr值为null则为癞子本身牌值*/
export type T_PCL_CHECK_RES = {
    arr: number[];
}
export enum E_PCL_META {
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
export enum E_PCL_RELATION {
    NONE,
    EQUEAL,
    INCREASE,
    DECREASE,
}
export interface I_PCL_TYPE_DATA {
    metaType: E_PCL_META,
    minCount: number,
    relation: E_PCL_RELATION,
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