import { Vector } from 'p5';
import { RigidBody, RigidBodyProps } from '../objects/rigidbody.instance';

type BoxMap = [Vector, Vector, Vector, Vector];

export class CollisionManager {
    
    /**
     * Check if target intersects objects
     * @warning works with 'ellipse' RigidBodyType only 
     * @param target current game object that are checking
     * @param objects possible objects that target can intersect
     * @returns boolean
     */
    public static isInObjects(target: RigidBody, objects: Array<RigidBodyProps>): boolean {
        const targetProp = target.getProperties('object');
        for (let i = 0; i < objects.length; i++) {
            let objectProp = objects[i];
            if (CollisionManager.isInCollision(targetProp, objectProp)) return true;
        }
        return false;
    }

    /**
     * check if object intersects another object
     * @param target RigidBodyProps - first props of object;
     * @param object RigidBodyProps - second props of object;
     * @returns boolean
     */
    private static isInCollision(target: RigidBodyProps, object: RigidBodyProps): boolean {
        let objectMap = CollisionManager.createBoxMap(object);
        for (let i = 0; i < objectMap.length; i++) {
            let objectPos = objectMap[i];
            let targetPos = target.position;
            if (
                objectPos.x > targetPos.x &&
                objectPos.x < targetPos.x + target.width / 2 &&
                objectPos.y > targetPos.y &&
                objectPos.y < targetPos.y + target.height / 2
            ) return true;
        }
        return false;
    }

    /**
     * creates array of the corner points of area
     * @param props object properties
     * @returns [top-left, top-right, bottom-left, bottom-right] 
     */
    private static createBoxMap(props: RigidBodyProps): BoxMap {
        const { position, width, height } = props;
        //top-left
        let v1 = new Vector().set(
            position.x - (width / 2), position.y - (height / 2)
        );
        //top-right
        let v2 = new Vector().set(
            position.x + (width / 2), position.y - (height / 2)
        );
        //bottom-left
        let v3 = new Vector().set(
            position.x - (width / 2), position.y + (height / 2)
        );
        //bottom-right
        let v4 = new Vector().set(
            position.x + (width / 2), position.y + (height / 2)
        );
        return [v1, v2, v3, v4];
    }
}