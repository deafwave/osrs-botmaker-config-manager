import type { ConfigWriteOptions } from '../shared/index.js';
export declare const unsetConfig: (groupName: string, key: string, options?: ConfigWriteOptions) => void;
export declare const getConfigKeys: (prefix: string) => string[];
export declare const sendConfig: () => void;
