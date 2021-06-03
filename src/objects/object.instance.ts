import DrawEngine from 'p5';

export interface IObject {
    setup: () => void;
    draw: () => void;
}