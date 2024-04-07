import { CallStatus, NAME, CallRole } from '../const/index';
import { IBellParams } from '../interface/index';
import { isUndefined } from '../utils/common-utils';
import DEFAULT_CALLER_BELL_FILEPATH from '../assets/phone_dialing.mp3';
import DEFAULT_CALLEE_BELL_FILEPATH from '../assets/phone_ringing.mp3';

export class BellContext {
  private _bellContext: any = null;
  private _isMuteBell: boolean = false;
  private _calleeBellFilePath: string = DEFAULT_CALLEE_BELL_FILEPATH;
  private _callRole: string = CallRole.UNKNOWN;
  private _callStatus: string = CallStatus.IDLE;

  constructor() {
    // @ts-ignore
    this._bellContext = wx.createInnerAudioContext();
    this._bellContext.loop = true;
  }

  setBellSrc() {
    // @ts-ignore
    const fs = wx.getFileSystemManager();
    try {
      let playBellFilePath = DEFAULT_CALLER_BELL_FILEPATH;
      if (this._callRole === CallRole.CALLEE) {
        playBellFilePath = this._calleeBellFilePath || DEFAULT_CALLEE_BELL_FILEPATH;
      }
      fs.readFileSync(playBellFilePath, 'utf8', 0);
      this._bellContext.src = playBellFilePath;
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to setBellSrc, ${error}`);
    }
  }
  setBellProperties(bellParams: IBellParams) {
    this._callRole = bellParams.callRole || this._callRole;
    this._callStatus = bellParams.callStatus || this._callStatus;
    this._calleeBellFilePath = bellParams.calleeBellFilePath || this._calleeBellFilePath;
    // undefined/false || isMuteBell => isMuteBell (不符合预期)
    this._isMuteBell = isUndefined(bellParams.isMuteBell) ? this._isMuteBell : bellParams.isMuteBell;
  }
  async play() {
    try {
      if (this._callStatus !== CallStatus.CALLING) {
        return ;
      }
      this.setBellSrc();
      if (this._callRole === CallRole.CALLEE && !this._isMuteBell) {
        await this._bellContext.play();
      }
      if (this._callRole === CallRole.CALLER) {
        await this._bellContext.play();
      }
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to play audio file, ${error}`);
    }
  }
  async stop() {
    try {
      this._bellContext.stop();
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to stop audio file, ${error}`);
    }
  }
  async setBellMute(enable: boolean) {
    if (this._callStatus !== CallStatus.CALLING && this._callRole !== CallRole.CALLEE) {
      return;
    }
    if (enable) {
      await this.stop();
    } else {
      await this.play();
    }
  }
  destroy() {
    try {
      this._isMuteBell = false;
      this._calleeBellFilePath = '';
      this._callRole = CallRole.UNKNOWN;
      this._callStatus = CallStatus.IDLE;
      this._bellContext.destroy();
      this._bellContext = null;
    } catch (error) {
      console.warn(`${NAME.PREFIX}Failed to destroy, ${error}`);
    }
  }
}
