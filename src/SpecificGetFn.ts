
import { T_PCL_CHECK_RES_FINAL } from './Ruler';
import { I_TYPE_DATA, T_CHECK_RES } from "./Const";
import { E_CARD_FACE, PCL_valueCountDic, ValueDic, TypeLevelDic, E_LEVEL, E_CARDTYPE, LimitValTypeArr, standardSerialArr } from "./SpecificConfig";

/**获取游戏中计算用的牌值(与牌面显示有差别 e.g. 牌面值为2,游戏值为15) */
export function getGameValue(serialNum: number): number {
    let _faceVal: E_CARD_FACE = getFaceValue(serialNum);
    return ValueDic[_faceVal];
}

/**获取某个值的默认序列号 */
export function getDefaultSerialByVal(val: number): number {
    let _val_serialNumArr_Dic = getPokerDicFromStandardPokerArr()();
    let _valSerialNumArr = _val_serialNumArr_Dic[val];
    return _valSerialNumArr[0];
}

/**获取牌面值 */
export function getFaceValue(serialNum: number): number {
    return serialNum % 0x10;
}

/**获取当前valDic */
export function getCurValueDic(arr: number[]): { [val: number]: number[] } {
    let _PCL_valueDic: { [val: number]: number[] } = {};
    arr.forEach((num) => {
        let _val = getGameValue(num);
        let _valItem: number[] = _PCL_valueDic[_val];
        if (!_valItem) {
            _valItem = _PCL_valueDic[_val] = [];
        }
        _valItem.push(num);
    })
    return _PCL_valueDic;
}

export function getSortedValArr(): number[] {
    let _arr: number[] = [];
    for (const val in ValueDic) {
        if (Object.prototype.hasOwnProperty.call(ValueDic, val)) {
            const _gameVal = ValueDic[val];
            _arr.push(_gameVal);
        }
    }
    return _arr.sort((a, b) => { return a - b });
}
export function getIsInTopLevel(type: E_CARDTYPE): boolean {
    return TypeLevelDic[E_LEVEL.TOP].indexOf(type) != -1;
}


export function getValItemVal(itemArr: number[]) {
    return itemArr["d_val"];
}
export function getValItemLimitCount(itemArr: number[]) {
    return itemArr["d_cnt"];
}

export function getCurArr_SortByVal(arr: number[]): number[][] {
    let _resArr: number[][] = [];

    let _valObj = getCurValueDic(arr);
    let _valArr = getSortedValArr();

    for (let val of _valArr) {
        let _curValItem = _valObj[val] ? _valObj[val] : [];
        _curValItem["d_val"] = +val;
        _curValItem["d_cnt"] = PCL_valueCountDic[val];

        _resArr.push(_curValItem);
    }

    return _resArr;
}

export function getIsLineLimitType(type: E_CARDTYPE): boolean {
    return LimitValTypeArr.indexOf(type) != -1;
}

/**获取类型定义 单套 数量 eg. 飞机带单 3+1 连对 2 四带两张 4+2*/
export function getOneSetCountOfType(_typeDefinition: I_TYPE_DATA[]): number {
    let _res: number = 0;
    _typeDefinition.forEach((element, idx) => {
        //英雄
        if (idx == 0) {
            _res += element.metaType;
        }
        //随从
        else {
            _res += element.metaType * element.minCount;
        }
    });
    return _res;
}
export function getTotalCount(data: {
    hero: T_CHECK_RES;
    accompanyArr: T_CHECK_RES[];
}) {
    let _cnt: number = 0;
    _cnt += data.hero.arr.length;
    if (data.accompanyArr == null) return _cnt;
    for (let i = 0; i < data.accompanyArr.length; i++) {
        _cnt += data.accompanyArr[i].arr.length;
    }
    return _cnt;
}

/**根据牌值从标准牌库获取牌序列号数组 */
export function getPokerDicFromStandardPokerArr() {
    let _standardPokerDic: { [val: number]: number[] };
    return () => {
        _standardPokerDic = getCurValueDic(standardSerialArr)
        return _standardPokerDic;
    }
}

/**获取更大的炸弹 */
export function getUpperBomb(_bombLevelRes: T_PCL_CHECK_RES_FINAL[], attackter: number[]): T_PCL_CHECK_RES_FINAL[] {
    let _res = [];
    let _attackterWeightVal = getGameValue(attackter[0]);
    for (let i = 0; i < _bombLevelRes.length; i++) {
        const _resItem = _bombLevelRes[i];
        let _weightVal = getGameValue(_resItem.hero.arr[0]);
        if (_attackterWeightVal < _weightVal) _res.push(_resItem);
    }
    return _res;
};

export function getAllCombination(itemLen, totalArr, startIdx) {
    let _allCombination = [];

    const result = [];
    result.length = itemLen;

    function combine(input, len, start) {
        if (len === 0) {
            _allCombination.push(result.slice());
            return;
        }
        for (let i = start; i <= input.length - len; i++) {
            result[result.length - len] = input[i];
            combine(input, len - 1, i + 1);
        }
    }

    const array = totalArr;
    combine(array, result.length, startIdx);

    return _allCombination;
}
