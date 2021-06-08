/* eslint-disable require-jsdoc */
import { WebGLRenderer } from 'three'
// } from 'https://cdn.skypack.dev/three@0.129.0'

export default class Renderer extends WebGLRenderer {
    constructor(container) {
        super({ antialias: true })

        this.container = container
        this.container.appendChild(this.domElement)

        this.updateSize()
        document.addEventListener('DOMContentLoaded', () => { 
            this.updateSize(), false
        })
        window.addEventListener('resize', () => {
            this.updateSize(), false
        })
    }

    updateSize() {
        this.setSize(window.innerWidth, window.innerHeight)
    }
}
