/* eslint-disable require-jsdoc */
import Floor from './Floor'
import Cuboid from './Cuboid'
import Text from './Text'
import Config from './Config'

export default class MapLoader {
    constructor() {}

    load() {
        let size = Config.size,
            width = Config.map[0].length,
            height = Config.map.length
            
        let objs = {
            floor: new Floor(width * size, height * size),
            player: { x: null, z: null },
            boxes: [],
            goals: [],
            walls: [],
            windRose: [],
            collider: null
        }

        let obj

        obj = new Cuboid(
            size, size * (-Config.map[0].length / 2 + 2),
            size * (Config.map.length / 2 + 4), 4
        )
        objs.windRose.push(obj)

        obj = new Cuboid(
            size, size * (-Config.map[0].length / 2 + 2),
            size * (Config.map.length / 2 + 4), 4
        )
        obj.rotation.y = Math.PI / 2
        objs.windRose.push(obj)

        obj = new Text(
            size * (-Config.map[0].length / 2 + 2) - 8,
            size * (Config.map.length / 2 + 4) - 48, 'U'
        )
        objs.windRose.push(obj)

        obj = new Text(
            size * (-Config.map[0].length / 2 + 2) - 52,
            size * (Config.map.length / 2 + 4) + 8, 'L'
        )
        objs.windRose.push(obj)

        obj = new Text(
            size * (-Config.map[0].length / 2 + 2) - 8,
            size * (Config.map.length / 2 + 4) + 64, 'D'
        )
        objs.windRose.push(obj)

        obj = new Text(
            size * (-Config.map[0].length / 2 + 2) + 40,
            size * (Config.map.length / 2 + 4) + 8, 'R'
        )
        objs.windRose.push(obj)

        for (let i in Config.map[0]) {
            for (let j in Config.map) {
                switch (Config.map[j][i]) {
                case '#':
                    obj = new Cuboid(
                        size, size * i,
                        size * j, 0
                    )
                    objs.walls.push(obj)
                    break

                case '@':
                    objs.player.x = i
                    objs.player.z = j
                    objs.collider = new Cuboid(30, 0, 0, 3)
                    break

                case '+':
                    objs.player.x = i
                    objs.player.z = j
                    objs.collider = new Cuboid(30, 0, 0, 3)

                    obj = new Cuboid(
                        size * 3 / 5, size * i,
                        size * j, 2
                    )
                    objs.goals.push(obj)
                    break

                case '$':
                    obj = new Cuboid(
                        size / 2, size * i,
                        size * j, 1
                    )
                    objs.boxes.push(obj)
                    break

                case '*':
                    obj = new Cuboid(
                        size / 2, size * i,
                        size * j, 1
                    )
                    objs.boxes.push(obj)

                    obj = new Cuboid(
                        size * 3 / 5, size * i,
                        size * j, 2
                    )
                    objs.goals.push(obj)
                    break

                case '.':
                    obj = new Cuboid(
                        size * 3 / 5, size * i,
                        size * j, 2
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
