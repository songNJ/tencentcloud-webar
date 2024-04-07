import { IUserInfo } from '../interface/ICallService';
import { ITUIStore } from '../interface/ITUIStore';
export declare function setDefaultUserInfo(userId: string, domId?: string): IUserInfo;
export declare function getMyProfile(myselfUserId: string, tim: any, TUIStore: any): Promise<IUserInfo>;
export declare function getRemoteUserProfile(userIdList: Array<string>, tim: any, TUIStore: any): Promise<any>;
export declare function generateText(TUIStore: ITUIStore, key: string, prefix?: string, suffix?: string): string;
export declare function generateStatusChangeText(TUIStore: ITUIStore): string;
export declare function getGroupMemberList(groupID: string, tim: any, count: any, offset: any): Promise<any>;
export declare function getGroupProfile(groupID: string, tim: any): Promise<any>;
