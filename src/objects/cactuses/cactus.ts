import DrawEngine, { Image, Vector } from 'p5';
import { ObjectModel } from "../object.instance";
import { RigidBody } from '../rigidbody.instance';


export class Cactus extends RigidBody {
    
    private cactusImage!: Image;

    constructor(engine: DrawEngine) {
        super(engine);
    }

    public setup(): void {
    }

    public draw(): void {
        const { engine, cactusImage } = this;
        const { position, width, height } = this.props;
        engine.image(cactusImage, position.x, position.y, width, height);
    }

    public setCactusImage(cactusImage: Image) {
        this.cactusImage = cactusImage;
    }
}