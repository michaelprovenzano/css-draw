class LayersPanelView {
  constructor(listEl, options) {
    if (!options) options = {};
    this.element = listEl;
    this.draggedElement = null;
    this.dropFailed = false;
    this.target = null;
    this.hoverPosition = null;
    this.divider = {
      element: document.createElement('li', { id: 'divider' }),
      active: false,
    };

    // Initialize
    this.divider.element.classList.add('divider');
    this.children = flattenChildren([...listEl.children]);
    this.betweenSensitivity = options.betweenSensitivity || 0.2;

    this.children.forEach(el => el.setAttribute('draggable', 'true'));

    this.element.addEventListener('click', function (event) {
      if (
        event.target.getAttribute('data-list-component') === 'group-name' ||
        event.target.getAttribute('data-list-component') === 'group-expand-btn'
      ) {
        event.target.closest('.list-component-group').classList.toggle('collapsed');
      }
    });

    // Bindings
    this.dragEnd = this.dragEnd.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.makeAllInactive = this.makeAllInactive.bind(this);
    this.nestElement = this.nestElement.bind(this);
    this.recalculateChildren = this.recalculateChildren.bind(this);
    this.removeDivider = this.removeDivider.bind(this);
    this.setHoverPosition = this.setHoverPosition.bind(this);

    // Event Listeners
    this.element.addEventListener('dragstart', this.dragStart);
    this.element.addEventListener('drop', this.drop);
    this.element.addEventListener('dragover', this.dragOver);
    this.element.addEventListener('dragleave', this.dragLeave);
    this.element.addEventListener('dragend', this.dragEnd);
  }

  addLayer(layer, options) {
    let className = '';
    if (layer.active) className = 'active';
    if (!options) options = {};
    const html = `<li id="for-${options.targetId}" class="${className}" draggable="true">${layer.name}</li>`;
    this.element.insertAdjacentHTML('afterbegin', html);
    this.recalculateChildren();
  }

  dragStart(event, callback) {
    // Initialize drop failed
    this.dropFailed = true;

    // Grab the target element index for later
    const targetIndex = this.children.indexOf(event.target);
    event.dataTransfer.setData('text', targetIndex);

    // Cache it for easy reference
    this.draggedElement = event.target;
    this.draggedElement.classList.add('active-drag');

    if (callback) callback();
  }

  dragOver(event, callback) {
    event.preventDefault();
    const divider = this.divider.element;

    this.mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };

    this.draggedElement.style.display = 'none';
    if (
      event.target !== divider &&
      event.target !== this.element &&
      event.target.getAttribute('data-list-component') !== 'group' &&
      event.target.getAttribute('data-list-component') !== 'group-body'
    ) {
      // Cache the current target
      if (event) this.target = event.target;

      // Update the target bounds
      this.targetBounds = event.target.getBoundingClientRect();

      // Set the hover position based on new bounds
      this.setHoverPosition();
    }

    if (event.target !== this.element) {
      event.target.classList.remove('hover');
    }

    if (this.hoverPosition === 'bottom' && !this.isGroupComponent(event.target)) {
      if (event.target === this.element || event.target === divider) return;
      // console.log('bottom');
      if (!divider) {
        event.target.insertAdjacentElement('afterend', this.divider.element);
        divider = event.target.nextSibling;
      } else {
        event.target.parentNode.insertBefore(divider, event.target.nextSibling);
      }
    }

    if (this.hoverPosition === 'top' && !this.isGroupComponent(event.target)) {
      if (event.target === this.element || event.target === divider) return;
      // console.log('top');

      if (!divider) {
        event.target.insertAdjacentElement('beforebegin', this.divider.element);
        divider = event.target.nextSibling;
      } else {
        event.target.parentNode.insertBefore(divider, event.target);
      }
    }

    if (this.hoverPosition === 'top' && this.isGroupComponent(event.target, 'group-name')) {
      if (event.target === this.element || event.target === divider) return;
      // console.log('top');
      if (!divider) {
        event.target.parentNode.insertAdjacentElement('beforebegin', this.divider.element);
        divider = event.target.parentNode.previousSibling;
      } else {
        event.target.parentNode.insertBefore(divider, event.target);
      }
    }

    if (
      this.hoverPosition === 'center' &&
      !this.isGroupComponent(event.target, 'group') &&
      !this.isGroupComponent(event.target, 'group-body')
    ) {
      if (event.target !== this.element) event.target.classList.add('hover');
      this.removeDivider();
    }

    if (callback) callback();
  }

  dragEnd(event) {
    // Reset the style attribute on the layer if the drop failed
    if (this.dropFailed) {
      this.draggedElement.setAttribute('style', '');
      this.removeDivider();
    }
    this.dropSuccess = true;
  }

  dragLeave(event, callback) {
    event.target.classList.remove('hover');

    if (callback) callback();
  }

  drop(event, callback) {
    this.dropFailed = false;

    const targetIndex = event.dataTransfer.getData('text');
    const thisEl = this.children[targetIndex];

    // Remove all helper styles/elements
    this.removeDivider();
    event.target.classList.remove('hover');
    this.draggedElement.classList.remove('active-drag');
    this.draggedElement.style.removeProperty('display');

    // Place element
    if (this.hoverPosition === 'top' && !this.isGroupComponent(this.target))
      this.target.insertAdjacentElement('beforebegin', thisEl);
    if (this.hoverPosition === 'bottom' && !this.isGroupComponent(this.target))
      this.target.insertAdjacentElement('afterend', thisEl);
    if (this.hoverPosition === 'center') this.nestElement(this.target, thisEl);

    // Place before group if dropped on top of group name
    if (this.hoverPosition === 'top' && this.isGroupComponent(this.target, 'group-name'))
      this.target.parentNode.insertAdjacentElement('beforebegin', thisEl);

    event.dataTransfer.clearData();

    this.recalculateChildren();

    // Optional callback
    if (callback) callback();
  }

  getLayerElementById(id) {
    return document.getElementById(`for-${id}`);
  }

  isGroupComponent(element, type) {
    const thisType = element.getAttribute('data-list-component');
    if (type) return thisType === type;
    if (thisType === 'group' || thisType === 'group-name' || thisType === 'group-body') {
      return true;
    }
  }

  nestElement(target, thisEl) {
    if (target.getAttribute('data-list-component') === 'group-name') {
      target.nextSibling.insertAdjacentElement('beforeend', thisEl);
    } else if (target.getAttribute('data-list-component') === 'group') {
      target.lastChild.insertAdjacentElement('beforeend', thisEl);
    } else if (target.getAttribute('data-list-component') === 'group-body') {
      target.insertAdjacentElement('beforeend', thisEl);
    } else {
      const li = document.createElement('li');
      li.setAttribute('draggable', 'true');
      li.setAttribute('data-list-component', 'group');
      li.classList.add('list-component-group');
      li.innerHTML = `
    <div class="group list-component-group-name" data-list-component="group-name">
    	<span class="expand-icon expanded" data-list-component="group-expand-btn">&rsaquo;</span>
    	group
    </div>`;
      const ul = document.createElement('ul');
      ul.setAttribute('data-list-component', 'group-body');
      ul.classList.add('list-component-group-body');
      li.insertAdjacentElement('beforeend', ul);
      target.insertAdjacentElement('beforebegin', li);
      ul.insertAdjacentElement('afterbegin', target);
      ul.insertAdjacentElement('afterbegin', thisEl);
    }
  }

  recalculateChildren() {
    // Must re-index children to reset correct position
    this.children = flattenChildren([...this.element.children]);
  }

  remove(layer) {
    const layerEl = this.getLayerElementById(layer.id);
    if (layerEl) layerEl.parentNode.removeChild(layerEl);
  }

  removeDivider(event) {
    const divider = this.divider.element;
    if (divider.parentNode) divider.parentNode.removeChild(divider);
  }

  makeActive(layer) {
    const layerEl = this.getLayerElementById(layer.id);
    if (layerEl) layerEl.classList.add('active');
  }

  makeAllInactive() {
    const children = flattenChildren(this.element.children);
    children.forEach(child => child.classList.remove('active'));
  }

  moveLayerForward(layer) {
    let thisLayer = this.getLayerElementById(layer.id);
    thisLayer.previousSibling.insertAdjacentElement('beforebegin', thisLayer);
  }

  moveLayerBackward(layer) {
    let thisLayer = this.getLayerElementById(layer.id);
    thisLayer.nextSibling.insertAdjacentElement('afterend', thisLayer);
  }

  setHoverPosition(event) {
    if (
      this.mousePosition.y >
      this.targetBounds.top +
        this.targetBounds.height -
        this.targetBounds.height * this.betweenSensitivity
    ) {
      this.hoverPosition = 'bottom';
    } else if (
      this.mousePosition.y <
      this.targetBounds.top + this.targetBounds.height * this.betweenSensitivity
    ) {
      this.hoverPosition = 'top';
    } else {
      this.hoverPosition = 'center';
    }
  }
}

function flattenChildren(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
    if (arr[i].children.length > 0) newArr.push(...flattenChildren([...arr[i].children]));
  }
  return newArr;
}

export default LayersPanelView;
