/* eslint-disable require-jsdoc */
import { AnimationMixer } from 'three'

export default class Animation {
    constructor(mesh) {
        this.mesh = mesh
        this.mixer = new AnimationMixer(this.mesh)
    }

    playAnim(animName) {
        this.animName = animName
        this.mixer.uncacheRoot(this.mesh)

        if (this.mixer.clipAction(this.animName)) this.mixer.clipAction(this.animName).play()
    }

    update(delta) {
        if (this.mixer) {
            this.mixer.update(delta)
        }
    }
}