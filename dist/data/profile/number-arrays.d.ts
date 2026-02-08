import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getProfileNumberArray: (groupName: string, key: string, fallback?: number[]) => number[];
export declare const setProfileNumberArray: (groupName: string, key: string, values: number[], options?: ConfigWriteOptions) => void;
