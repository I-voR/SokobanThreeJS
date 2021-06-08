/* eslint-disable require-jsdoc */
// import Stats from 'three/examples/jsm/libs/stats.module.js'
//from 'https://cdn.skypack.dev/three@0.129.0'
import {
    LoadingManager,
    Clock,
    Vector3,
    GridHelper,
    Scene
} from 'three'

import MapLoader from './MapLoader.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'

export default class Main {
    constructor(container, map) {
        this.map = map
        this.isLoaded = null
        this.animation = null
        this.container = container

        this.scene = new Scene()
        this.renderer = new Renderer(this.container)

        this.camera = new Camera(30, (window.innerWidth / 2), window.innerHeight)
        this.camera.position.set(300, 100, 0)
        // this.camera.position.set(0, 500, 0)
        this.camera.lookAt(new Vector3(0, 0, 0))
        
        this.clock = new Clock()
        this.manager = new LoadingManager()
        const gridHelper = new GridHelper(250, 25)

        this.mapLoader = new MapLoader()
        this.objects = this.mapLoader.load(this.map)

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

        // this.objects.forEach(obj => {
        //     obj.update()
        // })

        requestAnimationFrame(this.render.bind(this))
    }
}
