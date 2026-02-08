import type { ConfigWriteOptions } from './shared/index.js';
export type ConfigScopeMode = 'group' | 'profile';
export type ConfigScopeOptions = {
    group: string;
    scope?: ConfigScopeMode;
    profileKey?: string;
    syncDefault?: boolean;
};
export type LogConfigValuesOptions = {
    action: string;
    group: string;
    getAllValues: (keyPrefix?: string) => Record<string, string>;
    keyPrefix?: string;
};
export type ConfigScope = {
    getKeys: (keyPrefix?: string) => string[];
    getAllValues: (keyPrefix?: string) => Record<string, string>;
    logAllValues: (action: string, keyPrefix?: string) => Record<string, string>;
    getString: (key: string, fallback?: string) => string;
    setString: (key: string, value: string, options?: ConfigWriteOptions) => void;
    getNumber: (key: string, fallback?: number) => number;
    setNumber: (key: string, value: number, options?: ConfigWriteOptions) => void;
    getInt: (key: string, fallback?: number) => number;
    setInt: (key: string, value: number, options?: ConfigWriteOptions) => void;
    getFloat: (key: string, fallback?: number) => number;
    getBoolean: (key: string, fallback?: boolean) => boolean;
    setBoolean: (key: string, value: boolean, options?: ConfigWriteOptions) => void;
    getStringArray: (key: string, fallback?: string[]) => string[];
    setStringArray: (key: string, values: string[], options?: ConfigWriteOptions) => void;
    getNumberArray: (key: string, fallback?: number[]) => number[];
    setNumberArray: (key: string, values: number[], options?: ConfigWriteOptions) => void;
    getJson: <T>(key: string, fallback: T) => T;
    setJson: <T>(key: string, value: T, options?: ConfigWriteOptions) => void;
    unset: (key: string, options?: ConfigWriteOptions) => void;
};
export declare const logConfigValues: ({ action, group, getAllValues, keyPrefix }: LogConfigValuesOptions) => Record<string, string>;
export declare const createConfigScope: (options: ConfigScopeOptions) => ConfigScope;
