import DrawEngine from 'p5';
import { ObjectModel } from "../object.instance"

export class Sun extends ObjectModel {
    
    private sunMap!: Array<number>;
    private sunRadius: number = 50;
    
    constructor(engine: DrawEngine) {
        super(engine, 9999);
    }

    public draw(): void {
        const { engine, sunRadius } = this;
        engine.noStroke()
        engine.fill('yellow');
        engine.circle(engine.width / 2,-1 * engine.height / 2, sunRadius * 2);
    }
}