const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
            return {
                user: null,
                accessToken: null,
                isAuth: false,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                accessToken: action.payload.accessToken,
                isAuth: true,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                accessToken: null,
                isAuth: false,
                isFetching: false,
                error: true
            };
        case "UPDATE_START":
            return {
                user: state.user,
                accessToken: state.accessToken,
                isAuth: state.isAuth,
                isFetching: true,
                error: false
            };
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                accessToken: state.accessToken,
                isAuth: state.isAuth,
                isFetching: false,
                error: false
            };
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                accessToken: state.accessToken,
                isAuth: state.isAuth,
                isFetching: false,
                error: true
            };
         case "LOGOUT":
            return {
                user: null,
                accessToken: null,
                isAuth: false,
                isFetching: false,
                error: false
            };
        default:
            return state;
    }
}

export default Reducer