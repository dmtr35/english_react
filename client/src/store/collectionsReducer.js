const defaultState = {
    isLoadCollections: false,
    checked: false,

    menuColl: '',
    menuWord: '',
    cancelDeleteColl: '',

    collections: [],
    randomListWords: [],
    activeTurnWords: [],
    modalDelTimeout: []
}


export const IS_LOAD_COLLECTIONS = "IS_LOAD_COLLECTIONS"
export const CHECKED = "CHECKED"

export const MENU_COLL = "MENU_COLL"
export const MENU_WORD = "MENU_WORD"
export const CANCEL_DELETE_COLL = "CANCEL_DELETE_COLL"

export const COLLECTIONS = "COLLECTIONS"
export const RANDOM_LIST_WORDS = "RANDOM_LIST_WORDS"
export const ACTIVE_TERN_WORDS = "ACTIVE_TERN_WORDS"
export const MODAL_DEL_TIMEOUT = "MODAL_DEL_TIMEOUT"

export const collectionsReducer = (state = defaultState, action) => {
    switch (action.type) {

        case IS_LOAD_COLLECTIONS:
            // console.log(typeof state);
            // console.log(state);
            
            return { ...state, isLoadCollections: action.payload }
        case CHECKED:
            return { ...state, checked: action.payload }

        case MENU_COLL:
            return { ...state, menuColl: action.payload }
        case MENU_WORD:
            return { ...state, menuWord: action.payload }
        case CANCEL_DELETE_COLL:
            return { ...state, cancelDeleteColl: action.payload }

        case COLLECTIONS:
            return { ...state, collections: action.payload }
        case RANDOM_LIST_WORDS:
            return { ...state, randomListWords: action.payload }
        case ACTIVE_TERN_WORDS:
            return { ...state, activeTurnWords: action.payload }
        case MODAL_DEL_TIMEOUT:
            return { ...state, modalDelTimeout: action.payload }


        default:
            return state
    }
}

export const setIsLoadCollectionsPayload = payload => ({ type: IS_LOAD_COLLECTIONS, payload })

export const setCheckedPayload = payload => ({ type: CHECKED, payload })

export const setMenuCollPayload = payload => ({ type: MENU_COLL, payload })
export const setMenuWordPayload = payload => ({ type: MENU_WORD, payload })
export const setCancelDeleteCollPayload = payload => ({ type: CANCEL_DELETE_COLL, payload })

export const setCollectionsPayload = payload => ({ type: COLLECTIONS, payload })
export const setRandomListWordsPayload = payload => ({ type: RANDOM_LIST_WORDS, payload })
export const setActiveTurnWordsPayload = payload => ({ type: ACTIVE_TERN_WORDS, payload })
export const setModalDelTimeoutPayload = payload => ({ type: MODAL_DEL_TIMEOUT, payload })


