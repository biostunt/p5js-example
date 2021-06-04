import DrawEngine, { Image, Vector } from 'p5';
import { IObject, ObjectModel } from "./object.instance";



export class Player extends ObjectModel {

    public currentPos: Vector;
    public startPos: Vector;

    private jumpSpeed: number = 10;
    private jumpDirection: 'up' | 'down' = 'up';
    private jumpHeight: number;

    private currentJumpSpeed: number = this.jumpSpeed;
    private shouldJump: boolean = false;
    
    private playerImage: Image;
    private playerWidth: number;
    private playerHeight: number;


    constructor(engine: DrawEngine) {
        super(engine, 9999);
    }
    public layer: number;

    public preload(): void {
        this.playerImage = this.engine.loadImage('http://localhost:3000/images/player.gif');
    }

    public setup(): void {
        const { engine } = this;
        this.playerWidth = engine.width / 10;
        this.playerHeight = engine.height / 4;
        this.jumpHeight = engine.height * 0.75;
        let x = (-1 * engine.width / 2) + this.playerHeight / 2;
        let y = (engine.height / 2) - (this.playerWidth * 2);
        this.startPos = new Vector().set(x, y)
        this.currentPos = new Vector().set(x, y);
        engine.mouseClicked = this.onMouseClicked.bind(this);
    }

    public draw(): void {
        const { engine,playerWidth, playerHeight, currentPos, playerImage } = this;
        engine.fill(255, 0, 0, 255);
        engine.noStroke();
        engine.image(playerImage, currentPos.x, currentPos.y, playerWidth, playerHeight);
        this.handleJump();
    }

    private onMouseClicked(event?: Object) {
        this.shouldJump = true;
    }

    private handleJump(): void {
        if (!this.shouldJump) return;
        const { jumpDirection, jumpHeight, currentJumpSpeed, jumpSpeed, startPos, playerHeight } = this;
        let x = this.currentPos.x;
        let y = this.currentPos.y;
        const maxHeight = startPos.y - jumpHeight;

        y = jumpDirection == 'up' ? y - currentJumpSpeed : y + currentJumpSpeed;
        this.currentJumpSpeed = 1 + (Math.abs(maxHeight - y) / Math.abs(maxHeight)) * jumpSpeed * 0.85;
        if (y <= (maxHeight + playerHeight))
            this.jumpDirection = 'down';
        if (y >= startPos.y) {
            this.shouldJump = false;
            x = startPos.x;
            y = startPos.y;
            this.jumpDirection = 'up';
        }
            
        this.currentPos.set(x, y);
    }

    
}