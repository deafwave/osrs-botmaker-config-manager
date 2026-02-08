import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getProfileStringArray: (groupName: string, key: string, fallback?: string[]) => string[];
export declare const setProfileStringArray: (groupName: string, key: string, values: string[], options?: ConfigWriteOptions) => void;
