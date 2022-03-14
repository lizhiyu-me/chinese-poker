
import { E_META } from "./Const";

/**元类型加工器,以值作元 */
export class MetaProcessor {
    private mMetaLib: { [count: number]: number[][] } = {};
    //arr 值相同的序列号数组
    constructor(arr: number[]) {
        this.load(arr);
    }

    private _val: number;
    getVal(): number {
        return this._val;
    }
    setVal(v: number) {
        this._val = v;
    }

    private load(arr: number[]) {
        this.update(arr);
    }

    update(arr: number[]) {
        let _obj = Object.keys(E_META);
        for (const key in _obj) {
            if (Object.prototype.hasOwnProperty.call(_obj, key)) {
                const _metaType = _obj[key];
                let _parsed = parseInt(_metaType);
                if (!isNaN(_parsed) && _parsed > 0) {
                    this.mMetaLib[_parsed] = this.processByMetaType(arr, _parsed);
                }
            }
        }
    }

    /**包含的元类型数组 */
    getMeta(count: E_META): number[][] {
        return this.mMetaLib[count];
    }

    processByMetaType(arr: number[], type: E_META): number[][] {
        let _arr = arr.slice();
        let _res: number[][] = [];
        let _len: number = arr.length;
        while (_len >= type) {
            _res.push(_arr.splice(0, type));
            _len = _arr.length;
        }
        return _res;
    }
}
