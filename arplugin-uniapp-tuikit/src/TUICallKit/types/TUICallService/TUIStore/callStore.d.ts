import { ICallStore } from '../interface/ICallStore';
export default class CallStore {
    defaultStore: ICallStore;
    store: ICallStore;
    update(key: keyof ICallStore, data: any): void;
    getData(key: string | undefined): any;
    reset(keyList?: Array<string>): void;
}
