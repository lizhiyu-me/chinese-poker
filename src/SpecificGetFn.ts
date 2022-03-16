
import { T_CHECK_RES_FINAL } from './Ruler';
import { T_TYPE_DATA, T_CHECK_RES, E_FACE, T_VALUE_ITEM } from "./Const";
import { ValueCountDic, ValueDic, TypeLevelDic, E_TYPE_LEVEL, E_CARDTYPE, LimitOrderTypeArr, StandardSerialArr } from "./Config";

/**获取游戏中计算用的牌值(与牌面显示有差别 e.g. 牌面值为2,游戏值为15) */
export function getGameValue(serialNum: number): number {
    let _faceVal: E_FACE = getFaceValue(serialNum);
    return ValueDic[_faceVal];
}

/**获取某个值的默认序列号 */
export function getDefaultSerialByVal(val: number): number {
    let _val_serialNumArr_Dic = getDicFromStandardArr()();
    let _valSerialNumArr = _val_serialNumArr_Dic[val];
    return _valSerialNumArr[0];
}

/**获取牌面值 */
export function getFaceValue(serialNum: number): number {
    return serialNum % 0x10;
}

/**获取当前valDic */
export function getCurValueDic(arr: number[]): { [val: number]: number[] } {
    let _valueDic: { [val: number]: number[] } = {};
    arr.forEach((num) => {
        let _val = getGameValue(num);
        let _valItem: number[] = _valueDic[_val];
        if (!_valItem) {
            _valItem = _valueDic[_val] = [];
        }
        _valItem.push(num);
    })
    return _valueDic;
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
    return TypeLevelDic[E_TYPE_LEVEL.TOP].indexOf(type) != -1;
}

export function getSortedValueItemArr(arr: number[]): T_VALUE_ITEM[] {
    let _resArr: T_VALUE_ITEM[] = [];
    let _valObj = getCurValueDic(arr);
    let _valArr = getSortedValArr();
    for (let val of _valArr) {
        let _item: T_VALUE_ITEM = {
            value: +val,
            count: ValueCountDic[val],
            arr: _valObj[val] ? _valObj[val] : []
        }
        _resArr.push(_item);
    }
    return _resArr;
}

export function getIsLineLimitType(type: E_CARDTYPE): boolean {
    return LimitOrderTypeArr.indexOf(type) != -1;
}

/**Get type one set count, e.g. triple order take one: 3+1; double order: 2; quadruple take two: 4+2*/
export function getOneSetCountOfType(typeDefinition: T_TYPE_DATA): number {
    let _res: number = typeDefinition.metaType;
    if (typeDefinition.subTypeData) {
        _res += typeDefinition.subTypeData.count * typeDefinition.subTypeData.metaType;
    }
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
export function getDicFromStandardArr() {
    let _standardSerialDic: { [val: number]: number[] };
    return () => {
        _standardSerialDic = getCurValueDic(StandardSerialArr)
        return _standardSerialDic;
    }
}

/**获取更大的炸弹 */
export function getUpperBomb(_bombLevelRes: T_CHECK_RES_FINAL[], attackter: number[]): T_CHECK_RES_FINAL[] {
    let _res = [];
    let _attackterVal = getGameValue(attackter[0]);
    for (let i = 0; i < _bombLevelRes.length; i++) {
        const _resItem = _bombLevelRes[i];
        let _val = getGameValue(_resItem.main.arr[0]);
        if (_attackterVal < _val) _res.push(_resItem);
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
