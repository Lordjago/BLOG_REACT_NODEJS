export const LoginStart = (userCredentials) => {
    return {
        type: "LOGIN_START"
    }
}
export const LoginSuccess = (user) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: user
    }
}
export const LoginFailure = () => {
    return {
        type: "LOGIN_FAILURE"
    }
}
export const UpdateStart = (userCredentials) => {
    return {
        type: "UPDATE_START"
    }
}
export const UpdateSuccess = (user) => {
    return {
        type: "UPDATE_SUCCESS",
        payload: user
    }
}
export const UpdateFailure = () => {
    return {
        type: "UPDATE_FAILURE"
    }
}


