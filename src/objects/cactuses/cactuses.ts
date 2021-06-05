import DrawEngine, { Image, Vector } from 'p5';
import { ObjectModelContainer } from "../object.instance";
import {RigidBodyProps} from '../rigidbody.instance'
import { Cactus } from './cactus';

export class Cactuses extends ObjectModelContainer<Cactus> {
    
    private cactusCount: number = 2;
    private cactusAssetUrl: string = 'http://localhost:3000/images/cactus.png';
    private cactusImage: Image;
    
    private cactusWidth: number;
    private cactusHeight: number;

    constructor(engine: DrawEngine) {
        super(engine)
    }

    public preload(): void {
        super.preload();
        this.cactusImage = this.engine.loadImage(this.cactusAssetUrl);
    }
    public setup(): void {
        const { engine } = this;
        this.objects = new Array(this.cactusCount)
            .fill(1)
            .map(v => new Cactus(this.engine));
        const width = this.cactusWidth = engine.width / 10;
        const height = this.cactusHeight = engine.height / 5;
        this.objects.forEach((object, i) => {
            object.setCactusImage(this.cactusImage);
            object.setProperties({ width, height, position: this.createStartPosition(i), bodyType: 'ellipse' });
        });
        super.setup();        
    }
    public draw(): void {
        super.draw();
        this.recalculatePositions();
        //this.normalizeDistances();
    }

    public getCactusesProps(): Array<RigidBodyProps> {
        return this.objects.map(object => object.getProperties('object'));
    }

    private createStartPosition(i: number): Vector {
        const { engine, cactusCount, cactusHeight } = this;
        let x = (engine.width) + (i * (engine.width / cactusCount));
        let y = (engine.height / 2) - cactusHeight + engine.random(-5, 5);
        const vector = new Vector().set(x, y);
        return vector;
    }

    private recalculatePositions(): void {
        const { engine } = this;
        this.objects
            .map(object => object.getProperties('object').position)
            .forEach((pos, i) => {
                pos.x-=5
                if (pos.x <= (-1 * engine.width / 2) - (this.cactusWidth / 2)) {
                    const { x, y } = this.createStartPosition(i);
                    pos.x = x;
                    pos.y = y;
                }
            });
    }

    /**
     * @deprecated
     */
    private normalizeDistances() {
        const { engine, cactusCount } = this;
        const distance = engine.width / cactusCount
        const positions = this.objects.map(object => object.getProperties('object').position)
        for (let i = 1; i < positions.length; i++) {
            let pos1 = positions[i - 1];
            let pos2 = positions[i];
            let res = pos1.x - pos2.x;
            if (res > 0 && Math.abs(res) < distance) {
                pos1.x += -1 * ((distance - res) / 2 + 1);
                pos2.x += (distance - res) / 2 + 1;
            }
            if (Math.abs(res) < distance) {
                let additionalWidth = ((distance - res) / 2 + 1);
                pos1.x += res > 0 ? -1 * additionalWidth : additionalWidth;
                pos2.x += res > 0 ? additionalWidth : -1 * additionalWidth;
            }
        }
    }

    

}