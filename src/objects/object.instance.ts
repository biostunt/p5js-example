import DrawEngine from 'p5';

export interface IObject {
    layer: number;
    preload?: () => void;
    setup: () => void;
    draw: () => void;
}


export class ObjectModel implements IObject {

    public layer: number = 1;

    constructor(protected readonly engine: DrawEngine, layer: number = 1) {
        this.layer = layer;
    }

    public preload(): void {}
    public setup(): void {}
    public draw(): void {}

}

export class ObjectModelContainer<T extends ObjectModel> extends ObjectModel {
    
    protected objects: Array<T>;
    
    constructor(engine: DrawEngine, objects: Array<T> = []) {
        super(engine);
        this.objects = objects.sort((v1, v2) => v1.layer - v2.layer);
    }

    public preload(): void {
        this.objects.forEach(object => object.preload());
    }

    public setup(): void {
        this.objects.forEach(object => object.setup());
    }

    public draw(): void {
        const { objects, engine } = this;
        for (let i = 0; i < objects.length; i++) {
            engine.push();
            objects[i].draw();
            engine.pop();
        }
    }
}
