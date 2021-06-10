/* eslint-disable require-jsdoc */
import Floor from './Floor.js'
import Player from './Player.js'
import Cube from './Cube.js'

import wallTex from '../assets/wall.bmp'
import crateTex from '../assets/crate.jpg'

export default class MapLoader {
    constructor() {}

    load(map) {
        // console.log(map)
        const size = 10

        let objs = [new Floor(map[0].length * size, map.length * size)]
        let obj, player

        for (let i = 0; i < map[0].length; i++) {
            for (let j = 0; j < map.length; j++) {

                switch (map[j][i]) {
                case '#':
                    obj = new Cube(
                        size,
                        i * size - ((map[0].length * size - size) / 2),
                        j * size - parseInt((map.length * size - size) / 2),
                        wallTex,
                        false
                    )
                    break

                case '@':
                    player = { x: i, z: j }
                    break

                case '+':
                    break

                case '$':
                    break

                case '*':
                    break

                case '.':
                    break

                default:
                    break
                }

                objs.push(obj)
            }
        }
        return [player, objs]
    }
}