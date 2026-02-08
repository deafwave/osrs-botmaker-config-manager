export declare const getProfileKey: () => string;
export declare const getProfileGroupName: (groupName: string, profileKey: string) => string;
export declare const getProfileKeysForGroup: (groupName: string) => string[];
export declare const logProfileConfigSummary: (groupName: string) => void;
export declare const getProfileConfigKeys: (groupName: string, keyPrefix?: string) => string[];
