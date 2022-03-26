import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: JSON.parse(localStorage.getItem('accessToken')) || null,
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE)

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
        localStorage.setItem('accessToken', JSON.stringify(state.accessToken))
        localStorage.setItem('isAuth' , JSON.stringify(state.isAuth))
    },[state.user])
    return (
        <Context.Provider value={{
            user: state.user,
            accessToken: state.accessToken,
            isAuth: state.isAuth,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</Context.Provider>
    )
}