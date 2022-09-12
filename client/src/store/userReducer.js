










const defaultState = {
    isAuth: false
}


export const ISAUTH_USERS = "ISAUTH_USERS"

export const isAuthReducer = (state = defaultState, action) => {
    switch (action.type) {

        case ISAUTH_USERS:
            return { isAuth: action.payload }

        default:
            return state
    }
}

export const setIsAuth = payload => ({ type: ISAUTH_USERS, payload })


