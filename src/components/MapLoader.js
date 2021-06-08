/* eslint-disable require-jsdoc */
import Floor from './Floor.js'
import Player from './Player.js'
import Wall from './Wall.js'

export default class MapLoader {
    constructor() { }

    load(map) {
        console.log(map)
        const size = 10

        let objs = [new Floor(map[0].length * size, map.length * size)]
        for (let i = 0; i < map[0].length; i++) {
            for (let j = 0; j < map.length; j++) {
                console.log(i, j)
                if (map[j][i] === '#') objs.push(
                    new Wall(size, i * size - ((map[0].length * size - size) / 2),
                    j * size - parseInt((map.length * size - size) / 2))
                )
            }
        }
        return objs
    }
}