import { NAME, MAX_NUMBER_ROOM_ID, VideoResolution, VideoDisplayMode } from "../../const/index";

export const VALIDATE_PARAMS = {
  init: {
    SDKAppID: {
      required: true,
      rules: [NAME.NUMBER],
      allowEmpty: false,
    },
    userID: {
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false,
    },
    userSig: {
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false,
    },
    tim: {
      required: false,
      rules: [NAME.OBJECT],
    },
  },
  call: {
    userID: {
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false
    },
    type: {
      required: true,
      rules: [NAME.NUMBER],
      range: [1, 2],
      allowEmpty: false
    },
    roomID: {
      required: false,
      rules: [NAME.NUMBER], // 仅支持数字房间号, 后续会支持字符串房间号
      range: `1~${MAX_NUMBER_ROOM_ID}`,
      allowEmpty: false,
    },
    userData: {
      required: false,
      rules: [NAME.STRING],
      allowEmpty: false,
    },
    timeout: {
      required: false,
      rules: [NAME.NUMBER],
      allowEmpty: false
    }
  },
  groupCall: {
    userIDList: {
      required: true,
      rules: [NAME.ARRAY],
      allowEmpty: false
    },
    type: {
      required: true,
      rules: [NAME.NUMBER],
      range: [1, 2],
      allowEmpty: false
    },
    groupID: {
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false
    },
    roomID: {
      required: false,
      rules: [NAME.NUMBER], // 仅支持数字房间号, 后续会支持字符串房间号
      range: `1~${MAX_NUMBER_ROOM_ID}`,
      allowEmpty: false
    },
    timeout: {
      required: false,
      rules: [NAME.NUMBER],
      allowEmpty: false
    },
    userData: {
      required: false,
      rules: [NAME.STRING],
      allowEmpty: false,
    },
    offlinePushInfo: {
      required: false,
      rules: [NAME.OBJECT],
      allowEmpty: false,
    },
  },
  joinInGroupCall: {
    type: {
      required: true,
      rules: [NAME.NUMBER],
      range: [1, 2],
      allowEmpty: false
    },
    groupID: {
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false
    },
    roomID: {
      required: true,
      rules: [NAME.NUMBER],
      allowEmpty: false,
    },
  },
  inviteUser: {
    userIDList: {
      required: true,
      rules: [NAME.ARRAY],
      allowEmpty: false
    },
  },
  setSelfInfo: {
    nickName: {
      required: false,
      rules: [NAME.STRING],
      allowEmpty: false,
    },
    avatar: {
      required: false,
      rules: [NAME.STRING],
      allowEmpty: false,
    }
  },
  enableFloatWindow: [
    {
      key: "enable",
      required: false,
      rules: [NAME.BOOLEAN],
      allowEmpty: false,
    }
  ],
  enableAIVoice: [
    {
      key: "enable",
      required: true,
      rules: [NAME.BOOLEAN],
      allowEmpty: false,
    }
  ],
  enableMuteMode: [
    {
      key: "enable",
      required: true,
      rules: [NAME.BOOLEAN],
      allowEmpty: false,
    }
  ],
  setCallingBell: [
    {
      key: "filePath",
      required: false,
      rules: [NAME.STRING],
      allowEmpty: true,
    }
  ],
  setLanguage: [
    {
      key: "language",
      required: true,
      rules: [NAME.STRING],
      allowEmpty: false
    }
  ],
  setVideoDisplayMode: [
    {
      key: "displayMode",
      required: true,
      rules: [NAME.STRING],
      range: [VideoDisplayMode.CONTAIN, VideoDisplayMode.COVER, VideoDisplayMode.FILL],
      allowEmpty: false
    }
  ],
  setVideoResolution: [
    {
      key: "resolution",
      required: true,
      rules: [NAME.STRING],
      range: [VideoResolution.RESOLUTION_1080P, VideoResolution.RESOLUTION_480P, VideoResolution.RESOLUTION_720P],
      allowEmpty: false
    }
  ]
};
