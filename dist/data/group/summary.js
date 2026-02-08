import { RS_PROFILE_GROUP_SEGMENT } from '../shared/index.js';
import { getConfigKeys } from './keys.js';
export const logGroupConfigSummary = (groupName) => {
    const keys = getConfigKeys(`${groupName}.`);
    if (keys.length === 0) {
        bot.printLogMessage(`No config keys found for group '${groupName}'.`);
        return;
    }
    const profilePrefix = `${groupName}${RS_PROFILE_GROUP_SEGMENT}`;
    const groupScoped = [];
    let profileScopedCount = 0;
    keys.forEach((key) => {
        if (key.startsWith(profilePrefix)) {
            profileScopedCount += 1;
        }
        else {
            groupScoped.push(key);
        }
    });
    bot.printLogMessage(`Config summary for group '${groupName}': ${keys.length} total key(s), ${groupScoped.length} group-level, ${profileScopedCount} profile-scoped.`);
    if (groupScoped.length > 0) {
        const sortedKeys = groupScoped.slice().sort((a, b) => a.localeCompare(b));
        sortedKeys.forEach((key) => {
            bot.printLogMessage(`Group-level key: ${key}`);
        });
    }
    if (profileScopedCount > 0) {
        bot.printLogMessage(`Profile-scoped keys detected for '${groupName}'. Use logProfileConfigSummary('${groupName}') for details.`);
    }
};
