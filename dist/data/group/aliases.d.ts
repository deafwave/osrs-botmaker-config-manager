import type { ConfigWriteOptions } from '../shared/index.js';
export type ConfigAliasValue = number[] | string;
export declare const getConfig: (groupName: string, key: string) => ConfigAliasValue;
export declare const setConfig: (groupName: string, key: string, value: number[] | string, options?: ConfigWriteOptions) => void;
