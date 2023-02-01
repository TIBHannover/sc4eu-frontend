module.exports = (projectName, emailContent) => {
    return {
        body: `<head><title>Email Confirmation</title></head><body><h2>Request to grant permission to join Project ${projectName}</h2><div>${emailContent}</div></body>`
    };
};
