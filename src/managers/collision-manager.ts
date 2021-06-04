import DrawEngine from 'p5';
import { RigidBody } from '../objects/rigidbody.instance';

export class CollisionManager {
    constructor(private readonly engine: DrawEngine) { }
    
    /**
     * Check if target intersect some objects
     * 
     * @param target current game object that are checking
     * @param object possible objects that target can intersect
     * @returns does target intersects objects
     */
    public isInObjects(target: RigidBody, object: Array<RigidBody>): boolean {
        const [position, width, height, bodyType] = target.getProperties('bundle');

        

        return true;
    }
}