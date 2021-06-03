import DrawEngine, { Vector } from 'p5';
import { Ball } from './objects/Ball';
import { IObject } from './objects/object.instance';

interface SketchOptions {
    canvas : {
        frameWidth: number,
        frameHeight: number,
        renderer: DrawEngine.RENDERER,
        parentId: string,
    },
    background: string,
    frameRate: number,
}


export default class Sketch {

    /**
     * Default options
     */
    public static options : SketchOptions = {
        canvas: {
            frameWidth: 700,
            frameHeight: 400,
            renderer: 'webgl',
            parentId: '#app',
        },
        background: 'white',
        frameRate: 60,
    }

    /**
     * Will Initialized when init
     */
    private _engine!: DrawEngine;

    private objects: Array<IObject> = [];

    constructor() {}

    /**
     * Entry point for sketch
     * @param engine P5
     */
    public init(engine: DrawEngine): void {
        this._engine = engine;
        this.initObjects();
        engine.setup = this.setup.bind(this);
        engine.draw = this.draw.bind(this);
    }

    /**
     * Engine setup function
     */
    public setup(): void {
        const { frameRate, background } = Sketch.options;
        this.initCanvas(this._engine);
        this.objects.forEach(object => object.setup());
        this._engine.background(background);
        this._engine.frameRate(frameRate);
    }

    /**
     * Function which executes every frame.
     */
    public draw(): void {
        const { background } = Sketch.options;
        const engine = this._engine;
        engine.background(background);
        this.objects.forEach(object => {
            engine.push();
            object.draw();
            engine.pop();
        })
    }

    /**
     * Creates canvas and initializing it on page.
     * @param engine P5
     * @returns canvas instance
     */
    private initCanvas(engine: DrawEngine): DrawEngine.Renderer {
        const {frameWidth, frameHeight, renderer, parentId} = Sketch.options.canvas
        const canvas = engine.createCanvas(frameWidth, frameHeight, renderer);
        canvas.parent(parentId);
        return canvas;
    }

    private initObjects(): void {
        const diameter = Sketch.options.canvas.frameWidth / 20;
        const { x, y, jumpHeight } = {
            x: (-1 * Sketch.options.canvas.frameWidth / 2) + (diameter),
            y: (Sketch.options.canvas.frameHeight / 2) - (diameter / 2),
            jumpHeight: Sketch.options.canvas.frameHeight * 0.75
        };
        console.log(jumpHeight);
        let ball = new Ball({ startPos: new Vector().set(x, y), diameter, jumpHeight }, this._engine);;
        this.objects.push(ball);
    }
}