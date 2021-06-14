/* eslint-disable require-jsdoc */
import { 
    FontLoader,
    Mesh,
    MeshBasicMaterial,
    TextGeometry
} from 'three'

import textFont from '../assets/optimer_regular.typeface.json'

export default class Text extends Mesh{
    constructor(x, z, text) {
        super(
            new TextGeometry(text, {
                font: new FontLoader().parse(textFont),
                size: 16,
                height: 4
            }),
            new MeshBasicMaterial({
                color: 0xffff00
            })
        )
        this.position.set(x, 2, z)
        this.rotation.x = -Math.PI / 2
    }
}
