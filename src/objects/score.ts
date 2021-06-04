import DrawEngine, { Font } from 'p5';
import { StateManager } from '../managers/state-manager';
import { ObjectModel } from "./object.instance";



export class Score extends ObjectModel {
    
    public font: Font;
    
    constructor(engine: DrawEngine) {
        super(engine, 2000);
    }

    public preload(): void {
        this.font = this.engine.loadFont('http://192.168.0.102:3000/images/font.ttf');
    }

    draw() {
        const { engine } = this;
        const { width, height } = engine;
        engine.rectMode('center')
        engine.textFont(this.font)
        engine.fill(50);
        engine.textSize(20);
        engine.text(`Personal best: ${StateManager.bestUserScore}`, -1 * width / 2, -1 * height / 2 + 20);
        engine.text(`Score: ${StateManager.userScore}`, -1 * width / 2, -1 * height / 2 + 40);
    }
}