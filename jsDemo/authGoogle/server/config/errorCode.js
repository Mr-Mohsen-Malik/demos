module.exports = {

    SUCCESS: { "code": 200, "message": "" },
    REQUEST_ACCEEPTED_FOR_PROCESSING: { "code": 202, "message": "The request has been accepted for processing, but the processing has not been completed." },
    BAD_REQUEST: { "code": 400, "message": "The server did not understand the request." },
    UNAUTHORIZED: { "code": 401, "message": "The request is unauthorized." },
    FORBIDDEN: { "code": 403, "message": "Access is forbidden to the requested page." },
    API_NOT_FOUND: { "code": 404, "message": "The requested resource could not be found." },
    REQUEST_TIMEOUT: { "code": 408, "message": "The server timed out waiting for the request." },
    CONFLICT: { "code": 409, "message": "The request could not be completed due to a conflict." },
    EXTERNAL_DEPENDENCY_FALIURE: { "code": 424, "message": "external dependency faliure" },
    TOO_MANY_REQUEST: { "code": 429, "message": "The user has sent too many requests in a given amount of time." },
    INTERNAL_SERVER_ERROR: { "code": 500, "message": "Internal server error." },
    BAD_GATEWAY: { "code": 502, "message": "The request was not completed." },
    SERVICE_UNAVAILABLE: { "code": 503, "message": "The server is temporarily overloading or down." }

};