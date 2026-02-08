import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getConfigNumberArray: (groupName: string, key: string, fallback?: number[]) => number[];
export declare const setConfigNumberArray: (groupName: string, key: string, values: number[], options?: ConfigWriteOptions) => void;
