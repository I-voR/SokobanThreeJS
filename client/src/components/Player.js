/* eslint-disable require-jsdoc */
// import Stats from 'three/examples/jsm/libs/stats.module.js'
import {
    Scene,
    LoadingManager,
    Clock,
    Vector3,
    GridHelper
} from 'https://cdn.skypack.dev/three@0.129.0'
import Renderer from './Renderer.js'
import Camera from './Camera.js'

export default class Player {
    constructor(container, objects) {
        this.isLoaded = null
        this.animation = null
        this.container = container
        this.objects = objects

        this.scene = new Scene()
        this.renderer = new Renderer(this.container)

        this.camera = new Camera(30, (window.innerWidth / 2 - 30), window.innerHeight)
        this.camera.position.set(0, 10, 0)
        this.camera.lookAt(new Vector3(0, 0, 0))
        
        this.clock = new Clock()
        this.manager = new LoadingManager()
        // this.stats = new Stats()
        const gridHelper = new GridHelper(1000, 10)

        this.objects.forEach(obj => {
            this.scene.add(obj)
        })     

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
        this.objects.forEach(obj => {
            obj.update()
        })

        requestAnimationFrame(this.render.bind(this))
    }
}
