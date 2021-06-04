import DrawEngine from 'p5';

export interface IObject {
    layer: number;
    preload?: () => void;
    setup: () => void;
    draw: () => void;
}

export abstract class ObjectModel implements IObject {

    public layer: number = 1;

    constructor(protected readonly engine: DrawEngine, layer: number = 1) {
        this.layer = layer;
    }

    public preload(): void {}
    public setup(): void {}
    public draw(): void {}

}