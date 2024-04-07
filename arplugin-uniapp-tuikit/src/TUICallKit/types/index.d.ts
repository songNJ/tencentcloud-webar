import { TUIGlobal, TUIStore, StoreName, TUICallKitServer, NAME, StatusChange as STATUS, CallRole, CallMediaType, VideoResolution, VideoDisplayMode, t } from './TUICallService/index';
import TUICallKit from './Components/TUICallKit.vue';
declare const plugin: (TUICore: any) => any;
declare const install: (app: any) => void;
declare const TUICallType: {
    AUDIO_CALL: number;
    VIDEO_CALL: number;
};
declare const Version = "<@VERSION@>";
export { TUIGlobal, TUIStore, StoreName, TUICallKitServer, TUICallKit, plugin, install, TUICallType, NAME, STATUS, CallRole, CallMediaType, VideoResolution, VideoDisplayMode, Version, t, };
