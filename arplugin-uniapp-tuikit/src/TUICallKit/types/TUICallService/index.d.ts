import TUICallService, { TUIGlobal, TUIStore } from './CallService/index';
import { StoreName, NAME, CallRole, CallMediaType, CallStatus, StatusChange, VideoResolution, VideoDisplayMode, AudioPlayBackDevice } from './const/index';
import { t } from './locales/index';
declare const TUICallKitServer: TUICallService;
export { TUIGlobal, TUIStore, StoreName, TUICallKitServer, NAME, CallStatus, CallRole, CallMediaType, StatusChange, VideoResolution, VideoDisplayMode, AudioPlayBackDevice, t, };
