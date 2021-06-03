import DrawEngine, { Vector } from 'p5';
import { IObject } from "./object.instance";

interface BallProps {
    startPos: Vector,
    diameter: number,
    jumpHeight: number;
}

export class Ball implements IObject {
    
    public currentPos: Vector;


    private jumpSpeed: number = 10;
    private jumpDirection: 'up' | 'down' = 'up';
    private jumpHeight: number;

    private currentJumpSpeed: number = this.jumpSpeed;
    private shouldJump: boolean = true;
    
    constructor(private readonly props: BallProps, private readonly engine: DrawEngine) {
        this.currentPos = new Vector().set(props.startPos.x, props.startPos.y);
        this.jumpHeight = props.jumpHeight;
    }

    public setup(): void {
        const { engine } = this;
        engine.mouseClicked = this.onMouseClicked.bind(this);
    }

    public draw(): void {
        const { engine } = this;
        this.handleJump();
        engine.fill('orange');
        engine.noStroke();
        engine.circle(this.currentPos.x, this.currentPos.y,this.props.diameter );
    }

    private onMouseClicked(event?: Object) {
        this.shouldJump = true;
    }

    private handleJump(): void {
        if (!this.shouldJump) return;
        const { jumpDirection, jumpHeight, currentJumpSpeed, jumpSpeed } = this;
        const { startPos, diameter } = this.props;
        let x = this.currentPos.x;
        let y = this.currentPos.y;
        const maxHeight = startPos.y - jumpHeight;

        y = jumpDirection == 'up' ? y - currentJumpSpeed : y + currentJumpSpeed;
        this.currentJumpSpeed = 1 + (Math.abs(maxHeight - y) / Math.abs(maxHeight)) * jumpSpeed * 0.85;
        if (y <= maxHeight + diameter / 2)
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