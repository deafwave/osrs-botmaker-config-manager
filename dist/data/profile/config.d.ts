import type { ConfigWriteOptions } from '../shared/index.js';
export declare const unsetProfileConfig: (groupName: string, key: string, options?: ConfigWriteOptions) => void;
export type ProfileConfigAliasValue = number[] | string;
export declare const getProfileConfig: (groupName: string, key: string) => ProfileConfigAliasValue;
export declare const setProfileConfig: (groupName: string, key: string, value: number[] | string, options?: ConfigWriteOptions) => void;
