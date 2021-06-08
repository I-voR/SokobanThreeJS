/* eslint-disable require-jsdoc */
import { PerspectiveCamera } from 'three'
//  from 'https://cdn.skypack.dev/three@0.129.0'

export default class Camera extends PerspectiveCamera {
    constructor(fov, width, height) {        
        super(fov, width / height, 0.1, 10000)    
        
        this.width = width
        this.height = height
        this.updateSize()
        window.addEventListener('resize', () => this.updateSize(), false)
    }

    updateSize() {
        this.aspect = this.width / this.height
        this.updateProjectionMatrix()
    }
}
