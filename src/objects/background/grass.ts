import DrawEngine from 'p5';
import { IObject, ObjectModel } from "../object.instance";

export class Grass extends ObjectModel{

    private waveMap!: Array<number>;
    private startHeight: number = 20;
    private waveHeight: number = 20;
    private distanceBetween: number = 10;

    constructor(engine: DrawEngine) {
        super(engine, 999);
    }

    public setup(): void {
        const { engine, distanceBetween, waveHeight } = this;
        this.waveMap = new Array(engine.width + 1)
            .fill(1)
            .map((v, i) => engine.sin(i))
            .filter((v, i) => i % distanceBetween === 0)
            .map(v => -1 * Math.abs(v * waveHeight));
    }

    public draw(): void {
        const { engine, waveMap, startHeight, distanceBetween } = this;
        engine.stroke('green');
        let startX = engine.width / 2 * -1;
        for (let i = 1; i < waveMap.length; i++) {
            engine.line(
                startX,
                Math.floor(engine.height / 2 - startHeight + waveMap[i - 1]),
                startX + distanceBetween,
                Math.floor(engine.height / 2 - startHeight + waveMap[i])
            );
            startX += distanceBetween;
        }
        this.waveMap.push(this.waveMap.shift());
    }
}