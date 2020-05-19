class TransformHelper {
	constructor(options) {
		if (options) {
			this.borderWidth = options.borderWidth || 1;
			this.boxColor = options.boxColor || 'dodgerblue';			
		} else {
			this.borderWidth = 1;
			this.boxColor = 'dodgerblue';			
		}

		
		// Bindings ///////////////////
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.update = this.update.bind(this);
		this.set = this.set.bind(this);
	}
	
	add(shape) {
		this.target = shape;
		shape.transformHelper = this;
		
		this.top = shape.top - this.borderWidth;
		this.left = shape.left - this.borderWidth;
		this.height = shape.height + (this.borderWidth * 2);
		this.width = shape.width + (this.borderWidth * 2);
		this.rotation = this.target.rotation;
		
		const element = `
		<div class="transform-helper" id="transform-helper-box" style="top:${this.top}px; left:${this.left}px; width:${this.width}px; height:${this.height}px; transform: rotate(${this.rotation}deg); z-index:10000">
			<div class="anchor top-left corner"></div>
			<div class="anchor top-right corner"></div>
			<div class="anchor bottom-left corner"></div>
			<div class="anchor bottom-right corner"></div>
		</div>`;
		this.target.element.insertAdjacentHTML('beforebegin', element);
		this.box = this.target.element.previousSibling;
		return this;
	}
	
	remove() {
		if (this.box.parentNode && this.box) this.box.parentNode.removeChild(this.box);
		if (this.target) {
			this.target.transformHelper = null;
			this.target = null;			
		}
	}
	
	update() {
		this.width = this.target.width + (this.borderWidth * 2);
		this.height = this.target.height + (this.borderWidth * 2);
		this.top = this.target.top  - this.borderWidth;
		this.left = this.target.left  - this.borderWidth;
		this.rotation = this.target.rotation;
		
		this.box.style.top = `${this.top}px`;
		this.box.style.left = `${this.left}px`;
		this.box.style.width = `${this.width}px`;
		this.box.style.height = `${this.height}px`;
		this.box.style.transform = `rotate(${this.rotation}deg)`;
	}
	
	set(shape) {
		if ( this.box ) this.remove();
		this.add(shape);
	}
}

class Shape {
	constructor(options) {
		this.top = options.top;
		this.left = options.left;
		this.height = options.height || 0;
		this.width = options.width || 0;
		this.rotation = options.rotation || 0;
		this.type = options.type || 'rectangle';
		this.tag = options.tag || 'div';
		this.backgroundColor = options.backgroundColor || '#000000';
		this.id = options.id;
		this.name = `Layer ${options.id}`;
		this.active = true;
		this.zIndex = 1;
		
		// Bindings ///////
		this.add = this.add.bind(this);
		this.setSize = this.setSize.bind(this);
		this.setRotation = this.setRotation.bind(this);
		this.move = this.move.bind(this);
		this.update = this.update.bind(this);
		this.updateOnClick = this.updateOnClick.bind(this);
	}
	
	add(parent) {
		this.parent = parent;
		const element = `<${this.tag} class="shape ${this.type}" id="${this.id}" style="top:${this.top}px; left:${this.left}px; width:${this.width}px; height:${this.height}px; background:${this.backgroundColor}; z-index:${this.zIndex}"></${this.tag}>`;
		this.parent.insertAdjacentHTML('beforeend', element);
		this.element = this.parent.lastElementChild;
		return this;
	}
	
	move(left, top) {
		if (!this.clickEvent) return;
		this.top = top - this.clickEvent.y;
		this.left = left - this.clickEvent.x;
		this.update();		
	}
	
	setSize(width, height, origin) {
		this.width = width;
		this.height = height;
		this.update();
	}
	
	setRotation(deg) {
		this.rotation = deg;
		this.update();
	}
	
	setColor(color) {
		this.backgroundColor = color;
		this.element.style.backgroundColor = color;
		this.fillColor = color;
	}
	
	update() {
		this.element.style.top = `${this.top}px`;
		this.element.style.left = `${this.left}px`;
		this.element.style.width = `${this.width}px`;
		this.element.style.height = `${this.height}px`;
		this.element.style.zIndex = `${this.zIndex}`;
		this.element.style.transform = `rotate(${this.rotation}deg)`
		this.bounds = this.element.getBoundingClientRect();
		if (this.transformHelper) this.transformHelper.update();
		console.log(this);
	}
	
	updateOnClick(event) {
		this.clickEvent = {
			x: event.clientX - this.bounds.x,
			y: event.clientY - this.bounds.y
		}
	}
}

class Layers {
	constructor() {
		this.layers = [];
		
		this.add = this.add.bind(this);
		this.remove = this.remove.bind(this);
		this.getLayerById = this.getLayerById.bind(this);
		this.getLayerIndex = this.getLayerIndex.bind(this);
	}
	
	add(layerObject) {
		layerObject.zIndex = this.layers.length;
		this.layers.push(layerObject);
	}
	
	duplicate(layerObject, newId) {
		let layer = this.getLayerById(layerObject.id);
		let newLayer = new Shape(layer);
		
		newLayer.id = newId;
		newLayer.zIndex= newId;
		newLayer.name = newLayer.name + ' copy';
		
		newLayer.add(layer.parent);
		this.add(newLayer);
		newLayer.update();
	}
	
	getLayerById(id) {
		return this.layers.find(layer => layer.id === parseInt(id));
	}
	
	getLayerIndex(object) {
		let index = -1;
		for (let i = 0; i < this.layers.length; i++) {
			let layer = this.layers[i];
			if (layer.id === object.id) {
				index = i;
				break;
			}
		}
		return index;
	}
	
	moveLayerForward(layer) {
		const index = this.getLayerIndex(layer);
		if (index !== this.layers.length - 1) {
			// Switch z-index values
			this.layers[index].zIndex = index + 1;
			this.layers[index + 1].zIndex = index;
			
			// Switch values in array
			[this.layers[index + 1], this.layers[index]] = [this.layers[index], this.layers[index + 1]];
			
			// Update both layers
			this.layers[index].update();
			this.layers[index + 1].update();
		}
	}
	
	moveLayerBackward(layer) {
		const index = this.getLayerIndex(layer);	
		if (index !== 0) {
			// Switch z-index values
			this.layers[index - 1].zIndex = index;
			this.layers[index].zIndex = index - 1;
			
			// Switch values in array
			[this.layers[index - 1], this.layers[index]] = [this.layers[index], this.layers[index - 1]];
			
			// Update both layers
			this.layers[index].update();
			this.layers[index - 1].update();
		}
	}
	
	moveLayerToFront(layer) {
		const index = this.getLayerIndex(layer);
		
		this.layers.splice(index, 1)
		this.layers.push(layer);
		
		this.layers.forEach((layer, i) => {
				layer.zIndex = i;
				layer.update();
			}
		);
	}
	
	moveLayerToBack(layer) {
		const index = this.getLayerIndex(layer);
		
		this.layers.splice(index, 1)
		this.layers.unshift(layer);
		
		this.layers.forEach((layer, i) => {
				layer.zIndex = i;
				layer.update();
			}
		);
	}
	
	remove(object) {
		let index = this.getLayerIndex(object);
		
		object.transformHelper.remove();
		
		object.element.parentNode.removeChild(object.element);
		this.layers.splice(index, 1);
	}
	
	updateAll() {
		for (let layer of this.layers) {
			layer.update();
		}
	}
}

class Canvas {
	constructor(canvas) {
		this.element = canvas;
		this.bounds = this.element.getBoundingClientRect();
		this.id = 0;
		this.drawStart = {};
		this.drawEnd = {};
		this.isDrawing = false;
		this.shape = 'ellipse';
		this.activeLayer = undefined;
		this.mode = 'draw';
		this.editMode = 'select';
		this.layers = new Layers();
		this.transformHelper = new TransformHelper();
		this.modifiers = {
			altDown: false
		};
	
		// BINDINGS ///////////////////////
		this.keydown = this.keydown.bind(this);
		this.keyup = this.keyup.bind(this);
		this.makeActiveLayer = this.makeActiveLayer.bind(this);
		this.mousedown = this.mousedown.bind(this);
		this.mouseup = this.mouseup.bind(this);
		this.mousemove = this.mousemove.bind(this);
		this.drawShape = this.drawShape.bind(this);	
		
		canvas.addEventListener('mousedown', this.mousedown);
		canvas.addEventListener('mouseup', this.mouseup);
		canvas.addEventListener('mousemove', this.mousemove);
		
		// Key bindings
		document.addEventListener('keydown', this.keydown)
		document.addEventListener('keyup', this.keyup)
	}

	drawShape(options) {
		const shape = new Shape(options);
		const parent = this.element;
		
		this.makeActiveLayer(shape.add(parent));
		this.layers.add(shape);	
		
		this.transformHelper.set(shape);
		this.id++;
	}
	
	keydown(event) {
		switch(event.keyCode) {
			// alt
			case 18:
				this.modifiers.altDown = true;
				break;
			// delete
			case 46 || 8:
				this.layers.remove(this.activeLayer);
				break;
			// up
			case 38:
				this.layers.moveLayerForward(this.activeLayer);
				break;
			case 40:
				this.layers.moveLayerBackward(this.activeLayer);
				break;
			case 68:
				this.layers.duplicate(this.activeLayer, this.id);
				this.id++;
				break;
			default:
				break;
		}
	}
	
	keyup(event) {
		switch(event.keyCode) {
			// alt
			case 18:
				this.modifiers.altDown = false;
				this.editMode = 'select';
				break;
			default:
				break;
		}
	}
	
	makeActiveLayer(object) {
		if (this.activeLayer) this.activeLayer.active = false;
		this.activeLayer = object;
		this.activeLayer.active = true;
	}
	
	removeActiveLayer() {
		this.activeLayer.active = false;
		this.activeLayer = undefined;
	}
	
	mousedown(event) {	
		this.isDrawing = true;
		this.drawStart = copy(this.mousePosition);
		this.drawEnd = copy(this.mousePosition);
		this.transformOrigin = copy(this.mousePosition);
			
		const shapeOptions = {
			top: this.drawStart.y,
			left: this.drawStart.x,
			height: 0,
			width: 0,
			type: this.shape,
			id: this.id,
			backgroundColor: this.shapeColor
		}
		
		if (this.mode === 'draw') this.drawShape(shapeOptions);
		if (this.mode === 'edit') {
			// Get the target layer
			const target = this.layers.getLayerById(event.target.id);
			// If target layer exists and it isn't the helper make it active
			if (target && event.target.id !== 'transform-helper-box') this.makeActiveLayer(target);
			
			// Attach the helper to the active layer or remove if it doesn't exist
			if (this.activeLayer) {
				this.transformHelper.set(this.activeLayer) 
			} else {
				this.transformHelper.remove();
			};
			console.log(this.modifiers.altDown);
			// Change mode when clicking anchor
			if (event.target.classList.contains('anchor')) {
				this.modifiers.altDown ? this.editMode = 'rotate' : this.editMode = 'resize';
				
				// Set global transform origin to correct position
				this.setTransformOrigin(event);
			}
		}
		
		if (this.mode === 'edit' && this.activeLayer && event.target.id === 'transform-helper-box') {
			this.editMode = 'move';
			this.activeLayer.updateOnClick(event);
		}
	}
	
	mouseup(event) {		
		this.isDrawing = false;
		this.resize = false;
		if (this.activeLayer && this.mode === 'draw') {
			if (this.activeLayer.width === 0 || this.activeLayer.height === 0) {
				this.layers.remove(this.activeLayer);
			}
		}

		if (this.mode === 'edit') this.editMode === 'select';
	}
	
	mousemove(event) {
		const canvasBounds = this.bounds;
		this.mousePosition = {
			x: event.clientX - canvasBounds.left, 
			y: event.clientY - canvasBounds.top
		};
			
		if (this.isDrawing && this.mode === 'draw') {
			this.resizeActiveLayer();
		}
		
		if (this.isDrawing && this.editMode === 'resize' ) {
			this.resizeActiveLayer();
		}
		if (this.isDrawing && this.editMode === 'rotate' ) {
			this.rotateActiveLayer();
		}	
		if (
			this.isDrawing === true && 
			this.mode === 'edit' && 
			this.editMode === 'move' && 
			this.activeLayer) {
			
			this.activeLayer.move(this.mousePosition.x, this.mousePosition.y);											
		}
		}
	
		resizeActiveLayer() {
			if (this.mousePosition.x >= this.transformOrigin.x) {
				this.drawWidth = this.mousePosition.x - this.transformOrigin.x;
			} else {
				this.drawWidth = this.transformOrigin.x - this.mousePosition.x;
				this.activeLayer.left = this.transformOrigin.x - this.drawWidth;
			}
			
			if (this.mousePosition.y >= this.transformOrigin.y) {
				this.drawHeight = this.mousePosition.y - this.transformOrigin.y;
			} else {
				this.drawHeight = this.transformOrigin.y - this.mousePosition.y;
				this.activeLayer.top = this.transformOrigin.y - this.drawHeight;
			}
			
			this.activeLayer.setSize(this.drawWidth, this.drawHeight);
		}
	
		rotateActiveLayer() {
			if (this.mousePosition.x >= this.transformOrigin.x) {
				this.drawWidth = this.mousePosition.x - this.transformOrigin.x;
			}
			
			this.activeLayer.setRotation(45);
			console.log("rotating")
		}
	
		setTransformOrigin(event) {
			if (this.modifiers.altDown) {
				this.transformOrigin = {
					x: this.activeLayer.left - (this.activeLayer.width / 2),
					y: this.activeLayer.top - (this.activeLayer.height / 2)
				}
				return;
			}
			if (event.target.classList.contains('bottom-right')) {
				this.transformOrigin = {
					x: this.activeLayer.left,
					y: this.activeLayer.top
				}
			}
			if (event.target.classList.contains('bottom-left')) {
				this.transformOrigin = {
					x: this.activeLayer.left + this.activeLayer.width,
					y: this.activeLayer.top
				}
			}
			if (event.target.classList.contains('top-left')) {
				this.transformOrigin = {
					x: this.activeLayer.left + this.activeLayer.width,
					y: this.activeLayer.top + this.activeLayer.height
				}
			}
			if (event.target.classList.contains('top-right')) {
				this.transformOrigin = {
					x: this.activeLayer.left,
					y: this.activeLayer.top + this.activeLayer.height
				}
			}
		}
}

class LayersPanel {
	constructor({ element, layersListElement }) {
		this.element = element;
		this.layersListElement = layersListElement;
		
		this.clear = this.clear.bind(this);
		this.render = this.render.bind(this);
	}
	
	clear() {
		this.layersListElement.innerHTML = '';
	}
	
	render(layers) {
		this.clear();
		for (let layer of layers) {
			let className = '';
			if (layer.active) className = 'active';
			const html = `<li class="${className}">${layer.name}</li>`;
			this.layersListElement.insertAdjacentHTML('afterbegin', html);
		}
	}
}

class App {
	constructor(options) {
		this.canvas = new Canvas(options.canvas);
		this.layersPanel = new LayersPanel(options.layersPanel);
		this.menu = options.menu;
		
		this.mousedown = this.mousedown.bind(this);
		this.mouseup = this.mouseup.bind(this);
		this.keydown = this.keydown.bind(this);
		
		document.addEventListener('mousedown', this.mousedown);
		document.addEventListener('mouseup', this.mouseup);
		document.addEventListener('keydown', this.keydown);
	}
	
	mousedown(event) {
		this.layersPanel.render(this.canvas.layers.layers);
	}
	
	mouseup(event) {
		this.layersPanel.render(this.canvas.layers.layers);
	}
	
	keydown(event) {
		this.layersPanel.render(this.canvas.layers.layers);
	}
}

const appOptions = {
	canvas: document.getElementById('canvas'),
	layersPanel: {
		element: document.getElementById('layers-panel'),
		layersListElement: document.getElementById('layers-panel-list')
	}
}
const app = new App(appOptions);

const shapeBtns = [...document.querySelectorAll('.shape-btn')];
shapeBtns.forEach(el => el.addEventListener('click', function() {
	app.canvas.shape = el.getAttribute('data-shape');
}));

const modeBtns = [...document.querySelectorAll('.mode')];
modeBtns.forEach(el => el.addEventListener('click', function() {
	const mode = el.getAttribute('data-mode');
	console.log(app);
	app.canvas.mode = mode;
	app.canvas.element.className = mode;
}));

// Toggle the buttons in the button groups
const btnGroup = [...document.querySelectorAll('.ui-group')];
btnGroup.forEach(group => group.addEventListener('click', function(event) {
	const btns = [...group.children];
	btns.forEach(btn => btn.classList.remove('active'))
	const btn = event.target.closest('button')
	if (btn) btn.classList.add('active');
}));

const actionBtns = [...document.querySelectorAll('.btn-action')];
actionBtns.forEach(btn => btn.addEventListener('click', function(event) {
	switch(event.target.getAttribute('data-action')) {	
		case 'layer-front':
			app.canvas.layers.moveLayerToFront(app.canvas.activeLayer);
			break;
		case 'layer-forward':
			app.canvas.layers.moveLayerForward(app.canvas.activeLayer);
			break;
		case 'layer-backward':
			app.canvas.layers.moveLayerBackward(app.canvas.activeLayer);
			break;
		case 'layer-back':
			app.canvas.layers.moveLayerToBack(app.canvas.activeLayer);
			break;
		default:
			break;
	}
}))

// Set the current layer color
const colorPicker = document.getElementById('shape-color');
colorPicker.addEventListener('input', function() {
	app.canvas.shapeColor = colorPicker.value;
	if (app.canvas.activeLayer) app.canvas.activeLayer.setColor(app.canvas.shapeColor);
});

function copy(object) {
	return JSON.parse(JSON.stringify(object));
}