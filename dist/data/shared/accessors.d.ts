import type { ConfigWriteOptions } from './types.js';
type GetStringAccessor = (groupName: string, key: string, fallback?: string) => string;
type SetStringAccessor = (groupName: string, key: string, value: string, options?: ConfigWriteOptions) => void;
export type NumberAccessors = {
    getNumber: (groupName: string, key: string, fallback?: number) => number;
    getInt: (groupName: string, key: string, fallback?: number) => number;
    getFloat: (groupName: string, key: string, fallback?: number) => number;
    setNumber: (groupName: string, key: string, value: number, options?: ConfigWriteOptions) => void;
};
export type JsonAccessors = {
    getJson: <T>(groupName: string, key: string, fallback: T) => T;
    setJson: <T>(groupName: string, key: string, value: T, options?: ConfigWriteOptions) => void;
};
export declare const createNumberAccessors: (getString: GetStringAccessor, setString: SetStringAccessor) => NumberAccessors;
export declare const createJsonAccessors: (getString: GetStringAccessor, setString: SetStringAccessor) => JsonAccessors;
export {};
