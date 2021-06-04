import { throws } from 'assert/strict';
import DrawEngine, { Image, Vector } from 'p5';
import { ObjectModel } from "../object.instance"

export class House extends ObjectModel {

    private imageAssetUrl: string = 'http://192.168.0.102:3000/images/house.png';
    private houseImage: Image;
    
    private pos: Vector;
    private houseWidth: number;
    private houseHeight: number;

    constructor(engine: DrawEngine) {
        super(engine, 800);
    }

    public preload(): void {
        this.houseImage = this.engine.loadImage(this.imageAssetUrl);
    }

    public setup(): void {
        const { engine } = this;
        this.houseImage.loadPixels();
        this.houseWidth = engine.width / 10;
        this.houseHeight = engine.height / 5;
        this.pos = this.getStartPos();
    }

    public draw(): void {
        const { engine,houseImage, pos, houseWidth, houseHeight } = this;
        engine.image(houseImage, pos.x, pos.y, houseWidth, houseHeight);
        this.recalculatePosition();
    }

    private recalculatePosition(): void {
        const { engine, pos, houseWidth } = this;
        pos.x--;
        if (pos.x + houseWidth <= -1 * (engine.width / 2))
            this.pos = this.getStartPos();
    }

    private getStartPos(): Vector {
        const { engine, houseHeight } = this;
        return new Vector().set(engine.width / 2, 0);
    }
}