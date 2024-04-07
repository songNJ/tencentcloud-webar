import { TUIStore } from '../CallService/index';
import { NAME, StoreName } from '../const/index';
import { en } from './en';
import { zh } from './zh-cn';
import { ja_JP } from './ja_JP';

export const CallTips: any = {
  OTHER_SIDE: 'other side',
  CANCEL: 'cancel',
  OTHER_SIDE_REJECT_CALL: 'other side reject call',
  REJECT_CALL: 'reject call',
  OTHER_SIDE_LINE_BUSY: 'other side line busy',
  IN_BUSY: 'in busy',
  CALL_TIMEOUT: 'call timeout',
  END_CALL: 'end call',
  TIMEOUT: 'timeout',
  KICK_OUT: 'kick out',
  CALLER_CALLING_MSG: 'caller calling message',
  CALLER_GROUP_CALLING_MSG: 'wait to be called',
  CALLEE_CALLING_VIDEO_MSG: 'callee calling video message',
  CALLEE_CALLING_AUDIO_MSG: 'callee calling audio message',
  NO_MICROPHONE_DEVICE_PERMISSION: 'no microphone access',
  NO_CAMERA_DEVICE_PERMISSION: 'no camera access',
};

export const languageData: languageDataType = {
  en,
  'zh-cn': zh,
  ja_JP,
};

// language translate
export function t(key: any): string {
  const language = TUIStore.getData(StoreName.CALL, NAME.LANGUAGE);
  // eslint-disable-next-line
  for (const langKey in languageData) {
    if (langKey === language) {
      const currentLanguage = languageData[langKey];
      // eslint-disable-next-line
      for (const sentenceKey in currentLanguage) {
        if (sentenceKey === key) {
          return currentLanguage[sentenceKey];
        }
      }
    }
  }
  const enString = key['en']?.key; // eslint-disable-line
  console.error(`${NAME.PREFIX}translation is not found: ${key}.`);
  return enString;
}

interface languageItemType {
  [key: string]: string;
}
interface languageDataType {
  [key: string]: languageItemType;
}
