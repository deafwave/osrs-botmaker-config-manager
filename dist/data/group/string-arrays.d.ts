import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getConfigStringArray: (groupName: string, key: string, fallback?: string[]) => string[];
export declare const setConfigStringArray: (groupName: string, key: string, values: string[], options?: ConfigWriteOptions) => void;
