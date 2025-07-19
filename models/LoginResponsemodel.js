const successLoginResponse = (data, accessToken) => {
    return {
        success: true,
        user: {
            id: data.id,
            username: data.username,
            email: data.email
        },
        accessToken
    };
};

const errorLoginResponse = (error) => {
    return {
        success: false,
        error: error
    };
};

module.exports = {
    successLoginResponse,
    errorLoginResponse
};
