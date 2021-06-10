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

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import MapLoader from './MapLoader.js'
import Renderer from './Renderer.js'
import Camera from './Camera.js'

import player1MD2 from '../assets/player1.md2'
import player2MD2 from '../assets/player2.md2'
import Player from './Player.js'

export default class Main {
    constructor(container, map, isPlayer) {
        this.map = map
        this.isLoaded = null
        this.animation = null
        this.container = container

        this.scene = new Scene()
        this.renderer = new Renderer(this.container)

        this.camera = new Camera(30, (window.innerWidth / 2), window.innerHeight)
        this.camera.position.set(150, 100, 0)
        // this.camera.position.set(0, 500, 0)
        this.camera.lookAt(new Vector3(0, 0, 0))
        
        this.clock = new Clock()
        this.manager = new LoadingManager()
        const gridHelper = new GridHelper(250, 25)

        this.objects = new MapLoader().load(this.map, isPlayer)

        this.player = new Player(this.scene, this.manager, isPlayer)
        this.player.load(isPlayer ? player1MD2 : player2MD2)

        for (let i = 0; i < this.objects[1].length; i++) {
            this.scene.add(this.objects[1][i])
        }

        this.manager.onLoad = () => {
            this.isLoaded = true
            this.animation = new Animation(this.player.mesh)
            this.animation.playAnim('Stand')
            this.player.mesh.position.set(this.objects[0].x, 0, this.objects[0].z)
            if (isPlayer) this.keyboard = new Keyboard(window, this.animation, this.player.mesh)
        }

        this.scene.add(gridHelper)
        const controls = new OrbitControls( this.camera, this.renderer.domElement )

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
