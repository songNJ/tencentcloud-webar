import { VideoResolution, VideoDisplayMode } from "../../const/index";
export declare const VALIDATE_PARAMS: {
    init: {
        SDKAppID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        userID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        userSig: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        tim: {
            required: boolean;
            rules: any[];
        };
    };
    call: {
        userID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        type: {
            required: boolean;
            rules: any[];
            range: number[];
            allowEmpty: boolean;
        };
        roomID: {
            required: boolean;
            rules: any[];
            range: string;
            allowEmpty: boolean;
        };
        userData: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        timeout: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
    };
    groupCall: {
        userIDList: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        type: {
            required: boolean;
            rules: any[];
            range: number[];
            allowEmpty: boolean;
        };
        groupID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        roomID: {
            required: boolean;
            rules: any[];
            range: string;
            allowEmpty: boolean;
        };
        timeout: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        userData: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        offlinePushInfo: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
    };
    joinInGroupCall: {
        type: {
            required: boolean;
            rules: any[];
            range: number[];
            allowEmpty: boolean;
        };
        groupID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        roomID: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
    };
    inviteUser: {
        userIDList: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
    };
    setSelfInfo: {
        nickName: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
        avatar: {
            required: boolean;
            rules: any[];
            allowEmpty: boolean;
        };
    };
    enableFloatWindow: {
        key: string;
        required: boolean;
        rules: any[];
        allowEmpty: boolean;
    }[];
    enableAIVoice: {
        key: string;
        required: boolean;
        rules: any[];
        allowEmpty: boolean;
    }[];
    enableMuteMode: {
        key: string;
        required: boolean;
        rules: any[];
        allowEmpty: boolean;
    }[];
    setCallingBell: {
        key: string;
        required: boolean;
        rules: any[];
        allowEmpty: boolean;
    }[];
    setLanguage: {
        key: string;
        required: boolean;
        rules: any[];
        allowEmpty: boolean;
    }[];
    setVideoDisplayMode: {
        key: string;
        required: boolean;
        rules: any[];
        range: VideoDisplayMode[];
        allowEmpty: boolean;
    }[];
    setVideoResolution: {
        key: string;
        required: boolean;
        rules: any[];
        range: VideoResolution[];
        allowEmpty: boolean;
    }[];
};
