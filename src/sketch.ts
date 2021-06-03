import DrawEngine from 'p5';

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
            frameHeight: 500,
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

    constructor() {}

    /**
     * Entry point for sketch
     * @param engine P5
     */
    public init(engine: DrawEngine): void {
        this._engine = engine;
        engine.setup = this.setup.bind(this);
        engine.draw = this.draw.bind(this);
    }

    /**
     * Engine setup function
     */
    public setup(): void {
        const { frameRate, background } = Sketch.options;
        this.initCanvas(this._engine);
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

        
        engine.fill('orange');
        engine.noStroke();
        engine.ellipse(this.x, this.y, 20, 20);
        engine.pop();

        this.x++;
        this.y++;
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

    private initObjects()
}