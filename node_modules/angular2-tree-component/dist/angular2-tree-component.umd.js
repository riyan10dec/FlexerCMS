(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('ng2-mobx'), require('lodash'), require('mobx')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'ng2-mobx', 'lodash', 'mobx'], factory) :
	(factory((global['angular2-tree-component'] = global['angular2-tree-component'] || {}),global._angular_core,global._angular_common,global.ng2Mobx,global._,global.mobx));
}(this, (function (exports,_angular_core,_angular_common,ng2Mobx,_,mobx) { 'use strict';

var KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32
};

var TREE_ACTIONS = {
    TOGGLE_SELECTED: function (tree, node, $event) { return node.toggleActivated(); },
    TOGGLE_SELECTED_MULTI: function (tree, node, $event) { return node.toggleActivated(true); },
    SELECT: function (tree, node, $event) { return node.setIsActive(true); },
    DESELECT: function (tree, node, $event) { return node.setIsActive(false); },
    FOCUS: function (tree, node, $event) { return node.focus(); },
    TOGGLE_EXPANDED: function (tree, node, $event) { return node.hasChildren && node.toggleExpanded(); },
    EXPAND: function (tree, node, $event) { return node.expand(); },
    COLLAPSE: function (tree, node, $event) { return node.collapse(); },
    DRILL_DOWN: function (tree, node, $event) { return tree.focusDrillDown(); },
    DRILL_UP: function (tree, node, $event) { return tree.focusDrillUp(); },
    NEXT_NODE: function (tree, node, $event) { return tree.focusNextNode(); },
    PREVIOUS_NODE: function (tree, node, $event) { return tree.focusPreviousNode(); },
    MOVE_NODE: function (tree, node, $event, _a) {
        var from = _a.from, to = _a.to;
        // default action assumes from = node, to = {parent, index}
        tree.moveNode(from, to);
    }
};
var defaultActionMapping = {
    mouse: {
        click: TREE_ACTIONS.TOGGLE_SELECTED,
        dblClick: null,
        contextMenu: null,
        expanderClick: TREE_ACTIONS.TOGGLE_EXPANDED,
        drop: TREE_ACTIONS.MOVE_NODE
    },
    keys: (_a = {},
        _a[KEYS.RIGHT] = TREE_ACTIONS.DRILL_DOWN,
        _a[KEYS.LEFT] = TREE_ACTIONS.DRILL_UP,
        _a[KEYS.DOWN] = TREE_ACTIONS.NEXT_NODE,
        _a[KEYS.UP] = TREE_ACTIONS.PREVIOUS_NODE,
        _a[KEYS.SPACE] = TREE_ACTIONS.TOGGLE_SELECTED,
        _a[KEYS.ENTER] = TREE_ACTIONS.TOGGLE_SELECTED,
        _a)
};
var TreeOptions = (function () {
    function TreeOptions(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
        this.actionMapping = _.defaultsDeep(this.options.actionMapping, defaultActionMapping);
    }
    Object.defineProperty(TreeOptions.prototype, "childrenField", {
        get: function () { return this.options.childrenField || 'children'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "displayField", {
        get: function () { return this.options.displayField || 'name'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "idField", {
        get: function () { return this.options.idField || 'id'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isExpandedField", {
        get: function () { return this.options.isExpandedField || 'isExpanded'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "isHiddenField", {
        get: function () { return this.options.isHiddenField || 'isHidden'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "getChildren", {
        get: function () { return this.options.getChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "allowDrag", {
        get: function () { return this.options.allowDrag; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeOptions.prototype, "levelPadding", {
        get: function () { return this.options.levelPadding || 0; },
        enumerable: true,
        configurable: true
    });
    TreeOptions.prototype.allowDrop = function (element, to) {
        if (this.options.allowDrop instanceof Function) {
            return this.options.allowDrop(element, to);
        }
        else {
            return this.options.allowDrop === undefined ? true : this.options.allowDrop;
        }
    };
    TreeOptions.prototype.nodeClass = function (node) {
        return this.options.nodeClass ? this.options.nodeClass(node) : '';
    };
    TreeOptions.prototype.nodeHeight = function (node) {
        if (node.data.virtual) {
            return 0;
        }
        var nodeHeight = this.options.nodeHeight || 22;
        if (typeof nodeHeight === 'function') {
            nodeHeight = nodeHeight(node);
        }
        // account for drop slots:
        return nodeHeight + (node.index === 0 ? 2 : 1) * this.dropSlotHeight;
    };
    Object.defineProperty(TreeOptions.prototype, "dropSlotHeight", {
        get: function () {
            return this.options.dropSlotHeight || 2;
        },
        enumerable: true,
        configurable: true
    });
    return TreeOptions;
}());
var _a;

var TREE_EVENTS = {
    onToggleExpanded: 'onToggleExpanded',
    onActivate: 'onActivate',
    onDeactivate: 'onDeactivate',
    onFocus: 'onFocus',
    onBlur: 'onBlur',
    onInitialized: 'onInitialized',
    onUpdateData: 'onUpdateData',
    onMoveNode: 'onMoveNode',
    onEvent: 'onEvent',
    onLoadChildren: 'onLoadChildren',
    onChangeFilter: 'onChangeFilter'
};

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TreeNode = (function () {
    function TreeNode(data, parent, treeModel, index) {
        this.data = data;
        this.parent = parent;
        this.treeModel = treeModel;
        this.position = 0;
        this.id = this.id || uuid(); // Make sure there's a unique ID
        this.index = index;
        if (this.getField('children')) {
            this._initChildren();
        }
        this.allowDrop = this.allowDropUnbound.bind(this);
    }
    Object.defineProperty(TreeNode.prototype, "isHidden", {
        get: function () { return this.treeModel.isHidden(this); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeNode.prototype, "isExpanded", {
        get: function () { return this.treeModel.isExpanded(this); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeNode.prototype, "isActive", {
        get: function () { return this.treeModel.isActive(this); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeNode.prototype, "isFocused", {
        get: function () { return this.treeModel.isNodeFocused(this); },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeNode.prototype, "level", {
        get: function () {
            return this.parent ? this.parent.level + 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "path", {
        get: function () {
            return this.parent ? this.parent.path.concat([this.id]) : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "elementRef", {
        get: function () {
            throw "Element Ref is no longer supported since introducing virtual scroll\n\n      You may use a template to obtain a reference to the element";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "originalNode", {
        get: function () { return this._originalNode; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeNode.prototype, "hasChildren", {
        // helper get functions:
        get: function () {
            return !!(this.data.hasChildren || (this.children && this.children.length > 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isCollapsed", {
        get: function () { return !this.isExpanded; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isLeaf", {
        get: function () { return !this.hasChildren; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "isRoot", {
        get: function () { return this.parent.data.virtual; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "realParent", {
        get: function () { return this.isRoot ? null : this.parent; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "options", {
        // proxy functions:
        get: function () { return this.treeModel.options; },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.fireEvent = function (event) { this.treeModel.fireEvent(event); };
    Object.defineProperty(TreeNode.prototype, "displayField", {
        // field accessors:
        get: function () {
            return this.getField('display');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNode.prototype, "id", {
        get: function () {
            return this.getField('id');
        },
        set: function (value) {
            this.setField('id', value);
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getField = function (key) {
        return this.data[this.options[key + "Field"]];
    };
    TreeNode.prototype.setField = function (key, value) {
        this.data[this.options[key + "Field"]] = value;
    };
    // traversing:
    TreeNode.prototype._findAdjacentSibling = function (steps, skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._getParentsChildren(skipHidden)[this.index + steps];
    };
    TreeNode.prototype.findNextSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(+1, skipHidden);
    };
    TreeNode.prototype.findPreviousSibling = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._findAdjacentSibling(-1, skipHidden);
    };
    TreeNode.prototype.getVisibleChildren = function () {
        return this.visibleChildren;
    };
    Object.defineProperty(TreeNode.prototype, "visibleChildren", {
        get: function () {
            return (this.children || []).filter(function (node) { return !node.isHidden; });
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.getFirstChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.visibleChildren : this.children;
        return _.first(children || []);
    };
    TreeNode.prototype.getLastChild = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = skipHidden ? this.visibleChildren : this.children;
        return _.last(children || []);
    };
    TreeNode.prototype.findNextNode = function (goInside, skipHidden) {
        if (goInside === void 0) { goInside = true; }
        if (skipHidden === void 0) { skipHidden = false; }
        return goInside && this.isExpanded && this.getFirstChild(skipHidden) ||
            this.findNextSibling(skipHidden) ||
            this.parent && this.parent.findNextNode(false, skipHidden);
    };
    TreeNode.prototype.findPreviousNode = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var previousSibling = this.findPreviousSibling(skipHidden);
        if (!previousSibling) {
            return this.realParent;
        }
        return previousSibling._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getLastOpenDescendant = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var lastChild = this.getLastChild(skipHidden);
        return (this.isCollapsed || !lastChild)
            ? this
            : lastChild._getLastOpenDescendant(skipHidden);
    };
    TreeNode.prototype._getParentsChildren = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        var children = this.parent &&
            (skipHidden ? this.parent.getVisibleChildren() : this.parent.children);
        return children || [];
    };
    TreeNode.prototype.getIndexInParent = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return this._getParentsChildren(skipHidden).indexOf(this);
    };
    TreeNode.prototype.isDescendantOf = function (node) {
        if (this === node)
            return true;
        else
            return this.parent && this.parent.isDescendantOf(node);
    };
    TreeNode.prototype.getNodePadding = function () {
        return this.options.levelPadding * (this.level - 1) + 'px';
    };
    TreeNode.prototype.getClass = function () {
        return this.options.nodeClass(this);
    };
    TreeNode.prototype.onDrop = function ($event) {
        this.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this, index: 0 }
        });
    };
    TreeNode.prototype.allowDropUnbound = function (element) {
        return this.options.allowDrop(element, { parent: this, index: 0 });
    };
    // helper methods:
    TreeNode.prototype.loadChildren = function () {
        var _this = this;
        if (!this.options.getChildren) {
            return Promise.resolve(); // Not getChildren method - for using redux
        }
        return Promise.resolve(this.options.getChildren(this))
            .then(function (children) {
            if (children) {
                _this.setField('children', children);
                _this._initChildren();
                _this.children.forEach(function (child) {
                    if (child.getField('isExpanded') && child.hasChildren) {
                        child.expand();
                    }
                });
            }
        }).then(function () {
            _this.fireEvent({
                eventName: TREE_EVENTS.onLoadChildren,
                node: _this
            });
        });
    };
    TreeNode.prototype.expand = function () {
        if (!this.isExpanded) {
            return this.toggleExpanded();
        }
        return Promise.resolve();
    };
    TreeNode.prototype.collapse = function () {
        if (this.isExpanded) {
            this.toggleExpanded();
        }
        return this;
    };
    TreeNode.prototype.doForAll = function (fn) {
        fn(this);
        if (this.children) {
            this.children.forEach(function (child) { return fn(child); });
        }
    };
    TreeNode.prototype.expandAll = function () {
        this.doForAll(function (node) { return node.expand(); });
    };
    TreeNode.prototype.collapseAll = function () {
        this.doForAll(function (node) { return node.collapse(); });
    };
    TreeNode.prototype.ensureVisible = function () {
        if (this.realParent) {
            this.realParent.expand();
            this.realParent.ensureVisible();
        }
        return this;
    };
    TreeNode.prototype.toggleExpanded = function () {
        return this.setIsExpanded(!this.isExpanded);
    };
    TreeNode.prototype.setIsExpanded = function (value) {
        if (this.hasChildren) {
            this.treeModel.setExpandedNode(this, value);
            if (!this.children && this.hasChildren && value) {
                return this.loadChildren();
            }
        }
        return Promise.resolve();
    };
    
    TreeNode.prototype.setIsActive = function (value, multi) {
        if (multi === void 0) { multi = false; }
        this.treeModel.setActiveNode(this, value, multi);
        if (value) {
            this.focus();
        }
        return this;
    };
    TreeNode.prototype.toggleActivated = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(!this.isActive, multi);
        return this;
    };
    TreeNode.prototype.setActiveAndVisible = function (multi) {
        if (multi === void 0) { multi = false; }
        this.setIsActive(true, multi)
            .ensureVisible();
        setTimeout(this.scrollIntoView.bind(this));
        return this;
    };
    TreeNode.prototype.scrollIntoView = function (force) {
        if (force === void 0) { force = false; }
        this.treeModel.virtualScroll.scrollIntoView(this, force);
    };
    TreeNode.prototype.focus = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(this);
        this.scrollIntoView();
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: previousNode });
        }
        this.fireEvent({ eventName: TREE_EVENTS.onFocus, node: this });
        return this;
    };
    TreeNode.prototype.blur = function () {
        var previousNode = this.treeModel.getFocusedNode();
        this.treeModel.setFocusedNode(null);
        if (previousNode) {
            this.fireEvent({ eventName: TREE_EVENTS.onBlur, node: this });
        }
        return this;
    };
    TreeNode.prototype.setIsHidden = function (value) {
        this.treeModel.setIsHidden(this, value);
    };
    TreeNode.prototype.hide = function () {
        this.setIsHidden(true);
    };
    TreeNode.prototype.show = function () {
        this.setIsHidden(false);
    };
    TreeNode.prototype.allowDrag = function () {
        return this.options.allowDrag;
    };
    TreeNode.prototype.mouseAction = function (actionName, $event, data) {
        if (data === void 0) { data = null; }
        this.treeModel.setFocus(true);
        var actionMapping = this.options.actionMapping.mouse;
        var action$$1 = actionMapping[actionName];
        if (action$$1) {
            action$$1(this.treeModel, this, $event, data);
        }
    };
    TreeNode.prototype.getSelfHeight = function () {
        return this.options.nodeHeight(this);
    };
    TreeNode.prototype._initChildren = function () {
        var _this = this;
        this.children = this.getField('children')
            .map(function (c, index) { return new TreeNode(c, _this, _this.treeModel, index); });
    };
    return TreeNode;
}());
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "isHidden", null);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "isExpanded", null);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "isActive", null);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "isFocused", null);
__decorate$2([
    mobx.observable,
    __metadata$1("design:type", Array)
], TreeNode.prototype, "children", void 0);
__decorate$2([
    mobx.observable,
    __metadata$1("design:type", Number)
], TreeNode.prototype, "index", void 0);
__decorate$2([
    mobx.observable,
    __metadata$1("design:type", Object)
], TreeNode.prototype, "position", void 0);
__decorate$2([
    mobx.observable,
    __metadata$1("design:type", Number)
], TreeNode.prototype, "height", void 0);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Number),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "level", null);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Array),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "path", null);
__decorate$2([
    mobx.computed,
    __metadata$1("design:type", Object),
    __metadata$1("design:paramtypes", [])
], TreeNode.prototype, "visibleChildren", null);
function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeModel = TreeModel_1 = (function () {
    function TreeModel(renderer) {
        this.renderer = renderer;
        this.options = new TreeOptions();
        this.expandedNodeIds = {};
        this.activeNodeIds = {};
        this.hiddenNodeIds = {};
        this.focusedNodeId = null;
        this.firstUpdate = true;
        this.eventNames = Object.keys(TREE_EVENTS);
    }
    TreeModel.prototype.setData = function (_a) {
        var nodes = _a.nodes, _b = _a.options, options = _b === void 0 ? null : _b, _c = _a.events, events = _c === void 0 ? null : _c;
        if (options) {
            this.options = new TreeOptions(options);
        }
        if (events) {
            this.events = events;
        }
        if (nodes) {
            this.nodes = nodes;
        }
        this.update();
    };
    TreeModel.prototype.update = function () {
        // Rebuild tree:
        var virtualRootConfig = (_a = {
                virtual: true
            },
            _a[this.options.childrenField] = this.nodes,
            _a);
        this.virtualRoot = new TreeNode(virtualRootConfig, null, this, 0);
        this.roots = this.virtualRoot.children;
        // Fire event:
        if (this.firstUpdate) {
            if (this.roots) {
                this.fireEvent({ eventName: TREE_EVENTS.onInitialized });
                this.firstUpdate = false;
                this._calculateExpandedNodes();
            }
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.onUpdateData });
        }
        var _a;
    };
    TreeModel.prototype._calculateExpandedNodes = function (startNode) {
        var _this = this;
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (startNode.data[this.options.isExpandedField]) {
            this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, (_a = {}, _a[startNode.id] = true, _a));
        }
        if (startNode.children) {
            startNode.children.forEach(function (child) { return _this._calculateExpandedNodes(child); });
        }
        var _a;
    };
    TreeModel.prototype.fireEvent = function (event) {
        this.events[event.eventName].emit(event);
        this.events.onEvent.emit(event);
    };
    TreeModel.prototype.subscribe = function (eventName, fn) {
        this.events[eventName].subscribe(fn);
    };
    TreeModel.prototype.getFocusedNode = function () {
        return this.focusedNode;
    };
    TreeModel.prototype.setFocusedNode = function (node) {
        this.focusedNodeId = node ? node.id : null;
    };
    TreeModel.prototype.getActiveNode = function () {
        return this.activeNodes[0];
    };
    TreeModel.prototype.getActiveNodes = function () {
        return this.activeNodes;
    };
    TreeModel.prototype.getVisibleRoots = function () {
        return this.virtualRoot.visibleChildren;
    };
    TreeModel.prototype.getFirstRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return _.first(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    TreeModel.prototype.getLastRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return _.last(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    Object.defineProperty(TreeModel.prototype, "isFocused", {
        get: function () {
            return TreeModel_1.focusedTree === this;
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.isNodeFocused = function (node) {
        return this.focusedNode === node;
    };
    TreeModel.prototype.setFocus = function (value) {
        TreeModel_1.focusedTree = value ? this : null;
    };
    TreeModel.prototype.isEmptyTree = function () {
        return this.roots && this.roots.length === 0;
    };
    Object.defineProperty(TreeModel.prototype, "treeNodeContentComponent", {
        get: function () { return this._treeNodeContentComponent; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeModel.prototype, "loadingComponent", {
        get: function () { return this._loadingComponent; },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeModel.prototype, "focusedNode", {
        get: function () {
            return this.focusedNodeId ? this.getNodeById(this.focusedNodeId) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "expandedNodes", {
        get: function () {
            var _this = this;
            var nodes = Object.keys(this.expandedNodeIds)
                .filter(function (id) { return _this.expandedNodeIds[id]; })
                .map(function (id) { return _this.getNodeById(id); });
            return _.compact(nodes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeModel.prototype, "activeNodes", {
        get: function () {
            var _this = this;
            var nodes = Object.keys(this.activeNodeIds)
                .filter(function (id) { return _this.expandedNodeIds[id]; })
                .map(function (id) { return _this.getNodeById(id); });
            return _.compact(nodes);
        },
        enumerable: true,
        configurable: true
    });
    TreeModel.prototype.getNodeByPath = function (path, startNode) {
        if (startNode === void 0) { startNode = null; }
        if (!path)
            return null;
        startNode = startNode || this.virtualRoot;
        if (path.length === 0)
            return startNode;
        if (!startNode.children)
            return null;
        var childId = path.shift();
        var childNode = _.find(startNode.children, { id: childId });
        if (!childNode)
            return null;
        return this.getNodeByPath(path, childNode);
    };
    TreeModel.prototype.getNodeById = function (id) {
        return this.getNodeBy({ id: id });
    };
    TreeModel.prototype.getNodeBy = function (predicate, startNode) {
        if (startNode === void 0) { startNode = null; }
        startNode = startNode || this.virtualRoot;
        if (!startNode.children)
            return null;
        var found = _.find(startNode.children, predicate);
        if (found) {
            return found;
        }
        else {
            for (var _i = 0, _a = startNode.children; _i < _a.length; _i++) {
                var child = _a[_i];
                var foundInChildren = this.getNodeBy(predicate, child);
                if (foundInChildren)
                    return foundInChildren;
            }
        }
    };
    TreeModel.prototype.doForAll = function (fn) {
        this.roots.forEach(function (root) { return root.doForAll(fn); });
    };
    TreeModel.prototype.focusNextNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findNextNode(true, true) : this.getFirstRoot(true);
        if (nextNode)
            nextNode.focus();
    };
    TreeModel.prototype.focusPreviousNode = function () {
        var previousNode = this.getFocusedNode();
        var nextNode = previousNode ? previousNode.findPreviousNode(true) : this.getLastRoot(true);
        if (nextNode)
            nextNode.focus();
    };
    TreeModel.prototype.focusDrillDown = function () {
        var previousNode = this.getFocusedNode();
        if (previousNode && previousNode.isCollapsed && previousNode.hasChildren) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode ? previousNode.getFirstChild(true) : this.getFirstRoot(true);
            if (nextNode)
                nextNode.focus();
        }
    };
    TreeModel.prototype.focusDrillUp = function () {
        var previousNode = this.getFocusedNode();
        if (!previousNode)
            return;
        if (previousNode.isExpanded) {
            previousNode.toggleExpanded();
        }
        else {
            var nextNode = previousNode.realParent;
            if (nextNode)
                nextNode.focus();
        }
    };
    TreeModel.prototype.isActive = function (node) {
        return this.activeNodeIds[node.id];
    };
    TreeModel.prototype.setActiveNode = function (node, value, multi) {
        if (multi === void 0) { multi = false; }
        if (multi) {
            this._setActiveNodeMulti(node, value);
        }
        else {
            this._setActiveNodeSingle(node, value);
        }
        if (value) {
            node.focus();
            this.fireEvent({ eventName: TREE_EVENTS.onActivate, node: node });
        }
        else {
            this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: node });
        }
    };
    TreeModel.prototype._setActiveNodeSingle = function (node, value) {
        var _this = this;
        // Deactivate all other nodes:
        this.activeNodes
            .filter(function (activeNode) { return activeNode !== node; })
            .forEach(function (activeNode) {
            _this.fireEvent({ eventName: TREE_EVENTS.onDeactivate, node: activeNode });
        });
        if (value) {
            this.activeNodeIds = (_a = {}, _a[node.id] = true, _a);
        }
        else {
            this.activeNodeIds = {};
        }
        var _a;
    };
    TreeModel.prototype._setActiveNodeMulti = function (node, value) {
        this.activeNodeIds = Object.assign({}, this.activeNodeIds, (_a = {}, _a[node.id] = value, _a));
        var _a;
    };
    TreeModel.prototype.isExpanded = function (node) {
        return this.expandedNodeIds[node.id];
    };
    TreeModel.prototype.setExpandedNode = function (node, value) {
        this.expandedNodeIds = Object.assign({}, this.expandedNodeIds, (_a = {}, _a[node.id] = value, _a));
        this.fireEvent({ eventName: TREE_EVENTS.onToggleExpanded, node: node, isExpanded: value });
        var _a;
    };
    TreeModel.prototype.expandAll = function () {
        this.roots.forEach(function (root) { return root.expandAll(); });
    };
    TreeModel.prototype.collapseAll = function () {
        this.roots.forEach(function (root) { return root.collapseAll(); });
    };
    TreeModel.prototype.isHidden = function (node) {
        return this.hiddenNodeIds[node.id];
    };
    TreeModel.prototype.setIsHidden = function (node, value) {
        this.hiddenNodeIds = Object.assign({}, this.hiddenNodeIds, (_a = {}, _a[node.id] = value, _a));
        var _a;
    };
    TreeModel.prototype.performKeyAction = function (node, $event) {
        var action$$1 = this.options.actionMapping.keys[$event.keyCode];
        if (action$$1) {
            $event.preventDefault();
            action$$1(this, node, $event);
            return true;
        }
        else {
            return false;
        }
    };
    TreeModel.prototype.filterNodes = function (filter, autoShow) {
        var _this = this;
        if (autoShow === void 0) { autoShow = true; }
        var filterFn;
        if (!filter) {
            return this.clearFilter();
        }
        // support function and string filter
        if (_.isString(filter)) {
            filterFn = function (node) { return node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1; };
        }
        else if (_.isFunction(filter)) {
            filterFn = filter;
        }
        else {
            console.error('Don\'t know what to do with filter', filter);
            console.error('Should be either a string or function');
            return;
        }
        var ids = {};
        this.roots.forEach(function (node) { return _this._filterNode(ids, node, filterFn, autoShow); });
        this.hiddenNodeIds = ids;
        this.fireEvent({ eventName: TREE_EVENTS.onChangeFilter });
    };
    TreeModel.prototype._filterNode = function (ids, node, filterFn, autoShow) {
        var _this = this;
        // if node passes function then it's visible
        var isVisible = filterFn(node);
        if (node.children) {
            // if one of node's children passes filter then this node is also visible
            node.children.forEach(function (child) {
                if (_this._filterNode(ids, child, filterFn, autoShow)) {
                    isVisible = true;
                }
            });
        }
        // mark node as hidden
        if (!isVisible) {
            ids[node.id] = true;
        }
        // auto expand parents to make sure the filtered nodes are visible
        if (autoShow && isVisible) {
            node.ensureVisible();
        }
        return isVisible;
    };
    TreeModel.prototype.clearFilter = function () {
        this.hiddenNodeIds = {};
        this.fireEvent({ eventName: TREE_EVENTS.onChangeFilter });
    };
    TreeModel.prototype._canMoveNode = function (node, fromIndex, to) {
        // same node:
        if (node.parent === to.parent && fromIndex === to.index) {
            return false;
        }
        return !to.parent.isDescendantOf(node);
    };
    TreeModel.prototype.moveNode = function (node, to) {
        var fromIndex = node.getIndexInParent();
        var fromParent = node.parent;
        if (!this._canMoveNode(node, fromIndex, to))
            return;
        var fromChildren = fromParent.getField('children');
        // If node doesn't have children - create children array
        if (!to.parent.getField('children')) {
            to.parent.setField('children', []);
        }
        var toChildren = to.parent.getField('children');
        var originalNode = fromChildren.splice(fromIndex, 1)[0];
        // Compensate for index if already removed from parent:
        var toIndex = (fromParent === to.parent && to.index > fromIndex) ? to.index - 1 : to.index;
        toChildren.splice(toIndex, 0, originalNode);
        fromParent.treeModel.update();
        if (to.parent.treeModel !== fromParent.treeModel) {
            to.parent.treeModel.update();
        }
        this.fireEvent({ eventName: TREE_EVENTS.onMoveNode, node: originalNode, to: { parent: to.parent.data, index: toIndex } });
    };
    return TreeModel;
}());
exports.TreeModel.focusedTree = null;
__decorate$1([
    mobx.observable,
    __metadata("design:type", Array)
], exports.TreeModel.prototype, "roots", void 0);
__decorate$1([
    mobx.observable,
    __metadata("design:type", Object)
], exports.TreeModel.prototype, "expandedNodeIds", void 0);
__decorate$1([
    mobx.observable,
    __metadata("design:type", Object)
], exports.TreeModel.prototype, "activeNodeIds", void 0);
__decorate$1([
    mobx.observable,
    __metadata("design:type", Object)
], exports.TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate$1([
    mobx.observable,
    __metadata("design:type", String)
], exports.TreeModel.prototype, "focusedNodeId", void 0);
__decorate$1([
    mobx.observable,
    __metadata("design:type", TreeNode)
], exports.TreeModel.prototype, "virtualRoot", void 0);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setData", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "update", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setFocusedNode", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setFocus", null);
__decorate$1([
    mobx.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], exports.TreeModel.prototype, "focusedNode", null);
__decorate$1([
    mobx.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], exports.TreeModel.prototype, "expandedNodes", null);
__decorate$1([
    mobx.computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], exports.TreeModel.prototype, "activeNodes", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "doForAll", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "focusNextNode", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "focusPreviousNode", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "focusDrillDown", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "focusDrillUp", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setActiveNode", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setExpandedNode", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "expandAll", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "collapseAll", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "setIsHidden", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "filterNodes", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "clearFilter", null);
__decorate$1([
    mobx.action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], exports.TreeModel.prototype, "moveNode", null);
exports.TreeModel = TreeModel_1 = __decorate$1([
    _angular_core.Injectable(),
    __metadata("design:paramtypes", [_angular_core.Renderer])
], exports.TreeModel);
var TreeModel_1;

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.TreeDraggedElement = (function () {
    function TreeDraggedElement() {
        this._draggedElement = null;
    }
    TreeDraggedElement.prototype.set = function (draggedElement) {
        this._draggedElement = draggedElement;
    };
    TreeDraggedElement.prototype.get = function () {
        return this._draggedElement;
    };
    TreeDraggedElement.prototype.isDragging = function () {
        return !!this.get();
    };
    return TreeDraggedElement;
}());
exports.TreeDraggedElement = __decorate$3([
    _angular_core.Injectable()
], exports.TreeDraggedElement);

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Y_OFFSET = 300; // Extra pixels outside the viewport, in each direction, to render nodes in
var Y_EPSILON = 50; // Minimum pixel change required to recalculate the rendered nodes
exports.TreeVirtualScroll = (function () {
    function TreeVirtualScroll(treeModel) {
        var _this = this;
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = mobx.autorun(function () { return _this.fixScroll(); });
    }
    Object.defineProperty(TreeVirtualScroll.prototype, "y", {
        get: function () {
            return this.yBlocks * Y_EPSILON;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeVirtualScroll.prototype, "totalHeight", {
        get: function () {
            return this.treeModel.virtualRoot ? this.treeModel.virtualRoot.height : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeVirtualScroll.prototype, "viewportNodes", {
        get: function () {
            return this.getViewportNodes(this.treeModel.roots);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeVirtualScroll.prototype, "translateY", {
        get: function () {
            return this.viewportNodes[0] ? this.viewportNodes[0].position + this.y : 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeVirtualScroll.prototype.init = function () {
        var _this = this;
        var fn = this.recalcPositions.bind(this);
        fn();
        mobx.reaction(function () { return _this.treeModel.roots; }, fn);
        mobx.reaction(function () { return _this.treeModel.expandedNodeIds; }, fn);
        mobx.reaction(function () { return _this.treeModel.hiddenNodeIds; }, fn);
        this.treeModel.subscribe(TREE_EVENTS.onLoadChildren, fn);
    };
    TreeVirtualScroll.prototype.recalcPositions = function () {
        this.treeModel.virtualRoot.height = this._getPositionAfter(this.treeModel.getVisibleRoots(), 0);
    };
    TreeVirtualScroll.prototype._getPositionAfter = function (nodes, startPos) {
        var _this = this;
        var position = startPos;
        nodes.forEach(function (node) {
            node.position = position;
            position = _this._getPositionAfterNode(node, position);
        });
        return position;
    };
    TreeVirtualScroll.prototype._getPositionAfterNode = function (node, startPos) {
        var position = node.getSelfHeight() + startPos;
        if (node.children && node.isExpanded) {
            position = this._getPositionAfter(node.visibleChildren, position);
        }
        node.height = position - startPos;
        return position;
    };
    TreeVirtualScroll.prototype.clear = function () {
        this._dispose();
    };
    TreeVirtualScroll.prototype.setNewScroll = function (_a) {
        var viewport = _a.viewport;
        Object.assign(this, {
            viewport: viewport,
            x: viewport.scrollLeft,
            yBlocks: Math.round(viewport.scrollTop / Y_EPSILON),
            viewportHeight: viewport.getBoundingClientRect().height
        });
    };
    TreeVirtualScroll.prototype.scrollIntoView = function (node, force, scrollToMiddle) {
        if (scrollToMiddle === void 0) { scrollToMiddle = true; }
        if (force ||
            node.position < this.y ||
            node.position + node.getSelfHeight() > this.y + this.viewportHeight) {
            this.viewport.scrollTop = scrollToMiddle ?
                node.position - this.viewportHeight / 2 :
                node.position; // scroll to start
            this.yBlocks = Math.floor(this.viewport.scrollTop / Y_EPSILON);
        }
    };
    TreeVirtualScroll.prototype.getViewportNodes = function (nodes) {
        var _this = this;
        if (!this.viewportHeight || !nodes || !nodes.length)
            return [];
        var visibleNodes = nodes.filter(function (node) { return !node.isHidden; });
        if (!visibleNodes.length)
            return [];
        // Search for first node in the viewport using binary search
        // Look for first node that starts after the beginning of the viewport (with buffer)
        // Or that ends after the beginning of the viewport
        var firstIndex = binarySearch(visibleNodes, function (node) {
            return (node.position + Y_OFFSET > _this.y) ||
                (node.position + node.height > _this.y);
        });
        // Search for last node in the viewport using binary search
        // Look for first node that starts after the end of the viewport (with buffer)
        var lastIndex = binarySearch(visibleNodes, function (node) {
            return node.position - Y_OFFSET > _this.y + _this.viewportHeight;
        }, firstIndex);
        var viewportNodes = [];
        for (var i = firstIndex; i <= lastIndex; i++) {
            viewportNodes.push(visibleNodes[i]);
        }
        return viewportNodes;
    };
    TreeVirtualScroll.prototype.fixScroll = function () {
        var maxY = Math.max(0, this.totalHeight - this.viewportHeight);
        if (this.y < 0)
            this.yBlocks = 0;
        if (this.y > maxY)
            this.yBlocks = maxY / Y_EPSILON;
    };
    return TreeVirtualScroll;
}());
__decorate$4([
    mobx.observable,
    __metadata$2("design:type", Object)
], exports.TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate$4([
    mobx.observable,
    __metadata$2("design:type", Object)
], exports.TreeVirtualScroll.prototype, "x", void 0);
__decorate$4([
    mobx.observable,
    __metadata$2("design:type", Object)
], exports.TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate$4([
    mobx.computed,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], exports.TreeVirtualScroll.prototype, "y", null);
__decorate$4([
    mobx.computed,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], exports.TreeVirtualScroll.prototype, "totalHeight", null);
__decorate$4([
    mobx.computed.struct,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], exports.TreeVirtualScroll.prototype, "viewportNodes", null);
__decorate$4([
    mobx.computed,
    __metadata$2("design:type", Object),
    __metadata$2("design:paramtypes", [])
], exports.TreeVirtualScroll.prototype, "translateY", null);
__decorate$4([
    mobx.action,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", [Object]),
    __metadata$2("design:returntype", void 0)
], exports.TreeVirtualScroll.prototype, "setNewScroll", null);
__decorate$4([
    mobx.action,
    __metadata$2("design:type", Function),
    __metadata$2("design:paramtypes", [Object, Object, Object]),
    __metadata$2("design:returntype", void 0)
], exports.TreeVirtualScroll.prototype, "scrollIntoView", null);
exports.TreeVirtualScroll = __decorate$4([
    _angular_core.Injectable(),
    __metadata$2("design:paramtypes", [exports.TreeModel])
], exports.TreeVirtualScroll);
function binarySearch(nodes, condition, firstIndex) {
    if (firstIndex === void 0) { firstIndex = 0; }
    var index = firstIndex;
    var toIndex = nodes.length - 1;
    while (index !== toIndex) {
        var midIndex = Math.floor((index + toIndex) / 2);
        if (condition(nodes[midIndex])) {
            toIndex = midIndex;
        }
        else {
            if (index === midIndex)
                index = toIndex;
            else
                index = midIndex;
        }
    }
    return index;
}

function deprecatedSelector(oldSelector, newSelector, element) {
    if (element.nativeElement.tagName && element.nativeElement.tagName.toLowerCase() === oldSelector.toLowerCase()) {
        console.warn("If you are using the capitalized '" + oldSelector + "' selector please move to the \n      kebab-case '" + newSelector + "' selector, as the capitalized will be soon deprecated");
    }
}

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.LoadingComponent = (function () {
    function LoadingComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('LoadingComponent', 'tree-loading-component', elementRef);
    }
    return LoadingComponent;
}());
__decorate$5([
    _angular_core.Input(),
    __metadata$3("design:type", _angular_core.TemplateRef)
], exports.LoadingComponent.prototype, "template", void 0);
exports.LoadingComponent = __decorate$5([
    _angular_core.Component({
        selector: 'LoadingComponent, tree-loading-component',
        template: "<span *ngIf=\"!template\">loading...</span>\n  <template [ngTemplateOutlet]=\"template\"></template>",
    }),
    __metadata$3("design:paramtypes", [_angular_core.ElementRef])
], exports.LoadingComponent);

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer, elementRef) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        this.elementRef = elementRef;
        deprecatedSelector('Tree', 'tree-root', elementRef);
        treeModel.eventNames.forEach(function (name) { return _this[name] = new _angular_core.EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(TreeComponent.prototype, "focused", {
        set: function (value) {
            this.treeModel.setFocus(value);
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.onKeydown = function ($event) {
        if (!this.treeModel.isFocused)
            return;
        if (_.includes(['input', 'textarea'], document.activeElement.tagName.toLowerCase()))
            return;
        var focusedNode = this.treeModel.getFocusedNode();
        this.treeModel.performKeyAction(focusedNode, $event);
    };
    TreeComponent.prototype.onMousedown = function ($event) {
        var insideClick = this.renderer.invokeElementMethod($event.target, 'closest', ['Tree']);
        if (!insideClick) {
            this.treeModel.setFocus(false);
        }
    };
    TreeComponent.prototype.ngOnChanges = function (changes) {
        this.treeModel.setData({
            options: changes.options && changes.options.currentValue,
            nodes: changes.nodes && changes.nodes.currentValue,
            events: _.pick(this, this.treeModel.eventNames)
        });
    };
    return TreeComponent;
}());
__decorate$6([
    _angular_core.ContentChild('loadingTemplate'),
    __metadata$4("design:type", _angular_core.TemplateRef)
], exports.TreeComponent.prototype, "loadingTemplate", void 0);
__decorate$6([
    _angular_core.ContentChild('treeNodeTemplate'),
    __metadata$4("design:type", _angular_core.TemplateRef)
], exports.TreeComponent.prototype, "treeNodeTemplate", void 0);
__decorate$6([
    _angular_core.ContentChild('treeNodeFullTemplate'),
    __metadata$4("design:type", _angular_core.TemplateRef)
], exports.TreeComponent.prototype, "treeNodeFullTemplate", void 0);
__decorate$6([
    _angular_core.Input(),
    __metadata$4("design:type", Array),
    __metadata$4("design:paramtypes", [Array])
], exports.TreeComponent.prototype, "nodes", null);
__decorate$6([
    _angular_core.Input(),
    __metadata$4("design:type", TreeOptions),
    __metadata$4("design:paramtypes", [TreeOptions])
], exports.TreeComponent.prototype, "options", null);
__decorate$6([
    _angular_core.Input(),
    __metadata$4("design:type", Boolean),
    __metadata$4("design:paramtypes", [Boolean])
], exports.TreeComponent.prototype, "focused", null);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onToggleExpanded", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onActivate", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onDeactivate", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onFocus", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onBlur", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onUpdateData", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onInitialized", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onMoveNode", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onLoadChildren", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onChangeFilter", void 0);
__decorate$6([
    _angular_core.Output(),
    __metadata$4("design:type", Object)
], exports.TreeComponent.prototype, "onEvent", void 0);
__decorate$6([
    _angular_core.HostListener('body: keydown', ['$event']),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", [Object]),
    __metadata$4("design:returntype", void 0)
], exports.TreeComponent.prototype, "onKeydown", null);
__decorate$6([
    _angular_core.HostListener('body: mousedown', ['$event']),
    __metadata$4("design:type", Function),
    __metadata$4("design:paramtypes", [Object]),
    __metadata$4("design:returntype", void 0)
], exports.TreeComponent.prototype, "onMousedown", null);
exports.TreeComponent = __decorate$6([
    _angular_core.Component({
        selector: 'Tree, tree-root',
        encapsulation: _angular_core.ViewEncapsulation.None,
        providers: [exports.TreeModel],
        styles: [
            '.tree-children { padding-left: 20px }',
            '.empty-tree-drop-slot .node-drop-slot { height: 20px; min-width: 100px }',
            ".tree {\n      width: 100%;\n      position:relative;\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
        ],
        template: "\n    <tree-viewport>\n      <div\n        class=\"tree\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
    }),
    __metadata$4("design:paramtypes", [exports.TreeModel,
        exports.TreeDraggedElement,
        _angular_core.Renderer,
        _angular_core.ElementRef])
], exports.TreeComponent);

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeComponent = (function () {
    function TreeNodeComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNode', 'tree-node', elementRef);
    }
    return TreeNodeComponent;
}());
__decorate$7([
    _angular_core.Input(),
    __metadata$5("design:type", TreeNode)
], exports.TreeNodeComponent.prototype, "node", void 0);
__decorate$7([
    _angular_core.Input(),
    __metadata$5("design:type", Number)
], exports.TreeNodeComponent.prototype, "index", void 0);
__decorate$7([
    _angular_core.Input(),
    __metadata$5("design:type", Object)
], exports.TreeNodeComponent.prototype, "templates", void 0);
exports.TreeNodeComponent = __decorate$7([
    _angular_core.Component({
        selector: 'TreeNode, tree-node',
        encapsulation: _angular_core.ViewEncapsulation.None,
        styles: [
            ".node-content-wrapper {\n      display: inline-block;\n      padding: 2px 5px;\n      border-radius: 2px;\n      transition: background-color .15s,box-shadow .15s;\n    }",
            '.node-wrapper {display: flex; align-items: flex-start;}',
            '.tree-node-active > .node-wrapper > .node-content-wrapper { background: #beebff }',
            '.tree-node-active.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #beebff }',
            '.tree-node-focused > .node-wrapper > .node-content-wrapper { background: #e7f4f9 }',
            '.node-content-wrapper:hover { background: #f7fbff }',
            ".tree-node-active > .node-wrapper > .node-content-wrapper, .tree-node-focused > .node-content-wrapper, .node-content-wrapper:hover {\n      box-shadow: inset 0 0 1px #999;\n    }",
            '.node-content-wrapper.is-dragging-over { background: #ddffee; box-shadow: inset 0 0 1px #999; }',
            '.node-content-wrapper.is-dragging-over-disabled { opacity: 0.5 }'
        ],
        template: "\n    <div *mobxAutorun>\n      <div\n        *ngIf=\"!templates.treeNodeFullTemplate\"\n        class=\"tree-node tree-node-level-{{ node.level }}\"\n        [class]=\"node.getClass()\"\n        [class.tree-node-expanded]=\"node.isExpanded && node.hasChildren\"\n        [class.tree-node-collapsed]=\"node.isCollapsed && node.hasChildren\"\n        [class.tree-node-leaf]=\"node.isLeaf\"\n        [class.tree-node-active]=\"node.isActive\"\n        [class.tree-node-focused]=\"node.isFocused\">\n\n        <tree-node-drop-slot *ngIf=\"index === 0\" [dropIndex]=\"node.index\" [node]=\"node.parent\"></tree-node-drop-slot>\n\n          <div class=\"node-wrapper\" [style.padding-left]=\"node.getNodePadding()\">\n            <tree-node-expander [node]=\"node\"></tree-node-expander>\n            <div class=\"node-content-wrapper\"\n              (click)=\"node.mouseAction('click', $event)\"\n              (dblclick)=\"node.mouseAction('dblClick', $event)\"\n              (contextmenu)=\"node.mouseAction('contextMenu', $event)\"\n              (treeDrop)=\"node.onDrop($event)\"\n              [treeAllowDrop]=\"node.allowDrop\"\n              [treeDrag]=\"node\"\n              [treeDragEnabled]=\"node.allowDrag()\">\n\n              <tree-node-content [node]=\"node\" [index]=\"index\" [template]=\"templates.treeNodeTemplate\">\n              </tree-node-content>\n            </div>\n          </div>\n\n        <tree-node-children [node]=\"node\" [templates]=\"templates\"></tree-node-children>\n        <tree-node-drop-slot [dropIndex]=\"node.index + 1\" [node]=\"node.parent\"></tree-node-drop-slot>\n      </div>\n      <template\n        [ngTemplateOutlet]=\"templates.treeNodeFullTemplate\"\n        [ngOutletContext]=\"{ $implicit: node, node: node, index: index, templates: templates }\">\n      </template>\n    </div>"
    }),
    __metadata$5("design:paramtypes", [_angular_core.ElementRef])
], exports.TreeNodeComponent);

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeContent = (function () {
    function TreeNodeContent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeContent', 'tree-node-content', elementRef);
    }
    return TreeNodeContent;
}());
__decorate$8([
    _angular_core.Input(),
    __metadata$6("design:type", TreeNode)
], exports.TreeNodeContent.prototype, "node", void 0);
__decorate$8([
    _angular_core.Input(),
    __metadata$6("design:type", Number)
], exports.TreeNodeContent.prototype, "index", void 0);
__decorate$8([
    _angular_core.Input(),
    __metadata$6("design:type", _angular_core.TemplateRef)
], exports.TreeNodeContent.prototype, "template", void 0);
exports.TreeNodeContent = __decorate$8([
    _angular_core.Component({
        selector: 'TreeNodeContent, tree-node-content',
        encapsulation: _angular_core.ViewEncapsulation.None,
        template: "<span *ngIf=\"!template\">{{ node.displayField }}</span>\n  <template\n    [ngTemplateOutlet]=\"template\"\n    [ngOutletContext]=\"{ $implicit: node, node: node, index: index }\">\n  </template>",
    }),
    __metadata$6("design:paramtypes", [_angular_core.ElementRef])
], exports.TreeNodeContent);

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeDropSlot = (function () {
    function TreeNodeDropSlot(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeDropSlot', 'tree-node-drop-slot', elementRef);
    }
    TreeNodeDropSlot.prototype.onDrop = function ($event) {
        this.node.mouseAction('drop', $event.event, {
            from: $event.element,
            to: { parent: this.node, index: this.dropIndex }
        });
    };
    TreeNodeDropSlot.prototype.allowDrop = function (element) {
        return this.node.options.allowDrop(element, { parent: this.node, index: this.dropIndex });
    };
    return TreeNodeDropSlot;
}());
__decorate$9([
    _angular_core.Input(),
    __metadata$7("design:type", TreeNode)
], exports.TreeNodeDropSlot.prototype, "node", void 0);
__decorate$9([
    _angular_core.Input(),
    __metadata$7("design:type", Number)
], exports.TreeNodeDropSlot.prototype, "dropIndex", void 0);
exports.TreeNodeDropSlot = __decorate$9([
    _angular_core.Component({
        selector: 'TreeNodeDropSlot, tree-node-drop-slot',
        encapsulation: _angular_core.ViewEncapsulation.None,
        styles: [
            '.node-drop-slot { display: block; height: 2px; width: 100%}',
            '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
        ],
        template: "\n    <div\n      class=\"node-drop-slot\"\n      (treeDrop)=\"onDrop($event)\"\n      [treeAllowDrop]=\"allowDrop.bind(this)\">\n    </div>\n  "
    }),
    __metadata$7("design:paramtypes", [_angular_core.ElementRef])
], exports.TreeNodeDropSlot);

var __decorate$10 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeExpanderComponent = (function () {
    function TreeNodeExpanderComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeExpander', 'tree-node-expander', elementRef);
    }
    return TreeNodeExpanderComponent;
}());
__decorate$10([
    _angular_core.Input(),
    __metadata$8("design:type", TreeNode)
], exports.TreeNodeExpanderComponent.prototype, "node", void 0);
exports.TreeNodeExpanderComponent = __decorate$10([
    _angular_core.Component({
        selector: 'TreeNodeExpander, tree-node-expander',
        encapsulation: _angular_core.ViewEncapsulation.None,
        styles: [
            '.toggle-children-wrapper-expanded .toggle-children { transform: rotate(90deg) }',
            '.toggle-children-wrapper-collapsed .toggle-children { transform: rotate(0); }',
            ".toggle-children-wrapper {\n      padding: 2px 3px 5px 1px;\n    }",
            /* tslint:disable */
            ".toggle-children {\n        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABAhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjY1RTYzOTA2ODZDRjExREJBNkUyRDg4N0NFQUNCNDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzRkRFQjcxODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzRkRFQjcwODUzNTExRTU4RTQwRkQwODFEOUZEMEE3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTk5NzA1OGEtZDI3OC00NDZkLWE4ODgtNGM4MGQ4YWI1NzNmIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YzRkZmQxMGMtY2NlNS0xMTc4LWE5OGQtY2NkZmM5ODk5YWYwIi8+IDxkYzp0aXRsZT4gPHJkZjpBbHQ+IDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z2x5cGhpY29uczwvcmRmOmxpPiA8L3JkZjpBbHQ+IDwvZGM6dGl0bGU+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5iogFwAAAGhJREFUeNpiYGBgKABigf///zOQg0EARH4A4gZyDIIZ8B/JoAJKDIDhB0CcQIkBRBtEyABkgxwoMQCGD6AbRKoBGAYxQgXIBRuZGKgAKPIC3QLxArnRSHZCIjspk52ZKMrOFBUoAAEGAKnq593MQAZtAAAAAElFTkSuQmCC');\n        height: 8px;\n        width: 9px;\n        background-size: contain;\n        display: inline-block;\n        position: relative;\n        top: 1px;\n        background-repeat: no-repeat;\n        background-position: center;\n    }",
            /* tslint:enable */
            ".toggle-children-placeholder {\n        display: inline-block;\n        height: 10px;\n        width: 10px;\n        position: relative;\n        top: 1px;\n        padding-right: 3px;\n    }"
        ],
        template: "\n    <div *mobxAutorun>\n      <span\n        *ngIf=\"node.hasChildren\"\n        [class.toggle-children-wrapper-expanded]=\"node.isExpanded\"\n        [class.toggle-children-wrapper-collapsed]=\"node.isCollapsed\"\n        class=\"toggle-children-wrapper\"\n        (click)=\"node.mouseAction('expanderClick', $event)\">\n\n        <span class=\"toggle-children\"></span>\n      </span>\n      <span\n        *ngIf=\"!node.hasChildren\"\n        class=\"toggle-children-placeholder\">\n      </span>\n    </div>\n  "
    }),
    __metadata$8("design:paramtypes", [_angular_core.ElementRef])
], exports.TreeNodeExpanderComponent);

var __decorate$11 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeChildrenComponent = (function () {
    function TreeNodeChildrenComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeChildren', 'tree-node-children', elementRef);
    }
    return TreeNodeChildrenComponent;
}());
__decorate$11([
    _angular_core.Input(),
    __metadata$9("design:type", TreeNode)
], exports.TreeNodeChildrenComponent.prototype, "node", void 0);
__decorate$11([
    _angular_core.Input(),
    __metadata$9("design:type", Object)
], exports.TreeNodeChildrenComponent.prototype, "templates", void 0);
exports.TreeNodeChildrenComponent = __decorate$11([
    _angular_core.Component({
        selector: 'TreeNodeChildren, tree-node-children',
        encapsulation: _angular_core.ViewEncapsulation.None,
        styles: [
            '.tree-children.tree-children-no-padding { padding-left: 0 }',
            '.tree-children { padding-left: 20px }'
        ],
        template: "\n    <div *mobxAutorun>\n      <div [class.tree-children]=\"true\"\n          [class.tree-children-no-padding]=\"node.options.levelPadding\"\n          *ngIf=\"node.isExpanded\">\n        <div *ngIf=\"node.children\">\n          <tree-node-collection\n            [nodes]=\"node.children\"\n            [templates]=\"templates\">\n          </tree-node-collection>\n        </div>\n        <tree-loading-component\n          [style.padding-left]=\"node.getNodePadding()\"\n          class=\"tree-node-loading\"\n          *ngIf=\"!node.children\"\n          [template]=\"templates.loadingTemplate\"\n        ></tree-loading-component>\n      </div>\n    </div>\n  "
    }),
    __metadata$9("design:paramtypes", [_angular_core.ElementRef])
], exports.TreeNodeChildrenComponent);

var __decorate$12 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeNodeCollectionComponent = (function () {
    function TreeNodeCollectionComponent(virtualScroll, elementRef) {
        this.virtualScroll = virtualScroll;
        this.elementRef = elementRef;
        this._dispose = [];
        deprecatedSelector('TreeNodeCollection', 'tree-node-collection', elementRef);
    }
    Object.defineProperty(TreeNodeCollectionComponent.prototype, "nodes", {
        get: function () { return this._nodes; },
        set: function (nodes) { this._nodes = nodes; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeNodeCollectionComponent.prototype, "marginTop", {
        get: function () {
            var firstNode = this.viewportNodes && this.viewportNodes[0];
            var relativePosition = firstNode ? firstNode.position - firstNode.parent.position - firstNode.parent.getSelfHeight() : 0;
            return relativePosition + "px";
        },
        enumerable: true,
        configurable: true
    });
    TreeNodeCollectionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dispose = [
            // return node indexes so we can compare structurally,
            mobx.reaction(function () {
                return _this.virtualScroll.getViewportNodes(_this.nodes).map(function (n) { return n.index; });
            }, function (nodeIndexes) {
                _this.viewportNodes = nodeIndexes.map(function (i) { return _this.nodes[i]; });
            }, { compareStructural: true, fireImmediately: true }),
            mobx.reaction(function () { return _this.nodes; }, function (nodes) {
                _this.viewportNodes = _this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    };
    TreeNodeCollectionComponent.prototype.ngOnDestroy = function () {
        this._dispose.forEach(function (d) { return d(); });
    };
    return TreeNodeCollectionComponent;
}());
__decorate$12([
    _angular_core.Input(),
    __metadata$10("design:type", Object),
    __metadata$10("design:paramtypes", [Object])
], exports.TreeNodeCollectionComponent.prototype, "nodes", null);
__decorate$12([
    ng2Mobx.observable,
    __metadata$10("design:type", Object)
], exports.TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate$12([
    _angular_core.Input(),
    __metadata$10("design:type", Object)
], exports.TreeNodeCollectionComponent.prototype, "templates", void 0);
__decorate$12([
    ng2Mobx.observable,
    __metadata$10("design:type", Array)
], exports.TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate$12([
    ng2Mobx.computed,
    __metadata$10("design:type", String),
    __metadata$10("design:paramtypes", [])
], exports.TreeNodeCollectionComponent.prototype, "marginTop", null);
exports.TreeNodeCollectionComponent = __decorate$12([
    _angular_core.Component({
        selector: 'tree-node-collection, TreeNodeCollection',
        encapsulation: _angular_core.ViewEncapsulation.None,
        template: "\n    <div *mobxAutorun>\n      <div\n        [style.margin-top]=\"marginTop\">\n        <tree-node\n          *ngFor=\"let node of viewportNodes; let i = index; trackBy: index\"\n          [node]=\"node\"\n          [index]=\"i\"\n          [templates]=\"templates\">\n        </tree-node>\n      </div>\n    </div>\n  "
    }),
    __metadata$10("design:paramtypes", [exports.TreeVirtualScroll, _angular_core.ElementRef])
], exports.TreeNodeCollectionComponent);

var __decorate$13 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SCROLL_REFRESH_INTERVAL = 17;
var isFirefox = navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1;
exports.TreeViewportComponent = (function () {
    function TreeViewportComponent(elementRef, virtualScroll) {
        this.elementRef = elementRef;
        this.virtualScroll = virtualScroll;
        deprecatedSelector('TreeNode', 'tree-node', elementRef);
        this._debounceOnVirtualScroll = _.throttle(this._onVirtualScroll.bind(this), SCROLL_REFRESH_INTERVAL);
    }
    TreeViewportComponent.prototype.ngOnInit = function () {
        this.virtualScroll.init();
    };
    TreeViewportComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this._onVirtualScroll(); });
    };
    TreeViewportComponent.prototype.ngOnDestroy = function () {
        this.virtualScroll.clear();
    };
    TreeViewportComponent.prototype.onScroll = function (e) {
        this._onWheel(e);
    };
    TreeViewportComponent.prototype._onWheel = function (e) {
        this._onVirtualScroll();
    };
    TreeViewportComponent.prototype._onVirtualScroll = function () {
        this.virtualScroll.setNewScroll({ viewport: this.elementRef.nativeElement });
    };
    return TreeViewportComponent;
}());
__decorate$13([
    _angular_core.HostListener('scroll', ['$event']),
    __metadata$11("design:type", Function),
    __metadata$11("design:paramtypes", [Object]),
    __metadata$11("design:returntype", void 0)
], exports.TreeViewportComponent.prototype, "onScroll", null);
exports.TreeViewportComponent = __decorate$13([
    _angular_core.Component({
        selector: 'TreeViewport, tree-viewport',
        styles: [
            ":host {\n      height: 100%;\n      overflow: auto;\n      display: block;\n    }"
        ],
        providers: [exports.TreeVirtualScroll],
        template: "\n    <div *mobxAutorun>\n      <div [style.height]=\"virtualScroll.totalHeight + 'px'\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  "
    }),
    __metadata$11("design:paramtypes", [_angular_core.ElementRef,
        exports.TreeVirtualScroll])
], exports.TreeViewportComponent);

var __decorate$14 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DRAG_OVER_CLASS = 'is-dragging-over';
var DRAG_DISABLED_CLASS = 'is-dragging-over-disabled';
exports.TreeDropDirective = (function () {
    function TreeDropDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
        this.onDropCallback = new _angular_core.EventEmitter();
        this._allowDrop = function (element) { return true; };
    }
    Object.defineProperty(TreeDropDirective.prototype, "treeAllowDrop", {
        set: function (allowDrop) {
            if (allowDrop instanceof Function) {
                this._allowDrop = allowDrop;
            }
            else
                this._allowDrop = function (element) { return allowDrop; };
        },
        enumerable: true,
        configurable: true
    });
    TreeDropDirective.prototype.allowDrop = function () {
        return this._allowDrop(this.treeDraggedElement.get());
    };
    TreeDropDirective.prototype.onDragOver = function ($event) {
        if (!this.allowDrop())
            return this.addDisabledClass();
        $event.preventDefault();
        this.addClass();
    };
    TreeDropDirective.prototype.onDragLeave = function ($event) {
        if (!this.allowDrop())
            return this.removeDisabledClass();
        this.removeClass();
    };
    TreeDropDirective.prototype.onDrop = function ($event) {
        if (!this.allowDrop())
            return;
        $event.preventDefault();
        this.onDropCallback.emit({ event: $event, element: this.treeDraggedElement.get() });
        this.removeClass();
    };
    TreeDropDirective.prototype.addClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, true);
    };
    TreeDropDirective.prototype.removeClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_OVER_CLASS, false);
    };
    TreeDropDirective.prototype.addDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, true);
    };
    TreeDropDirective.prototype.removeDisabledClass = function () {
        this.renderer.setElementClass(this.el.nativeElement, DRAG_DISABLED_CLASS, false);
    };
    return TreeDropDirective;
}());
__decorate$14([
    _angular_core.Output('treeDrop'),
    __metadata$12("design:type", Object)
], exports.TreeDropDirective.prototype, "onDropCallback", void 0);
__decorate$14([
    _angular_core.Input(),
    __metadata$12("design:type", Object),
    __metadata$12("design:paramtypes", [Object])
], exports.TreeDropDirective.prototype, "treeAllowDrop", null);
__decorate$14([
    _angular_core.HostListener('dragover', ['$event']),
    __metadata$12("design:type", Function),
    __metadata$12("design:paramtypes", [Object]),
    __metadata$12("design:returntype", void 0)
], exports.TreeDropDirective.prototype, "onDragOver", null);
__decorate$14([
    _angular_core.HostListener('dragleave', ['$event']),
    __metadata$12("design:type", Function),
    __metadata$12("design:paramtypes", [Object]),
    __metadata$12("design:returntype", void 0)
], exports.TreeDropDirective.prototype, "onDragLeave", null);
__decorate$14([
    _angular_core.HostListener('drop', ['$event']),
    __metadata$12("design:type", Function),
    __metadata$12("design:paramtypes", [Object]),
    __metadata$12("design:returntype", void 0)
], exports.TreeDropDirective.prototype, "onDrop", null);
exports.TreeDropDirective = __decorate$14([
    _angular_core.Directive({
        selector: '[treeDrop]'
    }),
    __metadata$12("design:paramtypes", [_angular_core.ElementRef, _angular_core.Renderer, exports.TreeDraggedElement])
], exports.TreeDropDirective);

var __decorate$15 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.TreeDragDirective = (function () {
    function TreeDragDirective(el, renderer, treeDraggedElement) {
        this.el = el;
        this.renderer = renderer;
        this.treeDraggedElement = treeDraggedElement;
    }
    TreeDragDirective.prototype.ngDoCheck = function () {
        this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', this.treeDragEnabled ? 'true' : 'false');
    };
    TreeDragDirective.prototype.onDragStart = function (ev) {
        var _this = this;
        // setting the data is required by firefox
        ev.dataTransfer.setData('text/plain', ev.target.id);
        setTimeout(function () { return _this.treeDraggedElement.set(_this.draggedElement); }, 30);
    };
    TreeDragDirective.prototype.onDragEnd = function () {
        this.treeDraggedElement.set(null);
    };
    return TreeDragDirective;
}());
__decorate$15([
    _angular_core.Input('treeDrag'),
    __metadata$13("design:type", Object)
], exports.TreeDragDirective.prototype, "draggedElement", void 0);
__decorate$15([
    _angular_core.Input(),
    __metadata$13("design:type", Object)
], exports.TreeDragDirective.prototype, "treeDragEnabled", void 0);
__decorate$15([
    _angular_core.HostListener('dragstart', ['$event']),
    __metadata$13("design:type", Function),
    __metadata$13("design:paramtypes", [Object]),
    __metadata$13("design:returntype", void 0)
], exports.TreeDragDirective.prototype, "onDragStart", null);
__decorate$15([
    _angular_core.HostListener('dragend'),
    __metadata$13("design:type", Function),
    __metadata$13("design:paramtypes", []),
    __metadata$13("design:returntype", void 0)
], exports.TreeDragDirective.prototype, "onDragEnd", null);
exports.TreeDragDirective = __decorate$15([
    _angular_core.Directive({
        selector: '[treeDrag]'
    }),
    __metadata$13("design:paramtypes", [_angular_core.ElementRef, _angular_core.Renderer, exports.TreeDraggedElement])
], exports.TreeDragDirective);

// element-closest | CC0-1.0 | github.com/jonathantneal/closest
if (typeof Element.prototype.matches !== 'function') {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype['mozMatchesSelector'] ||
        Element.prototype.webkitMatchesSelector ||
        function matches(selector) {
            var element = this;
            var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
            var index = 0;
            while (elements[index] && elements[index] !== element) {
                ++index;
            }
            return Boolean(elements[index]);
        };
}
if (typeof Element.prototype['closest'] !== 'function') {
    Element.prototype['closest'] = function closest(selector) {
        var element = this;
        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element;
            }
            element = element.parentNode;
        }
        return null;
    };
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var exportedDirectives = [
    exports.TreeComponent,
    exports.TreeNodeComponent,
    exports.TreeNodeContent,
    exports.LoadingComponent,
    exports.TreeDropDirective,
    exports.TreeDragDirective,
    exports.TreeNodeExpanderComponent,
    exports.TreeNodeChildrenComponent,
    exports.TreeNodeDropSlot,
    exports.TreeNodeCollectionComponent,
    exports.TreeViewportComponent
];
exports.TreeModule = (function () {
    function TreeModule() {
    }
    return TreeModule;
}());
exports.TreeModule = __decorate([
    _angular_core.NgModule({
        declarations: exportedDirectives.slice(),
        exports: exportedDirectives.slice(),
        imports: [
            _angular_common.CommonModule,
            ng2Mobx.Ng2MobxModule
        ],
        providers: [
            exports.TreeDraggedElement
        ]
    })
], exports.TreeModule);
var TreeModule$1 = exports.TreeModule;

exports.TreeNode = TreeNode;
exports.TREE_ACTIONS = TREE_ACTIONS;
exports.KEYS = KEYS;
exports['default'] = TreeModule$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
