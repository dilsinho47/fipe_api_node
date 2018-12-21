function getArrayResponse(input) {
    let response;
    try {
        response = JSON.parse(input);
    } catch (err) {
        throw 'Fipe API did not return a valid JSON';
    }

    if (!Array.isArray(response)) {
        throw 'Fipe API response is not a valid array';
    }

    return response;
}

function getObjectResponse(input) {
    let response;
    try {
        response = JSON.parse(input);
    } catch (err) {
        throw 'Fipe API did not return a valid JSON';
    }

    if (typeof response !== 'object') {
        throw 'Fipe API response is not a valid object';
    }

    return response;
}

module.exports = {
    getArrayResponse : getArrayResponse,
    getObjectResponse : getObjectResponse,
};