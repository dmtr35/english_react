










const defaultState = {
    isAuth: false
}


export const IS_AUTH_USERS = "IS_AUTH_USERS"

export const isAuthReducer = (state = defaultState, action) => {
    switch (action.type) {

        case IS_AUTH_USERS:
            return { ...state, isAuth: action.payload }

        default:
            return state
    }
}

export const setIsAuthPayload = payload => ({ type: IS_AUTH_USERS, payload })


