
import { E_PCL_RELATION, I_PCL_TYPE_DATA, T_PCL_CHECK_RES } from "./Const";
import { PCLMetaProcessor } from "./MetaProcessor";
import { getAllCombination, getCurArr_SortByVal, getGameValue, getIsInTopLevel, getIsLineLimitType, getOneSetCountOfType, getTotalCount, getUpperBomb, getValItemVal } from "./PCLSpecificGetFn";
import { E_PCL_CARDTYPE, E_PCL_LEVEL, PCL_lineLimitVal, PCL_typeDefine, PCL_typeLevelDic } from "./SpecificConfig";

export interface T_PCL_CHECK_RES_FINAL {
    hero: T_PCL_CHECK_RES;
    accompanyArr: T_PCL_CHECK_RES[];
    type: E_PCL_CARDTYPE;
}

export type T_MASTER_DATA = {
    sky: number[],
    earth: number[]
}
export type T_ACCOMPANY_RULER = {
    beginIdx: number,
    itemCount: number,
    minCount: number
}
export class PCLPokerCalculator {
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
     * 获取从规尺
     * @param attackterArr 
     * - 仅支持带牌为一种元类型（目前牌型还未出现多种元类型）
     */
    /* private getAccompanyRuler(attackterArr: number[][]): T_ACCOMPANY_RULER {
        let _resObj = <T_ACCOMPANY_RULER>{};
        if (attackterArr.length == 0) return null;
        let _itemCount: number = attackterArr[0].length;

        _resObj.beginIdx = 0;
        _resObj.itemCount = _itemCount;
        _resObj.minCount = attackterArr.length;

        return _resObj;
    } */
    /**
     * 获取从规尺
     * @param attackterArr 
     * - 仅支持带牌为一种元类型（目前牌型还未出现多种元类型）
     */
    getAccompanyRulerDIY(type: E_PCL_CARDTYPE): T_ACCOMPANY_RULER {
        let _resObj = {} as T_ACCOMPANY_RULER;

        let _define = PCL_typeDefine[type][1];
        if (!_define) return null;

        _resObj.beginIdx = 0;
        _resObj.itemCount = _define.metaType;
        _resObj.minCount = _define.minCount;
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
    }): T_PCL_CHECK_RES[] {
        let _res: T_PCL_CHECK_RES[] = [];
        let _curArr: number[][] = getCurArr_SortByVal(ownArr);
        let { beginIdx, len, itemCount } = ruler;

        let _totalCount: number = len * itemCount;
        let _arr2Measure: number[][];
        let _sliceLen: number;
        while (_arr2Measure = _curArr.slice(beginIdx, beginIdx + len),
            _sliceLen = _arr2Measure.length,
            _sliceLen === len) {
            let _arr: number[] = [];
            _arr2Measure.forEach((itemArr) => {
                let _tempFlag: boolean = true;
                if (len >= 2 && getIsLineLimitType(type)) _tempFlag = getValItemVal(itemArr) <= PCL_lineLimitVal;
                if (!_tempFlag) return;
                if (itemArr.length >= itemCount) {
                    _arr = _arr.concat(itemArr.slice(0, itemCount));
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
        : T_PCL_CHECK_RES[] {
        let _accompanyCount: number = accompanyCount;
        if (_accompanyCount === 0) return [];
        let _res: T_PCL_CHECK_RES[] = [];

        let _curArr: number[][] = getCurArr_SortByVal(ownArrExcludeHero);

        let itemCount = attacktAccompanyRuler.itemCount;

        /**按值由小到大排列 */
        let _metaProcessorArr: PCLMetaProcessor[] = (() => {
            let _res = [];
            for (const item of _curArr) {
                let _metaProcessor = new PCLMetaProcessor(item);
                _metaProcessor.setVal(getValItemVal(item));
                _res.push(_metaProcessor);
            }
            return _res;
        })()

        for (let i = 0; i < _metaProcessorArr.length; i++) {

            const _metaProcessor = _metaProcessorArr[i];

            let _nullFlag: boolean = true;
            for (let k = itemCount; k > 0; k--) {
                let _fulfiledItem: number[][] = _metaProcessor.getMeta(k);
                if (_fulfiledItem && _fulfiledItem.length != 0) {
                    _nullFlag = false;
                    // for (let j = 0, _len = _fulfiledItem.length; j < _len; j++) {
                    for (let j = 0, _len = setCount; j < _len; j++) {
                        let _temp = _fulfiledItem[j];
                        if (!_temp) continue;
                        let _arrItem = _temp.slice();
                        let _lackCount: number = itemCount - k;
                        let _isOrigin: boolean = _lackCount == 0;
                        _arrItem = _arrItem.concat(new Array(_lackCount));
                        let _masterIdxArr: number[] = _isOrigin ? [] : (() => {
                            let _res: number[] = [];
                            let _count = itemCount - _lackCount;
                            for (let ii = 0; ii < _lackCount; ii++) {
                                _res.push(_count++);
                            }
                            return _res;
                        })();
                        //带牌一个值只提示一次
                        _res.push({
                            arr: _arrItem
                        })
                        _fulfiledItem[0].length = 0;
                        _metaProcessor.update(_fulfiledItem["flat"]());
                    }
                }
            }

            /**该值元素数量为0,用master填满 */
            if (_nullFlag) {
                _res.push({
                    arr: new Array(itemCount)
                })
            }
        }
        return _res;
    }

    /**
     * 分离英雄与随从(根据类型)
     * @param arr 
     */
    separateAccompanyAndHero(arr: number[], type: number): { hero: number[][], accompany: number[][] } {
        if (arr.length == 0) return { hero: [], accompany: [] };
        let _valArr = getCurArr_SortByVal(arr);
        let _typeDefinition = PCL_typeDefine[type];

        let _heroArr: number[][] = [];
        let _accompanyArr: number[][] = [];

        let _oneSetCount: number = getOneSetCountOfType(_typeDefinition);
        let _setCount: number = arr.length / _oneSetCount;

        /**按数量由大到小排列(数量较多的为主英雄,较少的为随从,单位英雄数量>单位随从数量)*/
        let _typeRulerArr = this.getTypeRuler(_typeDefinition, _setCount);

        let _beginIdx: number = 0;
        let _lenDic = {};
        let _lenDicKeyMax: number = 0;
        //是否可继续查找
        let _flag: boolean = false;
        while (!_flag) {
            /**按值由小到大排列 */
            let _metaProcessorArr: PCLMetaProcessor[] = (() => {
                let _res = [];
                for (const item of _valArr) {
                    _res.push(new PCLMetaProcessor(item));
                }
                return _res;
            })()

            _lenDic = {};
            _lenDicKeyMax = 0;
            let _condition: number = 0;
            for (let i = 0, len = _typeRulerArr.length; i < len; i++) {
                const _rulerItem = _typeRulerArr[i];

                let j: number;
                //起点递增
                if (i == 0) j = _beginIdx;
                else j = 0;
                for (; j < _metaProcessorArr.length; j++) {
                    const _metaProcessor = _metaProcessorArr[j];
                    let _metaProcessor_countValue: number[][] = _metaProcessor.getMeta(_rulerItem.count);
                    if (_metaProcessor_countValue.length != 0) {
                        if (_rulerItem.valRelation == E_PCL_RELATION.NONE) {
                            if (!_lenDic[_rulerItem.count]) {
                                _lenDic[_rulerItem.count] = [];
                            }
                            _lenDic[_rulerItem.count].push(_metaProcessor_countValue[0]);
                            if (_lenDicKeyMax == 0) {
                                _lenDicKeyMax = _rulerItem.count;
                            } else if (_rulerItem.count > _lenDicKeyMax) {
                                _lenDicKeyMax = _rulerItem.count;
                            }
                            _metaProcessor_countValue.shift()
                            _metaProcessor.update(_metaProcessor_countValue["flat"]());
                            _condition++;
                            break;
                        } else if (_rulerItem.valRelation == E_PCL_RELATION.INCREASE) {
                            if (!_lenDic[_rulerItem.count]) {
                                _lenDic[_rulerItem.count] = [];
                                _lenDic[_rulerItem.count].push(_metaProcessor_countValue[0]);
                                if (_lenDicKeyMax == 0) {
                                    _lenDicKeyMax = _rulerItem.count;
                                } else if (_rulerItem.count > _lenDicKeyMax) {
                                    _lenDicKeyMax = _rulerItem.count;
                                }
                                _metaProcessor_countValue.shift()
                                _metaProcessor.update(_metaProcessor_countValue["flat"]());
                                _condition++;

                            } else {
                                let _lenDicItemLen = _lenDic[_rulerItem.count].length;
                                let _preVal: number = getGameValue(_lenDic[_rulerItem.count][_lenDicItemLen - 1][0]);
                                let _curVal: number = getGameValue(_metaProcessor_countValue[0][0]);
                                if (_curVal === _preVal + 1) {
                                    _lenDic[_rulerItem.count].push(_metaProcessor_countValue[0]);
                                    if (_lenDicKeyMax == 0) {
                                        _lenDicKeyMax = _rulerItem.count;
                                    } else if (_rulerItem.count > _lenDicKeyMax) {
                                        _lenDicKeyMax = _rulerItem.count;
                                    }
                                    _metaProcessor_countValue.shift()
                                    _metaProcessor.update(_metaProcessor_countValue["flat"]());
                                    _condition++;
                                }
                            }

                        }
                        // else if(_rulerItem.valRelation == E_PCL_RELATION.EQUEAL){

                        // }
                    }
                }
                if (_condition === len) {
                    _flag = true;

                    for (const len in _lenDic) {
                        if (Object.prototype.hasOwnProperty.call(_lenDic, len)) {
                            const element = _lenDic[len];
                            if (+len === _lenDicKeyMax) {
                                _heroArr = element;
                            } else {
                                _accompanyArr = _accompanyArr.concat(element);
                            }
                        }
                    }
                    return { hero: _heroArr, accompany: _accompanyArr }
                }
            }

            ++_beginIdx;
            if (_beginIdx === _metaProcessorArr.length) _flag = true;
        }
        return { hero: _heroArr, accompany: _accompanyArr }
    }

    /**
     * 获取类型规尺
     * @param definition 
     * @param setCount 套数
     */
    private getTypeRuler(definition: I_PCL_TYPE_DATA[], setCount: number): { count: number, valRelation: E_PCL_RELATION }[] {
        let _res: { count: number, valRelation: E_PCL_RELATION }[] = [];
        for (let j = 0; j < definition.length; j++) {
            const _typeDefinition = definition[j];
            for (let i = 0; i < setCount; i++) {
                let _item = <{ count: number, valRelation: E_PCL_RELATION }>{};
                _item.count = _typeDefinition.metaType;
                _item.valRelation = _typeDefinition.relation;
                _res.push(_item);
            }
        }
        return _res;
    }

    /**带牌组合,基于值 */
    /*  private getAccompanyCombinationRes_BaseVal(heroAndAccom: {
         hero: T_PCL_CHECK_RES,
         accompanyArr: T_PCL_CHECK_RES[]
     }, accompanyCount: number): T_PCL_CHECK_RES[][] {
         let _resAccompArrArr: T_PCL_CHECK_RES[][] = [];
         let _accomArr_raw = heroAndAccom.accompanyArr;
 
         for (let j = 0; j < _accomArr_raw.length; j++) {
             const _beginAccomItem = _accomArr_raw[j];
             for (let k = j + 1; k < _accomArr_raw.length;) {
                 let _accomArr: T_PCL_CHECK_RES[] = [];
                 _accomArr.push(_beginAccomItem);
                 for (let kk = 0; kk < accompanyCount - 1; kk++) {
                     const _combineAccomItem = _accomArr_raw[k];
                     _accomArr.push(_combineAccomItem);
                     k++;
                 }
                 _resAccompArrArr.push(_accomArr);
             }
         }
         return _resAccompArrArr;
     } */

    private getAccompanyCombinationRes(heroAndAccom: {
        hero: T_PCL_CHECK_RES,
        accompanyArr: T_PCL_CHECK_RES[]
    }, accompanySetCount: number) {
        let _accomArr_raw = heroAndAccom.accompanyArr;
        let _allCombination: T_PCL_CHECK_RES[][] = getAllCombination(accompanySetCount, _accomArr_raw, 0);
        return _allCombination;
    }

    // private getHero_BaseBeginIdxAndLen(handArr: number[], beginIdx: number, len: number) { }

    /**是否为某种类型,不带master */
    public isType(arr: number[], type: number): boolean {
        let _temp = this.separateAccompanyAndHero(arr, type);
        return _temp.hero.length != 0;
    }
    /**提示同一层级的类型 */
    public tipSameLevel(hand: number[], type: number, heroRuler: {
        beginIdx: number;
        len: number;
        itemCount: number;
    }, accompanyRuler: T_ACCOMPANY_RULER): T_PCL_CHECK_RES_FINAL[] {
        if (getIsInTopLevel(type)) { return [] };
        let _res = <T_PCL_CHECK_RES_FINAL[]>[];

        let _accompanyCount: number = accompanyRuler ? accompanyRuler.minCount * accompanyRuler.itemCount * heroRuler.len : 0;
        let _accompanySetCount: number = accompanyRuler ? _accompanyCount / accompanyRuler.itemCount : 0;
        /**d:deffensive */
        let _hero_d = this.getHero(hand, type, heroRuler);

        /**每类英雄匹配可选的多类随从 */
        for (let i = 0; i < _hero_d.length; i++) {
            let _item = <T_PCL_CHECK_RES_FINAL>{};

            let _hero = _hero_d[i];
            _item.hero = _hero;

            if (accompanyRuler != null) {
                let _handExcludeHero: number[] = hand.slice().filter(function (item) {
                    return _hero.arr.indexOf(item) < 0;
                })

                let _accompany_d = this.getAccompany(_handExcludeHero, accompanyRuler, _accompanyCount, _accompanySetCount);
                if (_accompany_d) {
                    let _heroValArr = this.getHeroValArr(_hero);
                    this.removeSameValWithHeroInAccompanyArr(_accompany_d, _heroValArr);
                }
                _item.accompanyArr = _accompany_d;
            } else {
                _item.accompanyArr = [];
            }
            _item.type = type;
            _res.push(_item);
        }
        return _res;
        // return this.getFinalResult(_res, _accompanySetCount, masterCount);
    }

    /**获取主牌牌值 */
    private getHeroValArr(hero: T_PCL_CHECK_RES): number[] {
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

    /**带牌排除与主牌值相同的项 */
    private removeSameValWithHeroInAccompanyArr(accompanyArr: T_PCL_CHECK_RES[], heroValArr: number[]) {
        for (let i = 0; i < accompanyArr.length; i++) {
            const _accompanyItem = accompanyArr[i];
            if (_accompanyItem.arr && _accompanyItem.arr[0] && heroValArr.indexOf(getGameValue(_accompanyItem.arr[0])) != -1) {
                accompanyArr.splice(i, 1);
                i--;
            }
        }
    }

    /**获取所有炸弹类型组合 */
    public getBombTypeComnbination(handWithoutMaster: number[]): T_PCL_CHECK_RES_FINAL[] {
        let _res: T_PCL_CHECK_RES_FINAL[] = [];
        //长度4炸弹
        const _type: number = E_PCL_CARDTYPE.CT_BOMB_CARD;
        //此处只处理长度为4的炸弹（软炸，硬炸，癞子炸，纯癞子炸）
        let _count: number = PCL_typeDefine[_type][0].metaType * PCL_typeDefine[_type][0].minCount;
        let _heroRuler = this.getHeroRulerDiy(0, _type, _count);
        _res = this.tipSameLevel(handWithoutMaster, _type, _heroRuler, null);
        return _res;
    }

    /**top层级仅限固定值(在SpecificConfig内配置) */
    getRocketTypeCombination(handCards: number[], masterArr: number[]): T_PCL_CHECK_RES_FINAL[] {
        let _res = [];
        if (handCards.length == 0 && masterArr.length == 0) return _res;

        const _type: number = E_PCL_CARDTYPE.CT_MISSILE_CARD;
        var _define = PCL_typeDefine[_type];
        let _numArr: number[] = _define.map((item) => { return item.val as number });
        let _tempFlag0: boolean = _numArr.every((val) => { return handCards.indexOf(val) != -1 })
        let _tempFlag1: boolean = _numArr.every((val) => { return masterArr.indexOf(val) != -1 })
        if (_tempFlag0 || _tempFlag1) {
            _res.push({
                hero: {
                    arr: _numArr
                },
                accompanyArr: null,
                type: _type
            })
        }
        return _res;
    }

    getHeroRulerDiy(beginIdx: number, type: number, totalCount: number): {
        beginIdx: number;
        len: number;
        itemCount: number;
    } {
        let _define = PCL_typeDefine[type][0];
        let _heroLen: number = totalCount / getOneSetCountOfType(PCL_typeDefine[type])
        if (_heroLen % 1 != 0 || _heroLen < _define.minCount) return null;

        return {
            itemCount: _define.metaType,
            beginIdx: beginIdx,
            len: _define.minCount >= 2 ? _heroLen : 1
        }
    }

    /**提示所有类型层级的组合 */
    public tipAllLevel(handWithoutMaster: number[], attackter: number[], type: E_PCL_CARDTYPE, masterCount: number, masterArr: number[]): T_PCL_CHECK_RES_FINAL[] {
        if (type == E_PCL_CARDTYPE.CT_MISSILE_CARD) return [];

        let _sameLevelRes: T_PCL_CHECK_RES_FINAL[] = [];
        let _uppperLevelRes: T_PCL_CHECK_RES_FINAL[] = [];
        //第一层级的类型
        if (PCL_typeLevelDic[E_PCL_LEVEL.ONE].indexOf(type) != -1) {
            let _attackter = this.separateAccompanyAndHero(attackter, type);
            let _heroRuler = this.getHeroRuler(_attackter.hero);
            // let _accompanyRuler = this.getAccompanyRuler(_attackter.accompany);
            let _accompanyRuler = this.getAccompanyRulerDIY(type);

            _sameLevelRes = this.tipSameLevel(handWithoutMaster, type, _heroRuler, _accompanyRuler);
            _uppperLevelRes = this.getBombTypeComnbination(handWithoutMaster);
        } else if (type == E_PCL_CARDTYPE.CT_BOMB_CARD) {
            let _bombLevelRes = this.getBombTypeComnbination(handWithoutMaster);
            _sameLevelRes = getUpperBomb(_bombLevelRes, attackter);
        }
        //top层级仅限固定值(在SpecificConfig内配置)
        let _topLevelRes = this.getRocketTypeCombination(handWithoutMaster, masterArr);
        return _sameLevelRes.concat(_uppperLevelRes).concat(_topLevelRes);
    }

    public canDefeat(deffensiveItemArr: number[], attackter: number[], type: number, masterCount: number, masterArr: number[]): { type: E_PCL_CARDTYPE, can: boolean } {
        let _tempRes = this.tipAllLevel(deffensiveItemArr, attackter, type, masterCount, masterArr);
        if (_tempRes.length != 0) {
            for (let i = 0; i < _tempRes.length; i++) {
                const _item = _tempRes[i];
                let _count = getTotalCount(_item);
                let _type = _item.type;
                if (_count == deffensiveItemArr.length + masterCount) return {
                    type: _type,
                    can: true
                }
            }
        }
        return {
            type: null,
            can: false
        };
    }


}
