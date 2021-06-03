import P5 from 'p5';
import './style.scss';
import Sketch from './sketch';


const sketch = new Sketch();
new P5(sketch.init.bind(sketch));