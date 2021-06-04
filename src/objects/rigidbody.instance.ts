import DrawEngine, { Vector } from 'p5';
import { ObjectModel } from './object.instance';

type RigidBodyType = 'ellipse' | 'box';

export interface RigidBodyProps {
    position: Vector,
    width: number,
    height: number;
    /**
     * body type to check collision model.
     * @warning use only 'ellipse' type.
     */
    bodyType: RigidBodyType,
}

export class RigidBody extends ObjectModel {
    
    protected props!: RigidBodyProps;
    
    constructor(engine: DrawEngine, layer: number = 1000, props?: RigidBodyProps) {
        super(engine, layer)
        this.props = props;
    }
    
    public setProperties(props: RigidBodyProps) {
        this.props = props;
    }
    /**
     * Returns main body properties
     * @argument out type of output parameter
     * @returns [position: Vector, width: number, height: number] | RigidBodyProps;
     */
    public getProperties(out: 'bundle'): [Vector, number, number, RigidBodyType];
    public getProperties(out: 'object'): RigidBodyProps;
    public getProperties(out: 'bundle' | 'object'): [Vector, number, number, RigidBodyType] | RigidBodyProps {
        const { position, width, height, bodyType } = this.props;
        return out === 'bundle' ? [position, width, height, bodyType] : this.props;
    }

    /**
     * Sets the new center of rigidbody
     * @param position Vector;
     */
    public changePosition(position: Vector): void {
        this.props = {...this.props, position};
    }

}