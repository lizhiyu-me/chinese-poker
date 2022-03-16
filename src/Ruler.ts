
import { E_CARDTYPE, OrderTopLimitVal, TypeDefinition } from "./Config";
import { T_CHECK_RES, T_TYPE_DATA, T_VALUE_ITEM } from "./Const";
import { MetaProcessor } from "./MetaProcessor";
import { getGameValue, getIsLineLimitType, getOneSetCountOfType, getSortedValueItemArr } from "./SpecificGetFn";
import Utils from "./utils/utils";

export interface T_CHECK_RES_FINAL {
    main: T_CHECK_RES;
    subArr: T_CHECK_RES[];
    type: E_CARDTYPE;
}
export type T_SUBTYPE_RULER = {
    beginIdx: number,
    itemCount: number,
    minCount: number
}
export class Ruler {
    constructor() {
    }
    /**
     * 获取主规尺,按值从小到大排序
     * @param attackterOrderArr e.g.[[6,6],[7,7],[8,8]]
     */
    private getMainRuler(attackterOrderArr: number[][]): { beginIdx: number, len: number, itemCount: number } {
        let _resObj = <{ beginIdx: number, len: number, itemCount: number }>{};

        let _min: number = Math.min(...attackterOrderArr.map((item) => { return getGameValue(item[0]) }));
        let _beginIdx: number = _min - 3;
        let _len: number = attackterOrderArr.length;
        let _itemCount: number = attackterOrderArr[0].length;

        _resObj.beginIdx = _beginIdx + 1;
        _resObj.len = _len;
        _resObj.itemCount = _itemCount;

        return _resObj;
    }

    /**
     * 测量主进攻者并获取迎击傀儡
     * @param ownArr 
     */
    private getMainTypeResArr(ownArr: number[], type: number, ruler: {
        beginIdx: number;
        len: number;
        itemCount: number;
    }): T_CHECK_RES[] {
        let _res: T_CHECK_RES[] = [];
        let _curArr: T_VALUE_ITEM[] = getSortedValueItemArr(ownArr);
        let { beginIdx, len, itemCount } = ruler;

        let _totalCount: number = len * itemCount;
        let _arr2Measure: T_VALUE_ITEM[];
        let _sliceLen: number;
        while (_arr2Measure = _curArr.slice(beginIdx, beginIdx + len),
            _sliceLen = _arr2Measure.length,
            _sliceLen === len) {
            let _arr: number[] = [];
            _arr2Measure.forEach((item) => {
                // let _tempFlag: boolean = true;
                if (len >= 2 && getIsLineLimitType(type) && item.value > OrderTopLimitVal) return;
                // if (!_tempFlag) return;
                if (item.count >= itemCount) {
                    _arr = _arr.concat(item.arr.slice(0, itemCount));
                }
            })

            if (_arr.length === _totalCount) {
                _res.push({
                    arr: _arr
                })
            }
            ++beginIdx;
        }
        return _res;
    }
    private getSubTypeResArr(ownArrExcludeMain: number[], attacktSubTypeRuler: { itemCount: number }, subTypeCount: number, setCount: number): T_CHECK_RES[] {
        let _subTypeCount: number = subTypeCount;
        if (_subTypeCount === 0) return [];
        let _res: T_CHECK_RES[] = [];

        let _curArr: T_VALUE_ITEM[] = getSortedValueItemArr(ownArrExcludeMain);

        let itemCount = attacktSubTypeRuler.itemCount;

        /**按值由小到大排列 */
        let _metaProcessorArr: MetaProcessor[] = (() => {
            let _res = [];
            for (const item of _curArr) {
                let _metaProcessor = new MetaProcessor(item.arr);
                _metaProcessor.setVal(item.value);
                _res.push(_metaProcessor);
            }
            return _res;
        })()

        for (let i = 0; i < _metaProcessorArr.length; i++) {
            const _metaProcessor = _metaProcessorArr[i];
            let _fulfiledItem: number[][] = _metaProcessor.getMeta(itemCount);
            if (_fulfiledItem && _fulfiledItem.length != 0) {
                for (let j = 0, _len = setCount; j < _len; j++) {
                    let _temp = _fulfiledItem[j];
                    if (!_temp) continue;
                    let _arrItem = _temp.slice();
                    _res.push({
                        arr: _arrItem
                    })
                    _fulfiledItem[0].length = 0;
                    _metaProcessor.update(_fulfiledItem["flat"]());
                }
            }
        }
        return _res;
    }

    getMainRulerDIY(beginIdx: number, type: number, totalCount: number): {
        beginIdx: number;
        len: number;
        itemCount: number;
    } {
        let _define = TypeDefinition[type][0];
        let _mainLen: number = totalCount / getOneSetCountOfType(TypeDefinition[type])
        if (_mainLen % 1 != 0 || _mainLen < _define.minCount) return null;

        return {
            itemCount: _define.metaType,
            beginIdx: beginIdx,
            len: _define.minCount >= 2 ? _mainLen : 1
        }
    }

    /**
     * 获取从规尺
     * @param attackterArr 
     * - 仅支持带牌为一种元类型（目前牌型还未出现多种元类型）
     */
    getSubTypeRulerDIY(type: E_CARDTYPE): T_SUBTYPE_RULER {
        let _resObj = {} as T_SUBTYPE_RULER;

        let _define = TypeDefinition[type][1];
        if (!_define) return null;

        _resObj.beginIdx = 0;
        _resObj.itemCount = _define.metaType;
        _resObj.minCount = _define.minCount;
        return _resObj;
    }

    public canDefeat(deffensiveItemArr: number[], attackter: number[], type: number)
    // : { type: E_CARDTYPE, can: boolean }
    {
        /* let _tempRes = this.tipAllLevel(deffensiveItemArr, attackter, type);
        if (_tempRes.length != 0) {
            for (let i = 0; i < _tempRes.length; i++) {
                const _item = _tempRes[i];
                let _count = getTotalCount(_item);
                let _type = _item.type;
                if (_count == deffensiveItemArr.length) return {
                    type: _type,
                    can: true
                }
            }
        }
        return {
            type: null,
            can: false
        }; */
    }

    checkCardType(serialArr: number[]): E_CARDTYPE {
        for (const e in E_CARDTYPE) {
            let _e: E_CARDTYPE = +e;
            if (isNaN(_e) || _e == E_CARDTYPE.ERROR) continue;
            else if (this.isType(serialArr, _e)) return _e;
        }
        return E_CARDTYPE.ERROR;
    }
    private getOneSetCount(def: T_TYPE_DATA): number {
        let _mainTypeCount = def.metaType;
        let _subTypeCount = def.subTypeData ? def.subTypeData.metaType * def.subTypeData.count : 0;
        return _subTypeCount + _mainTypeCount;
    }
    private isCountOK(def: T_TYPE_DATA, serialsTotalCount: number, setCount: number): boolean {
        let _subTypeCount = def.subTypeData ? def.subTypeData.metaType * def.subTypeData.count : 0;
        if (def.minCount) {
            let _minCount = def.minCount * (def.metaType + _subTypeCount);
            if (serialsTotalCount < _minCount) return false;
        } else if (def.count) {
            let _certainCount = def.count * def.metaType+_subTypeCount;
            if (serialsTotalCount != _certainCount) return false;
        }
        if (setCount % 1) return false;
        return true;
    }
    private isType(serialArr: number[], type: E_CARDTYPE): boolean {
        let _def = TypeDefinition[type];
        let _serialsTotalCount = serialArr.length;
        let _oneSetCount = this.getOneSetCount(_def);
        let _setCount = _serialsTotalCount / _oneSetCount;
        if (!this.isCountOK(_def, _serialsTotalCount, _setCount)) return false;

        if (_def.val) {
            return Utils.arraysEqual(serialArr, _def.val);
        } else {
            let _mainItemContainCount = _def.metaType;
            let _hasSubType = !!_def.subTypeData;

            let _mainTypeResArr = this.getMainTypeResArr(serialArr, type, {
                beginIdx: 0,
                len: _setCount,
                itemCount: _mainItemContainCount
            });
            if (_mainTypeResArr.length == 0) return false;
            else if (!_hasSubType) return true;
            else {
                for (let i = 0; i < _mainTypeResArr.length; i++) {
                    const _mainTypeSerialArr = _mainTypeResArr[i];
                    let _serialsExcludeMainType = Utils.removeArrFromArr(serialArr, _mainTypeSerialArr.arr);
                    let _subTypeResArr = this.getSubTypeResArr(_serialsExcludeMainType, {
                        itemCount: _def.subTypeData.metaType
                    }, _def.subTypeData.count, _setCount);
                    if (_subTypeResArr.length == _setCount*_def.subTypeData.count) return true;
                }
                return false;
            }
        }
    }
}
