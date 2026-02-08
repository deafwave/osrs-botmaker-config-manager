import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getProfileNumber: (groupName: string, key: string, fallback?: number | undefined) => number, getProfileInt: (groupName: string, key: string, fallback?: number | undefined) => number, getProfileFloat: (groupName: string, key: string, fallback?: number | undefined) => number, setProfileNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions | undefined) => void;
export declare const getProfileIntForProfileKey: (groupName: string, profileKey: string, key: string, fallback?: number) => number;
export declare const setProfileNumberForProfileKey: (groupName: string, profileKey: string, key: string, value: number, options?: ConfigWriteOptions) => void;
