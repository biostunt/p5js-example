import { IObject } from "./object.instance";

interface BackgroundProps {
    frameWidth: number;
    frameHeight: number;
} 

export class Background implements IObject {
    
    constructor(private readonly props: BackgroundProps, private readonly engine){}

    public setup(): void {
        
    }
    
    public draw(): void {

    }

}