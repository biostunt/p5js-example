import DrawEngine, { Image } from 'p5';
import { IObject } from "./object.instance";

export class Background implements IObject {
    
    constructor(private readonly engine: DrawEngine){}

    /**
     * Variable defines with what frequence do elements will update in this object;
     */
    private updateFrequency: number = 1;

    // Grass constants
    private waveMap!: Array<number>;
    private startHeight: number = 20;
    private waveHeight: number = 20;
    private distanceBetween: number = 10;
    
    //sky constants
    private cloudImage: Image;

    // Sun constants
    private sunMap!: Array<number>;
    private sunRadius: number = 50;

    

    public setup(): void {
        this.setupSky();
        this.setupGrass();
    }
    
    public draw(): void {
        this.drawSky();
        this.drawSun();
        this.drawGrass();
    }

    private setupSky(): void {
        //this.cloudImage = this.engine.loadImage('../assets/cloud.jpg', () => console.log('success'), () => console.log('fail'));
    }

    private drawSky(): void {
        const { engine } = this;
        engine.push();

        engine.pop();

    }

    private drawSun(): void {
        const { engine } = this;
        engine.push();
        engine.noStroke()
        engine.fill('yellow');
        engine.circle(engine.width / 2, engine.height / -2, 100);
        engine.pop();
    }

    private setupGrass(): void {
        const { engine, distanceBetween, waveHeight } = this;
        this.waveMap = new Array(engine.width + 1)
            .fill(1)
            .map((v, i) => engine.sin(i))
            .filter((v, i) => i % distanceBetween === 0)
            .map(v => -1 * Math.abs(v * waveHeight));
    }
    private drawGrass(): void {
        const { engine, waveMap, startHeight, distanceBetween, updateFrequency } = this;
        engine.push();
        engine.stroke('green');
        //engine.strokeWeight(5);
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
        if (engine.frameCount % updateFrequency == 0) this.waveMap.push(this.waveMap.shift());
        engine.pop();
    }

}