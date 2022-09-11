import { makeAutoObservable } from "mobx"


export default class CollectionStore {
    constructor() {
        this._collections = []
        this._words = []
        this._randomListWords = []
        this._isActive = false
        this._isLoadColleltions = false
        this._menuColl = ''
        this._menuWord = ''
        this._activeTurnWord = []
        this._switching = true
        this._checked = false
        this._modalDelTimeout = []
        this._cancelDeleteColl = ''

        makeAutoObservable(this)
    }

    setCollections(collections) {
        this._collections = collections
    }
    setWords(words) {
        this._words = words
    }
    setRandomListWords(randomListWords) {
        this._randomListWords = randomListWords
    }
    setIsActive(isActive) {
        this._isActive = isActive
    }
    setIsLoadColleltions(isLoadColleltions) {
        this._isLoadColleltions = isLoadColleltions
    }
    setMenuColl(menuColl) {
        this._menuColl = menuColl
    }
    setMenuWord(menuWord) {
        this._menuWord = menuWord
    }
    setActiveTurnWord(activeTurnWord) {
        this._activeTurnWord = activeTurnWord
    }
    setSwitching(switching) {
        this._switching = switching
    }
    setChecked(checked) {
        this._checked = checked
    }
    setModalDelTimeout(modalDelTimeout) {
        this._modalDelTimeout = modalDelTimeout
    }
    setCancelDeleteColl(cancelDeleteColl) {
        this._cancelDeleteColl = cancelDeleteColl
    }





    get collections() {
        return this._collections
    }
    get words() {
        return this._words
    }
    get randomListWords() {
        return this._randomListWords
    }
    get isActive() {
        return this._isActive
    }
    get isLoadColleltions() {
        return this._isLoadColleltions
    }
    get menuColl() {
        return this._menuColl
    }
    get menuWord() {
        return this._menuWord
    }
    get activeTurnWord() {
        return this._activeTurnWord
    }
    get switching() {
        return this._switching
    }
    get checked() {
        return this._checked
    }
    get modalDelTimeout() {
        return this._modalDelTimeout
    }
    get cancelDeleteColl() {
        return this._cancelDeleteColl
    }


}