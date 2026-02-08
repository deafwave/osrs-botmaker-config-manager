import type { ConfigWriteOptions } from '../shared/index.js';
export declare const getConfigBoolean: (groupName: string, key: string, fallback?: boolean) => boolean;
export declare const setConfigBoolean: (groupName: string, key: string, value: boolean, options?: ConfigWriteOptions) => void;
