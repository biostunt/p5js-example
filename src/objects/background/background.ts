import DrawEngine, { Image } from 'p5';
import { Grass } from './grass';
import { Sky } from './sky';
import { Sun } from './sun';
import { ObjectModel, ObjectModelContainer } from "../object.instance";
import { House } from './house';

export class Background extends ObjectModelContainer<ObjectModel> {

    constructor(engine: DrawEngine) {
        super(
            engine,
            [Sun, Sky, Grass, House].map(obj => new obj(engine))
        );
    }
}