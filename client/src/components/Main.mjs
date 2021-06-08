/* eslint-disable require-jsdoc */
// import Stats from 'three/examples/jsm/libs/stats.module.js'
import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Scene
} from 'https://cdn.skypack.dev/three@0.129.0'

import MapLoader from './MapLoader.mjs'
import Renderer from './Renderer.mjs'
import Camera from './Camera.mjs'

export default class Main {
    constructor(container, map) {
        this.map = map
        this.isLoaded = null
        this.animation = null
        this.container = container

        this.scene = new Scene()
        this.renderer = new Renderer(this.container)

        this.camera = new Camera(30, (window.innerWidth / 2 - 30), window.innerHeight)
        this.camera.position.set(0, 10, 0)
        this.camera.lookAt(new Vector3(-100, 100, 0))
        
        this.clock = new Clock()
        this.manager = new LoadingManager()
        // this.stats = new Stats()
        const gridHelper = new GridHelper(1000, 10)

        this.mapLoader = new MapLoader()
        this.objects = this.mapLoader.load(this.map)

        console.debug(this.objects)

        // this.player = this.objects[0]
        // this.player.load()

        for (let i = 0; i < this.objects.length; i++) {
            this.scene.add(this.objects[i])
        }

        // this.manager.onLoad = () => {
            // this.isLoaded = true
            // this.animation = new Animation(this.player.mesh)
            // this.animation.playAnim('Stand')
            // this.keyboard = new Keyboard(window, this.animation, this.player.mesh)
        // }

        this.scene.add(gridHelper)

        this.render()
    }

    render() {
        // let delta = this.clock.getDelta()
        // if (this.animation) this.animation.update(delta)

        this.renderer.setViewport(
            0, 0,
            innerWidth, innerHeight
        )

        this.renderer.render(this.scene, this.camera)
        this.objects.forEach(obj => {
            obj.update()
        })

        requestAnimationFrame(this.render.bind(this))
    }
}
