import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getConfigString: (groupName: string, key: string, fallback?: string) => string;
export declare const setConfigString: (groupName: string, key: string, value: string, options?: ConfigWriteOptions) => void;
