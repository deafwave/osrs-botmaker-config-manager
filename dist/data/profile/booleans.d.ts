import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getProfileBoolean: (groupName: string, key: string, fallback?: boolean) => boolean;
export declare const setProfileBoolean: (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions) => void;
export declare const getProfileBooleanForProfileKey: (groupName: string, profileKey: string, key: string, fallback?: boolean) => boolean;
export declare const setProfileBooleanForProfileKey: (groupName: string, profileKey: string, key: string, value: boolean, options?: ConfigWriteOptions) => void;
