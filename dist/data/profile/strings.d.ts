import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getProfileString: (groupName: string, key: string, fallback?: string) => string;
export declare const setProfileString: (groupName: string, key: string, value: string, options?: ConfigWriteOptions) => void;
export declare const getProfileStringForProfileKey: (groupName: string, profileKey: string, key: string, fallback?: string) => string;
export declare const setProfileStringForProfileKey: (groupName: string, profileKey: string, key: string, value: string, options?: ConfigWriteOptions) => void;
