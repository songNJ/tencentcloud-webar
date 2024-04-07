import { IBellParams } from '../interface/index';
export declare class BellContext {
    private _bellContext;
    private _isMuteBell;
    private _calleeBellFilePath;
    private _callRole;
    private _callStatus;
    constructor();
    setBellSrc(): void;
    setBellProperties(bellParams: IBellParams): void;
    play(): Promise<void>;
    stop(): Promise<void>;
    setBellMute(enable: boolean): Promise<void>;
    destroy(): void;
}
