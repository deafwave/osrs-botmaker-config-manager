export type RSProfileConfigValue = object | string | boolean;
/**
 * Upstream typing only accepts `object`, but runtime supports scalar values as well.
 */
export declare const setRSProfileConfigurationValue: (groupName: string, key: string, value: RSProfileConfigValue) => void;
