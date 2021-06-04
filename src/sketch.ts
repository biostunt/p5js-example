import DrawEngine, { Vector } from 'p5';
import { Background } from './objects/background';
import { Player } from './objects/player';
import {  ObjectModel } from './objects/object.instance';

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

    private objects: Array<ObjectModel> = [];

    constructor() {}

    /**
     * Entry point for sketch
     * @param engine P5
     */
    public init(engine: DrawEngine): void {
        this._engine = engine;
        this.initObjects();
        engine.preload = this.preload.bind(this);
        engine.setup = this.setup.bind(this);
        engine.draw = this.draw.bind(this);
    }

    /**
     * Executes before P5 setup method 
     * also before @see this.setup
     */
    public preload(): void {
        this.objects.forEach((object) => object.preload());
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
        const { objects } = this;
        const engine = this._engine;
        engine.background(background);
        for (let i = 0; i < objects.length; i++) {
            engine.push();
            objects[i].draw();
            engine.pop();
        }
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

    /**
     * That feature will be deprecated in future.
     * But now creates object instances for scenes
     */
    private initObjects(): void {
        this.objects.push(new Player(this._engine));
        this.objects.push(new Background(this._engine));
        
        //this line required for layer definition
        this.objects.sort((v1, v2) => v1.layer - v2.layer);
    }   
}