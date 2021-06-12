/* eslint-disable require-jsdoc */
import Ico from './components/Ico.js'

export default class MapLoader {
    constructor() { }

    load(map) {
        console.log(map)
        
        return [new Ico()]
    }
}