export declare const RS_PROFILE_GROUP_SEGMENT = ".rsprofile.";
export declare const buildProfileGroupName: (groupName: string, profileKey: string) => string;
export declare const extractProfileKeyFromConfigKey: (fullKey: string, prefix: string) => string | null;
