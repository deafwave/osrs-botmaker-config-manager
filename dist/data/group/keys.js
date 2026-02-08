import { writeConfig } from '../shared/index.js';
export const unsetConfig = (groupName, key, options) => {
    writeConfig(() => {
        configManager.unsetConfiguration(groupName, key);
    }, options);
};
export const getConfigKeys = (prefix) => configManager.getConfigurationKeys(prefix);
export const sendConfig = () => {
    configManager.sendConfig();
};
