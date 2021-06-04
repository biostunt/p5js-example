import DrawEngine from 'p5';


export function loadImageAsync(engine: DrawEngine, url: string): Promise<DrawEngine.Image> {
    return new Promise((resolve, reject) => {
        engine.loadImage(url, (image) => {
            console.log(1111);
            console.log(image);
            resolve(image)
        }, (ev) => {
            console.log('errror');
            reject(ev)
        });
    });
} 