import DrawEngine, {Image, Vector} from 'p5';
import { ObjectModel } from "../object.instance"

export class Sky extends ObjectModel {

    private skyBoxPos: Vector;
    private skyWidth: number;
    private skyHeight: number;


    private cloudCount: number = 5;
    private cloudAssetUrl: string = 'http://192.168.0.102:3000/images/cloud.png';
    
    private cloudImage: Image;
    private clouds: Array<Vector>;
    private cloudWidth: number;
    private cloudHeight: number;

    constructor(engine: DrawEngine) {
        super(engine,2);
    }

    public preload(): void {
        this.cloudImage = this.engine.loadImage(this.cloudAssetUrl);
    }

    public setup(): void {
        const { cloudImage, cloudCount, engine } = this;
        this.skyWidth = engine.width;
        this.skyHeight = engine.height / 2;
        this.skyBoxPos = new Vector().set(-1 * (engine.width / 2), -1 * (engine.height / 2))

        this.cloudWidth = engine.width / 10;
        this.cloudHeight = engine.height / 8;
        cloudImage.loadPixels();
        this.clouds = new Array(cloudCount)
            .fill(1)
            .map((v, i) => this.generateCloudPosition(i));
        console.log(this);
    }

    public draw(): void {
        this.drawSky();
        this.drawClouds();
    }

    private drawSky(): void {
        const { engine, skyBoxPos, skyWidth, skyHeight} = this;
        engine.push();
        engine.noStroke();
        engine.fill(96, 154, 255);
        engine.rect(skyBoxPos.x, skyBoxPos.y, skyWidth, skyHeight);
        engine.pop();
    }
    
    private drawClouds(): void {
        const { engine, clouds, cloudWidth, cloudHeight } = this;
        engine.push();
        for (let i = 0; i < clouds.length; i++) {
            const vector = clouds[i];
            engine.image(this.cloudImage, vector.x, vector.y, cloudWidth, cloudHeight);
        }
        engine.pop();
        this.recalculateCloudPos();
    }

    private recalculateCloudPos(): void {
        const { engine, cloudHeight } = this;
        this.clouds.forEach((pos, i) => {
            pos.x--;
            pos.y += engine.frameCount % 10 == 0 ? engine.random(-2, 2) : 0;
            pos.y += pos.y <= (-1 * engine.height / 2) + cloudHeight ? 4 : 0;
            if (pos.x <= -1 * (engine.width / 2 + this.cloudWidth)) {
                let np = this.generateCloudPosition(i);
                pos.x = np.x;
                pos.y = np.y;
            }
        });
    }

    private generateCloudPosition(i: number): Vector {
        const { engine, cloudCount, skyHeight, cloudHeight } = this;
        let x = engine.width / 2 + (i * engine.width / cloudCount);
        let y = -1 * (engine.height / 4) + engine.random(-1 * (skyHeight / 2) + cloudHeight, (skyHeight / 2) - cloudHeight);
        return new Vector().set(x, y);
    }
}