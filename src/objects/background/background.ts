import DrawEngine, { Image } from 'p5';
import { Grass } from './grass';
import { Sky } from './sky';
import { Sun } from './sun';
import { ObjectModel } from "../object.instance";
import { House } from './house';

export class Background extends ObjectModel {

    private objects: Array<ObjectModel> = [];

    constructor(engine: DrawEngine) {
        super(engine, 1);
        const objects = [Sun, Sky, Grass, House];
        objects
            .forEach(obj => this.objects.push(new obj(engine)));
        this.objects.sort((v1, v2) => v1.layer - v2.layer);
    }

    public preload(): void {
        this.objects.forEach(object => object.preload());
    }

    public setup(): void {
        this.objects.forEach(object => object.setup());
    }
    
    public draw(): void {
        this.objects.forEach(object => object.draw());
    }

}