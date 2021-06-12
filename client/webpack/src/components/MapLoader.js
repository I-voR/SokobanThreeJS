/* eslint-disable require-jsdoc */
import Floor from './Floor'
import Cuboid from './Cuboid'
import Config from './Config'

export default class MapLoader {
    constructor() {}

    load() {
        let size = Config.size,
            width = Config.width,
            height = Config.height
            
        let objs = {
            floor: new Floor(width * size, height * size),
            player: { x: null, z: null },
            boxes: [],
            goals: [],
            walls: []
        }

        let obj

        for (let i in Config.map[0]) {
            for (let j in Config.map) {
                switch (Config.map[j][i]) {
                case '#':
                    obj = new Cuboid(
                        size, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 0
                    )
                    objs.walls.push(obj)
                    break

                case '@':
                    objs.player.x = i
                    objs.player.z = j
                    break

                case '+':
                    objs.player.x = i
                    objs.player.z = j
                    obj = new Cuboid(
                        size * 3 / 5, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 2
                    )
                    objs.goals.push(obj)
                    break

                case '$':
                    obj = new Cuboid(
                        size / 2, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 1
                    )
                    objs.boxes.push(obj)
                    break

                case '*':
                    obj = new Cuboid(
                        size / 2, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 1
                    )
                    objs.boxes.push(obj)

                    obj = new Cuboid(
                        size * 3 / 5, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 2
                    )
                    objs.goals.push(obj)
                    break

                case '.':
                    obj = new Cuboid(
                        size * 3 / 5, size * (2 * i - width + 1) / 2,
                        size * (2 * j - height + 1) / 2, 2
                    )
                    objs.goals.push(obj)
                    break

                default:
                    break
                }
            }
        }
        return objs
    }
}