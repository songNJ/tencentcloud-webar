export declare class CallManager {
    private _globalCallPagePath;
    private _isPageRedirected;
    init(params: any): Promise<void>;
    private _watchTUIStore;
    private _unwatchTUIStore;
    private _handleCallStatusChange;
    private _handleCallStatusToCalling;
    private _handleCallStatusToIdle;
    destroyed(): Promise<void>;
}
