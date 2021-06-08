/* eslint-disable require-jsdoc */
import Ico from './Ico.js'
// import Player from './Player.js'

export default class MapLoader {
    constructor() { }

    load(map) {
        // return [new Player(this.scene, this.manager), new Ico()]
        return [new Ico()]
    }
}