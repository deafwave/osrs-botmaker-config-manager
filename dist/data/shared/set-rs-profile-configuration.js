/**
 * Upstream typing only accepts `object`, but runtime supports scalar values as well.
 */
export const setRSProfileConfigurationValue = (groupName, key, value) => {
    const typedConfigManager = configManager;
    typedConfigManager.setRSProfileConfiguration(groupName, key, value);
};
