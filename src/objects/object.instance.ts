import DrawEngine from 'p5';

export interface IObject {
    layer: number;
    preload: () => void;
    setup: () => void;
    draw: () => void;
}