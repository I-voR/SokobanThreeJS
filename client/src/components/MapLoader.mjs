/* eslint-disable require-jsdoc */
import Ico from './Ico.mjs'
// import Player from './Player.mjs'

export default class MapLoader {
    constructor() { }

    load(map) {
        // return [new Player(this.scene, this.manager), new Ico()]
        return [new Ico()]
    }
}