/* eslint-disable require-jsdoc */
import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Scene
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import MapLoader from './MapLoader'
import Renderer from './Renderer'
import Camera from './Camera'
import Player from './Player'
import Keyboard from './Keyboard'
import Animation from './Animation'
import Config from './Config'
import Collisions from './Collisions'
import Cuboid from './Cuboid'

export default class Main {
    constructor(container, isPlayer) {
        document.getElementById('moves').innerText = 0
        Config.size = 70
        Config.width = Config.map[0].length
        Config.height = Config.map.length
        this.isLoaded = null
        this.animation = null
        this.collider = null
        this.container = container
        this.isPlayer = isPlayer

        this.scene = new Scene()
        this.clock = new Clock()
        this.manager = new LoadingManager()
        this.collisions = new Collisions()

        this.renderer = new Renderer(this.container)
        this.camera = new Camera(30, (window.innerWidth / 2), window.innerHeight)

        this.camera.position.set(900, 600, 0)
        this.camera.lookAt(new Vector3(0, 0, 0))
        
        // eslint-disable-next-line no-unused-vars
        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        const gridHelper = new GridHelper(700, 10)

        this.objects = new MapLoader().load()

        this.player = new Player(this.scene, this.manager, isPlayer)
        this.player.load()
        this.collider = new Cuboid(30, 0, 0, 3)
        this.scene.add(this.collider)

        this.scene.add(this.objects.floor)

        for (let i in this.objects.walls) {
            this.scene.add(this.objects.walls[i])
        }

        for (let i in this.objects.boxes) {
            this.scene.add(this.objects.boxes[i])
        }

        for (let i in this.objects.goals) {
            this.scene.add(this.objects.goals[i])
        }

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)

            this.player.mesh.position.set(
                Config.size * (2 * this.objects.player.x - Config.width + 1) / 2,
                24,
                Config.size * (2 * this.objects.player.z - Config.height + 1) / 2,
            )

            this.collider.position.x = this.player.mesh.position.x
            this.collider.position.z = this.player.mesh.position.z

            console.log(this.collider)

            if (isPlayer) {
                this.animation.playAnim('Stand')
                this.keyboard = new Keyboard(window, this.animation, this.player.mesh, this.collider)
            } else {
                this.animation.playAnim('stand')
            }
        }

        this.scene.add(gridHelper)

        this.render()
    }

    render() {
        let delta = this.clock.getDelta()
        if (this.animation) this.animation.update(delta)

        this.renderer.setViewport(
            0, 0,
            innerWidth, innerHeight
        )

        this.renderer.render(this.scene, this.camera)

        if (this.player.mesh && this.isPlayer) { 
            if (Config.move) {
                this.player.mesh.translateX(1)
                this.collider.translateX(1)
                if (parseInt(this.player.mesh.position.x - 35) % (Config.size) === 0 &&
                parseInt(this.player.mesh.position.z) % (Config.size) === 0) {
                    Config.move = false
                    this.animation.playAnim('CrStand')
                }
            }
        }

        for (let i in this.objects.goals) {
            this.objects.goals[i].update(
                this.collisions.detectCollisions(this.collider, this.objects.goals[i])
            )
        }

        requestAnimationFrame(this.render.bind(this))
    }
}
