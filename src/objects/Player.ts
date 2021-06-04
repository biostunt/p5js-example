import DrawEngine, { Image, Vector } from 'p5';
import { IObject, ObjectModel } from "./object.instance";
import { RigidBody } from './rigidbody.instance';



export class Player extends RigidBody {

    public startPos: Vector;

    private jumpSpeed: number = 10;
    private jumpDirection: 'up' | 'down' = 'up';
    private jumpHeight: number;

    private currentJumpSpeed: number = this.jumpSpeed;
    private shouldJump: boolean = false;
    
    private playerImage: Image;

    constructor(engine: DrawEngine) {
        super(engine);
    }
    public layer: number;

    public preload(): void {
        this.playerImage = this.engine.loadImage('http://localhost:3000/images/player.gif');
    }

    public setup(): void {
        const { engine } = this;
        this.jumpHeight = engine.height * 0.75;
        let width = engine.width / 10;
        let height = engine.height / 4;
        let x = (-1 * engine.width / 2) + height / 2;
        let y = (engine.height / 2) - (width * 2);
        this.startPos = new Vector().set(x, y);
        this.setProperties({
            width,
            height,
            position: new Vector().set(x, y),
            bodyType: 'ellipse'
        })
        engine.mousePressed = this.onMousePressed.bind(this);
    }

    public draw(): void {
        const { engine, playerImage } = this;
        const { width, height, position } = this.props;
        engine.fill(255, 0, 0, 255);
        engine.noStroke();
        engine.image(playerImage, position.x, position.y, width, height);
        this.handleJump();
    }

    private onMousePressed(event?: Object) {
        this.shouldJump = true; 
    }

    private handleJump(): void {
        if (!this.shouldJump) return;
        const { jumpDirection, jumpHeight, currentJumpSpeed, jumpSpeed, startPos } = this;
        const { position, height } = this.props;
        let x = position.x;
        let y = position.y;
        const maxHeight = startPos.y - jumpHeight;

        y = jumpDirection == 'up' ? y - currentJumpSpeed : y + currentJumpSpeed;
        this.currentJumpSpeed = 1 + (Math.abs(maxHeight - y) / Math.abs(maxHeight)) * jumpSpeed * 0.85;
        if (y <= (maxHeight + height))
            this.jumpDirection = 'down';
        if (y >= startPos.y) {
            this.shouldJump = false;
            x = startPos.x;
            y = startPos.y;
            this.jumpDirection = 'up';
        }
        this.changePosition(new Vector().set(x, y))
    }

    
}