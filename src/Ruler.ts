
import { E_RELATION, T_TYPE_DATA, T_CHECK_RES, T_VALUE_ITEM } from "./Const";
import { MetaProcessor } from "./MetaProcessor";
import { E_CARDTYPE, OrderLimitVal, TypeDefinition } from "./Config";
import { getSortedValueItemArr, getGameValue, getIsLineLimitType, getOneSetCountOfType } from "./SpecificGetFn";

export interface T_CHECK_RES_FINAL {
    hero: T_CHECK_RES;
    accompanyArr: T_CHECK_RES[];
    type: E_CARDTYPE;
}
export type T_ACCOMPANY_RULER = {
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
    private getHeroRuler(attackterOrderArr: number[][]): { beginIdx: number, len: number, itemCount: number } {
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
    private getHero(ownArr: number[], type: number, ruler: {
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
                let _tempFlag: boolean = true;
                if (len >= 2 && getIsLineLimitType(type)) _tempFlag = item.value <= OrderLimitVal;
                if (!_tempFlag) return;
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
    /**
     * 获取迎击傀儡元类型，未进行数量匹配组合(获取相同元类型，未进行大小比较)
     * @param ownArr 
     * @param attacktAccompanyRuler 
     */
    private getAccompany(ownArrExcludeHero: number[], attacktAccompanyRuler: T_ACCOMPANY_RULER, accompanyCount: number, setCount: number)
        : T_CHECK_RES[] {
        let _accompanyCount: number = accompanyCount;
        if (_accompanyCount === 0) return [];
        let _res: T_CHECK_RES[] = [];

        let _curArr: T_VALUE_ITEM[] = getSortedValueItemArr(ownArrExcludeHero);

        let itemCount = attacktAccompanyRuler.itemCount;

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

    /**
     * 获取类型规尺
     * @param definition 
     * @param setCount 套数
     */
    private getTypeRuler(definition: T_TYPE_DATA[]): { count: number, valRelation: E_RELATION }[] {
        let _res: { count: number, valRelation: E_RELATION }[] = [];
        for (let j = 0; j < definition.length; j++) {
            const _typeDefinition = definition[j];
            let _item = <{ count: number, valRelation: E_RELATION }>{};
            _item.count = _typeDefinition.metaType;
            _item.valRelation = _typeDefinition.relation;
            _res.push(_item);
        }
        return _res;
    }

    /**获取主牌牌值 */
    private getHeroValArr(hero: T_CHECK_RES): number[] {
        let _res = [];
        let _heroOriginArr = hero.arr;
        let _len = _heroOriginArr.length;
        for (let i = 0; i < _len; i++) {
            const _heroSerial = _heroOriginArr[i];
            if (_heroSerial != null) {
                let _val = getGameValue(_heroSerial);
                if (_res.indexOf(_val) == -1) _res.push(_val);
            }
        }
        return _res;
    }

    getHeroRulerDIY(beginIdx: number, type: number, totalCount: number): {
        beginIdx: number;
        len: number;
        itemCount: number;
    } {
        let _define = TypeDefinition[type][0];
        let _heroLen: number = totalCount / getOneSetCountOfType(TypeDefinition[type])
        if (_heroLen % 1 != 0 || _heroLen < _define.minCount) return null;

        return {
            itemCount: _define.metaType,
            beginIdx: beginIdx,
            len: _define.minCount >= 2 ? _heroLen : 1
        }
    }

    /**
     * 获取从规尺
     * @param attackterArr 
     * - 仅支持带牌为一种元类型（目前牌型还未出现多种元类型）
     */
    getAccompanyRulerDIY(type: E_CARDTYPE): T_ACCOMPANY_RULER {
        let _resObj = {} as T_ACCOMPANY_RULER;

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

    checkCardType(cards: number[]): E_CARDTYPE {
        let _types = Object.keys(E_CARDTYPE);
        for (let i = 0; i < _types.length; i++) {
            const _type = _types[i];
            if (!isNaN(parseInt(_type)) && +_type != E_CARDTYPE.ERROR) {
                let _isType = this.isType(cards, +_type);
                // if (_isType) return +_type;
            }
        }
        return null;
    }

    public isType(arr: number[], type: E_CARDTYPE)
    // : boolean
     {
        // let _heroRuler = this.getHeroRulerDIY(0, type, arr.length);
        // let _accompanyRuler = this.getAccompanyRulerDIY(type);
        // let _res = this.tipSameLevel(arr, type, _heroRuler, _accompanyRuler);
        // return _res.length != 0;
    }
}
