export const writeConfig = (writer, options) => {
    writer();
    if (options?.sync) {
        configManager.sendConfig();
    }
};
