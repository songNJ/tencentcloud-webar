import { CallMediaType, CallStatus } from '../const/index';
export declare function initialUI(): void;
export declare function checkRunPlatform(): void;
export declare function initAndCheckRunEnv(): void;
export declare function beforeCall(type: CallMediaType, that: any): Promise<CallStatus.IDLE | CallStatus.CALLING>;
export declare function handlePackageError(error: any): void;
