import ShapeModel from '../models/shapeModel';
import ShapeView from '../views/shapeView';
import LayerController from './layerController';

class Shape extends LayerController {
  constructor(options) {
    super(options);
    this.type = 'shape';
  }
}

export default Shape;
