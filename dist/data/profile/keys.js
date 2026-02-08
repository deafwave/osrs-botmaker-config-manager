import { getConfigKeys } from '../group/index.js';
import { RS_PROFILE_GROUP_SEGMENT, buildProfileGroupName, extractProfileKeyFromConfigKey } from '../shared/index.js';
export const getProfileKey = () => configManager.getRSProfileKey();
export const getProfileGroupName = (groupName, profileKey) => buildProfileGroupName(groupName, profileKey);
export const getProfileKeysForGroup = (groupName) => {
    const prefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`;
    const keys = getConfigKeys(prefix);
    const profileKeys = new Set();
    keys.forEach((fullKey) => {
        const profileKey = extractProfileKeyFromConfigKey(fullKey, prefix);
        if (profileKey) {
            profileKeys.add(profileKey);
        }
    });
    return Array.from(profileKeys);
};
export const logProfileConfigSummary = (groupName) => {
    const prefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`;
    const keys = getConfigKeys(prefix);
    if (keys.length === 0) {
        bot.printLogMessage(`No profile-scoped config keys found for group '${groupName}'.`);
        return;
    }
    const counts = new Map();
    keys.forEach((fullKey) => {
        const profileKey = extractProfileKeyFromConfigKey(fullKey, prefix);
        if (!profileKey) {
            return;
        }
        counts.set(profileKey, (counts.get(profileKey) ?? 0) + 1);
    });
    const activeProfileKey = getProfileKey();
    bot.printLogMessage(`Profile-scoped config summary for group '${groupName}': ${counts.size} profile(s), ${keys.length} key(s). Active profile: ${activeProfileKey}`);
    const sortedProfileKeys = Array.from(counts.keys()).sort((a, b) => a.localeCompare(b));
    sortedProfileKeys.forEach((profileKey) => {
        bot.printLogMessage(`Profile '${profileKey}' has ${counts.get(profileKey) ?? 0} key(s).`);
    });
};
export const getProfileConfigKeys = (groupName, keyPrefix = '') => configManager.getRSProfileConfigurationKeys(groupName, configManager.getRSProfileKey(), keyPrefix);
