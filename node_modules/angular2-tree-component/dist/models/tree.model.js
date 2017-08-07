var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Renderer } from '@angular/core';
import { observable, computed, action } from 'mobx';
import { TreeNode } from './tree-node.model';
import { TreeOptions } from './tree-options.model';
import { TREE_EVENTS } from '../constants/events';
import { first, last, compact, find, isString, isFunction } from 'lodash';
var TreeModel = TreeModel_1 = (function () {
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
        return first(skipHidden ? this.getVisibleRoots() : this.roots);
    };
    TreeModel.prototype.getLastRoot = function (skipHidden) {
        if (skipHidden === void 0) { skipHidden = false; }
        return last(skipHidden ? this.getVisibleRoots() : this.roots);
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
    ;
    Object.defineProperty(TreeModel.prototype, "loadingComponent", {
        get: function () { return this._loadingComponent; },
        enumerable: true,
        configurable: true
    });
    ;
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
            return compact(nodes);
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
            return compact(nodes);
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
        var childNode = find(startNode.children, { id: childId });
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
        var found = find(startNode.children, predicate);
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
        var action = this.options.actionMapping.keys[$event.keyCode];
        if (action) {
            $event.preventDefault();
            action(this, node, $event);
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
        if (isString(filter)) {
            filterFn = function (node) { return node.displayField.toLowerCase().indexOf(filter.toLowerCase()) !== -1; };
        }
        else if (isFunction(filter)) {
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
TreeModel.focusedTree = null;
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeModel.prototype, "roots", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "expandedNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "activeNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeModel.prototype, "hiddenNodeIds", void 0);
__decorate([
    observable,
    __metadata("design:type", String)
], TreeModel.prototype, "focusedNodeId", void 0);
__decorate([
    observable,
    __metadata("design:type", TreeNode)
], TreeModel.prototype, "virtualRoot", void 0);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setData", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "update", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setFocusedNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setFocus", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "focusedNode", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "expandedNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeModel.prototype, "activeNodes", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "doForAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusNextNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusPreviousNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusDrillDown", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "focusDrillUp", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setActiveNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setExpandedNode", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "expandAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "collapseAll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "setIsHidden", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "filterNodes", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "clearFilter", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TreeModel.prototype, "moveNode", null);
TreeModel = TreeModel_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Renderer])
], TreeModel);
export { TreeModel };
var TreeModel_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUErQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEcsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQXFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFHN0csSUFBYSxTQUFTO0lBb0JwQixtQkFBbUIsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWpCckMsWUFBTyxHQUFnQixJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRzdCLG9CQUFlLEdBQThCLEVBQUUsQ0FBQztRQUNoRCxrQkFBYSxHQUE4QixFQUFFLENBQUM7UUFDOUMsa0JBQWEsR0FBOEIsRUFBRSxDQUFDO1FBQzlDLGtCQUFhLEdBQVcsSUFBSSxDQUFDO1FBRXpDLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBR25CLGVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBT3RDLENBQUM7SUFFTywyQkFBTyxHQUFQLFVBQVEsRUFBaUY7WUFBL0UsZ0JBQUssRUFBRSxlQUFjLEVBQWQsbUNBQWMsRUFBRSxjQUFhLEVBQWIsa0NBQWE7UUFDcEQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxP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QUFNOzs7OzBDQUVOO0FBRU87SUFBUCxNQUFNOzs7OzRDQUVOO0FBTU87SUFBUCxNQUFNOzs7OzRDQUVOO0FBYU87SUFBUCxNQUFNOzs7OzRDQXdCTjtBQTBCTztJQUFQLE1BQU07Ozs7NENBR047QUFXTztJQUFQLE1BQU07Ozs7eUNBMkJOO0FBdllVLFNBQVM7SUFEckIsVUFBVSxFQUFFO3FDQXFCa0IsUUFBUTtHQXBCMUIsU0FBUyxDQXdZckI7U0F4WVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIENvbXBvbmVudCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgVGVtcGxhdGVSZWYsIFJlbmRlcmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCwgYWN0aW9uIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4vdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVPcHRpb25zIH0gZnJvbSAnLi90cmVlLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgSVRyZWVNb2RlbCB9IGZyb20gJy4uL2RlZnMvYXBpJztcbmltcG9ydCB7IFRSRUVfRVZFTlRTIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5cbmltcG9ydCB7IGZpcnN0LCBsYXN0LCBjb21wYWN0LCBmaW5kLCBpbmNsdWRlcywgcmVtb3ZlLCBpbmRleE9mLCBwdWxsQXQsIGlzU3RyaW5nLCBpc0Z1bmN0aW9uIH0gZnJvbSAnbG9kYXNoJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRyZWVNb2RlbCBpbXBsZW1lbnRzIElUcmVlTW9kZWwge1xuICBzdGF0aWMgZm9jdXNlZFRyZWUgPSBudWxsO1xuXG4gIG9wdGlvbnM6IFRyZWVPcHRpb25zID0gbmV3IFRyZWVPcHRpb25zKCk7XG4gIG5vZGVzOiBhbnlbXTtcbiAgQG9ic2VydmFibGUgcm9vdHM6IFRyZWVOb2RlW107XG4gIEBvYnNlcnZhYmxlIGV4cGFuZGVkTm9kZUlkczogeyBbaWQ6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICBAb2JzZXJ2YWJsZSBhY3RpdmVOb2RlSWRzOiB7IFtpZDogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gIEBvYnNlcnZhYmxlIGhpZGRlbk5vZGVJZHM6IHsgW2lkOiBzdHJpbmddOiBib29sZWFuIH0gPSB7fTtcbiAgQG9ic2VydmFibGUgZm9jdXNlZE5vZGVJZDogc3RyaW5nID0gbnVsbDtcbiAgQG9ic2VydmFibGUgdmlydHVhbFJvb3Q6IFRyZWVOb2RlO1xuICBmaXJzdFVwZGF0ZSA9IHRydWU7XG4gIHB1YmxpYyB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbDtcblxuICBldmVudE5hbWVzID0gT2JqZWN0LmtleXMoVFJFRV9FVkVOVFMpO1xuXG4gIHByaXZhdGUgX3RyZWVOb2RlQ29udGVudENvbXBvbmVudDogYW55O1xuICBwcml2YXRlIF9sb2FkaW5nQ29tcG9uZW50OiBhbnk7XG4gIHByaXZhdGUgZXZlbnRzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuICB9XG5cbiAgQGFjdGlvbiBzZXREYXRhKHsgbm9kZXMsIG9wdGlvbnMgPSBudWxsLCBldmVudHMgPSBudWxsIH06IHtub2RlczogYW55LCBvcHRpb25zOiBhbnksIGV2ZW50czogYW55fSkge1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLm9wdGlvbnMgPSBuZXcgVHJlZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuICAgIGlmIChldmVudHMpIHtcbiAgICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgIH1cbiAgICBpZiAobm9kZXMpIHtcbiAgICAgIHRoaXMubm9kZXMgPSBub2RlcztcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgQGFjdGlvbiB1cGRhdGUoKSB7XG4gICAgLy8gUmVidWlsZCB0cmVlOlxuICAgIGxldCB2aXJ0dWFsUm9vdENvbmZpZyA9IHtcbiAgICAgIHZpcnR1YWw6IHRydWUsXG4gICAgICBbdGhpcy5vcHRpb25zLmNoaWxkcmVuRmllbGRdOiB0aGlzLm5vZGVzXG4gICAgfTtcblxuICAgIHRoaXMudmlydHVhbFJvb3QgPSBuZXcgVHJlZU5vZGUodmlydHVhbFJvb3RDb25maWcsIG51bGwsIHRoaXMsIDApO1xuXG4gICAgdGhpcy5yb290cyA9IHRoaXMudmlydHVhbFJvb3QuY2hpbGRyZW47XG5cbiAgICAvLyBGaXJlIGV2ZW50OlxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICBpZiAodGhpcy5yb290cykge1xuICAgICAgICB0aGlzLmZpcmVFdmVudCh7IGV2ZW50TmFtZTogVFJFRV9FVkVOVFMub25Jbml0aWFsaXplZCB9KTtcbiAgICAgICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblVwZGF0ZURhdGEgfSk7XG4gICAgfVxuICB9XG5cbiAgX2NhbGN1bGF0ZUV4cGFuZGVkTm9kZXMoc3RhcnROb2RlID0gbnVsbCkge1xuICAgIHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZSB8fCB0aGlzLnZpcnR1YWxSb290O1xuXG4gICAgaWYgKHN0YXJ0Tm9kZS5kYXRhW3RoaXMub3B0aW9ucy5pc0V4cGFuZGVkRmllbGRdKSB7XG4gICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W3N0YXJ0Tm9kZS5pZF06IHRydWV9KTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgc3RhcnROb2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLl9jYWxjdWxhdGVFeHBhbmRlZE5vZGVzKGNoaWxkKSk7XG4gICAgfVxuICB9XG5cbiAgZmlyZUV2ZW50KGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnQuZXZlbnROYW1lXS5lbWl0KGV2ZW50KTtcbiAgICB0aGlzLmV2ZW50cy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnN1YnNjcmliZShmbik7XG4gIH1cblxuICBnZXRGb2N1c2VkTm9kZSgpOiBUcmVlTm9kZSB7XG4gICAgcmV0dXJuIHRoaXMuZm9jdXNlZE5vZGU7XG4gIH1cblxuICBAYWN0aW9uIHNldEZvY3VzZWROb2RlKG5vZGUpIHtcbiAgICB0aGlzLmZvY3VzZWROb2RlSWQgPSBub2RlID8gbm9kZS5pZCA6IG51bGw7XG4gIH1cblxuICBnZXRBY3RpdmVOb2RlKCk6IFRyZWVOb2RlIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2Rlc1swXTtcbiAgfVxuXG4gIGdldEFjdGl2ZU5vZGVzKCk6IFRyZWVOb2RlW10ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZU5vZGVzO1xuICB9XG5cbiAgZ2V0VmlzaWJsZVJvb3RzKCkge1xuICAgIHJldHVybiB0aGlzLnZpcnR1YWxSb290LnZpc2libGVDaGlsZHJlbjtcbiAgfVxuXG4gIGdldEZpcnN0Um9vdChza2lwSGlkZGVuID0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmlyc3Qoc2tpcEhpZGRlbiA/IHRoaXMuZ2V0VmlzaWJsZVJvb3RzKCkgOiB0aGlzLnJvb3RzKTtcbiAgfVxuXG4gIGdldExhc3RSb290KHNraXBIaWRkZW4gPSBmYWxzZSkge1xuICAgIHJldHVybiBsYXN0KHNraXBIaWRkZW4gPyB0aGlzLmdldFZpc2libGVSb290cygpIDogdGhpcy5yb290cyk7XG4gIH1cblxuICBnZXQgaXNGb2N1c2VkKCkge1xuICAgIHJldHVybiBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPT09IHRoaXM7XG4gIH1cblxuICBpc05vZGVGb2N1c2VkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkTm9kZSA9PT0gbm9kZTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0Rm9jdXModmFsdWUpIHtcbiAgICBUcmVlTW9kZWwuZm9jdXNlZFRyZWUgPSB2YWx1ZSA/IHRoaXMgOiBudWxsO1xuICB9XG5cbiAgaXNFbXB0eVRyZWUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucm9vdHMgJiYgdGhpcy5yb290cy5sZW5ndGggPT09IDA7XG4gIH1cblxuICBnZXQgdHJlZU5vZGVDb250ZW50Q29tcG9uZW50KCkgeyByZXR1cm4gdGhpcy5fdHJlZU5vZGVDb250ZW50Q29tcG9uZW50OyB9O1xuXG4gIGdldCBsb2FkaW5nQ29tcG9uZW50KCkgeyByZXR1cm4gdGhpcy5fbG9hZGluZ0NvbXBvbmVudDsgfTtcblxuICBAY29tcHV0ZWQgZ2V0IGZvY3VzZWROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWROb2RlSWQgPyB0aGlzLmdldE5vZGVCeUlkKHRoaXMuZm9jdXNlZE5vZGVJZCkgOiBudWxsO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCBleHBhbmRlZE5vZGVzKCkge1xuICAgIGNvbnN0IG5vZGVzID0gT2JqZWN0LmtleXModGhpcy5leHBhbmRlZE5vZGVJZHMpXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5leHBhbmRlZE5vZGVJZHNbaWRdKVxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcblxuICAgIHJldHVybiBjb21wYWN0KG5vZGVzKTtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgYWN0aXZlTm9kZXMoKSB7XG4gICAgY29uc3Qgbm9kZXMgPSBPYmplY3Qua2V5cyh0aGlzLmFjdGl2ZU5vZGVJZHMpXG4gICAgICAuZmlsdGVyKChpZCkgPT4gdGhpcy5leHBhbmRlZE5vZGVJZHNbaWRdKVxuICAgICAgLm1hcCgoaWQpID0+IHRoaXMuZ2V0Tm9kZUJ5SWQoaWQpKTtcblxuICAgIHJldHVybiBjb21wYWN0KG5vZGVzKTtcbiAgfVxuXG4gIGdldE5vZGVCeVBhdGgocGF0aCwgc3RhcnROb2RlPSBudWxsKTogVHJlZU5vZGUge1xuICAgIGlmICghcGF0aCkgcmV0dXJuIG51bGw7XG5cbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiBzdGFydE5vZGU7XG5cbiAgICBpZiAoIXN0YXJ0Tm9kZS5jaGlsZHJlbikgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBjaGlsZElkID0gcGF0aC5zaGlmdCgpO1xuICAgIGNvbnN0IGNoaWxkTm9kZSA9IGZpbmQoc3RhcnROb2RlLmNoaWxkcmVuLCB7IGlkOiBjaGlsZElkIH0pO1xuXG4gICAgaWYgKCFjaGlsZE5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5UGF0aChwYXRoLCBjaGlsZE5vZGUpO1xuICB9XG5cbiAgZ2V0Tm9kZUJ5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXROb2RlQnkoeyBpZCB9KTtcbiAgfVxuXG4gIGdldE5vZGVCeShwcmVkaWNhdGUsIHN0YXJ0Tm9kZSA9IG51bGwpIHtcbiAgICBzdGFydE5vZGUgPSBzdGFydE5vZGUgfHwgdGhpcy52aXJ0dWFsUm9vdDtcblxuICAgIGlmICghc3RhcnROb2RlLmNoaWxkcmVuKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGZvdW5kID0gZmluZChzdGFydE5vZGUuY2hpbGRyZW4sIHByZWRpY2F0ZSk7XG5cbiAgICBpZiAoZm91bmQpIHsgLy8gZm91bmQgaW4gY2hpbGRyZW5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9IGVsc2UgeyAvLyBsb29rIGluIGNoaWxkcmVuJ3MgY2hpbGRyZW5cbiAgICAgIGZvciAobGV0IGNoaWxkIG9mIHN0YXJ0Tm9kZS5jaGlsZHJlbikge1xuICAgICAgICBjb25zdCBmb3VuZEluQ2hpbGRyZW4gPSB0aGlzLmdldE5vZGVCeShwcmVkaWNhdGUsIGNoaWxkKTtcbiAgICAgICAgaWYgKGZvdW5kSW5DaGlsZHJlbikgcmV0dXJuIGZvdW5kSW5DaGlsZHJlbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAYWN0aW9uIGRvRm9yQWxsKGZuKSB7XG4gICAgdGhpcy5yb290cy5mb3JFYWNoKChyb290KSA9PiByb290LmRvRm9yQWxsKGZuKSk7XG4gIH1cblxuICBAYWN0aW9uIGZvY3VzTmV4dE5vZGUoKSB7XG4gICAgbGV0IHByZXZpb3VzTm9kZSA9IHRoaXMuZ2V0Rm9jdXNlZE5vZGUoKTtcbiAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZmluZE5leHROb2RlKHRydWUsIHRydWUpIDogdGhpcy5nZXRGaXJzdFJvb3QodHJ1ZSk7XG4gICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xuICB9XG5cbiAgQGFjdGlvbiBmb2N1c1ByZXZpb3VzTm9kZSgpIHtcbiAgICBsZXQgcHJldmlvdXNOb2RlID0gdGhpcy5nZXRGb2N1c2VkTm9kZSgpO1xuICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZSA/IHByZXZpb3VzTm9kZS5maW5kUHJldmlvdXNOb2RlKHRydWUpIDogdGhpcy5nZXRMYXN0Um9vdCh0cnVlKTtcbiAgICBpZiAobmV4dE5vZGUpIG5leHROb2RlLmZvY3VzKCk7XG4gIH1cblxuICBAYWN0aW9uIGZvY3VzRHJpbGxEb3duKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgaWYgKHByZXZpb3VzTm9kZSAmJiBwcmV2aW91c05vZGUuaXNDb2xsYXBzZWQgJiYgcHJldmlvdXNOb2RlLmhhc0NoaWxkcmVuKSB7XG4gICAgICBwcmV2aW91c05vZGUudG9nZ2xlRXhwYW5kZWQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgbmV4dE5vZGUgPSBwcmV2aW91c05vZGUgPyBwcmV2aW91c05vZGUuZ2V0Rmlyc3RDaGlsZCh0cnVlKSA6IHRoaXMuZ2V0Rmlyc3RSb290KHRydWUpO1xuICAgICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb24gZm9jdXNEcmlsbFVwKCkge1xuICAgIGxldCBwcmV2aW91c05vZGUgPSB0aGlzLmdldEZvY3VzZWROb2RlKCk7XG4gICAgaWYgKCFwcmV2aW91c05vZGUpIHJldHVybjtcbiAgICBpZiAocHJldmlvdXNOb2RlLmlzRXhwYW5kZWQpIHtcbiAgICAgIHByZXZpb3VzTm9kZS50b2dnbGVFeHBhbmRlZCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGxldCBuZXh0Tm9kZSA9IHByZXZpb3VzTm9kZS5yZWFsUGFyZW50O1xuICAgICAgaWYgKG5leHROb2RlKSBuZXh0Tm9kZS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIGlzQWN0aXZlKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVOb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRBY3RpdmVOb2RlKG5vZGUsIHZhbHVlLCBtdWx0aSA9IGZhbHNlKSB7XG4gICAgaWYgKG11bHRpKSB7XG4gICAgICB0aGlzLl9zZXRBY3RpdmVOb2RlTXVsdGkobm9kZSwgdmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgbm9kZS5mb2N1cygpO1xuICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQWN0aXZhdGUsIG5vZGUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkRlYWN0aXZhdGUsIG5vZGUgfSk7XG4gICAgfVxuICB9XG5cbiAgX3NldEFjdGl2ZU5vZGVTaW5nbGUobm9kZSwgdmFsdWUpIHtcbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBvdGhlciBub2RlczpcbiAgICB0aGlzLmFjdGl2ZU5vZGVzXG4gICAgICAuZmlsdGVyKChhY3RpdmVOb2RlKSA9PiBhY3RpdmVOb2RlICE9PSBub2RlKVxuICAgICAgLmZvckVhY2goKGFjdGl2ZU5vZGUpID0+IHtcbiAgICAgICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uRGVhY3RpdmF0ZSwgbm9kZTogYWN0aXZlTm9kZSB9KTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7W25vZGUuaWRdOiB0cnVlfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZU5vZGVJZHMgPSB7fTtcbiAgICB9XG4gIH1cblxuICBfc2V0QWN0aXZlTm9kZU11bHRpKG5vZGUsIHZhbHVlKSB7XG4gICAgdGhpcy5hY3RpdmVOb2RlSWRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hY3RpdmVOb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xuICB9XG5cbiAgaXNFeHBhbmRlZChub2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwYW5kZWROb2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRFeHBhbmRlZE5vZGUobm9kZSwgdmFsdWUpIHtcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZXhwYW5kZWROb2RlSWRzLCB7W25vZGUuaWRdOiB2YWx1ZX0pO1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vblRvZ2dsZUV4cGFuZGVkLCBub2RlLCBpc0V4cGFuZGVkOiB2YWx1ZSB9KTtcbiAgfVxuXG4gIEBhY3Rpb24gZXhwYW5kQWxsKCkge1xuICAgIHRoaXMucm9vdHMuZm9yRWFjaCgocm9vdCkgPT4gcm9vdC5leHBhbmRBbGwoKSk7XG4gIH1cblxuICBAYWN0aW9uIGNvbGxhcHNlQWxsKCkge1xuICAgIHRoaXMucm9vdHMuZm9yRWFjaCgocm9vdCkgPT4gcm9vdC5jb2xsYXBzZUFsbCgpKTtcbiAgfVxuXG4gIGlzSGlkZGVuKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRkZW5Ob2RlSWRzW25vZGUuaWRdO1xuICB9XG5cbiAgQGFjdGlvbiBzZXRJc0hpZGRlbihub2RlLCB2YWx1ZSkge1xuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaGlkZGVuTm9kZUlkcywge1tub2RlLmlkXTogdmFsdWV9KTtcbiAgfVxuXG4gIHBlcmZvcm1LZXlBY3Rpb24obm9kZSwgJGV2ZW50KSB7XG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5vcHRpb25zLmFjdGlvbk1hcHBpbmcua2V5c1skZXZlbnQua2V5Q29kZV07XG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBhY3Rpb24odGhpcywgbm9kZSwgJGV2ZW50KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQGFjdGlvbiBmaWx0ZXJOb2RlcyhmaWx0ZXIsIGF1dG9TaG93ID0gdHJ1ZSkge1xuICAgIGxldCBmaWx0ZXJGbjtcblxuICAgIGlmICghZmlsdGVyKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbGVhckZpbHRlcigpO1xuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZnVuY3Rpb24gYW5kIHN0cmluZyBmaWx0ZXJcbiAgICBpZiAoaXNTdHJpbmcoZmlsdGVyKSkge1xuICAgICAgZmlsdGVyRm4gPSAobm9kZSkgPT4gbm9kZS5kaXNwbGF5RmllbGQudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlci50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRnVuY3Rpb24oZmlsdGVyKSkge1xuICAgICAgIGZpbHRlckZuID0gZmlsdGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0RvblxcJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggZmlsdGVyJywgZmlsdGVyKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1Nob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgZnVuY3Rpb24nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpZHMgPSB7fTtcbiAgICB0aGlzLnJvb3RzLmZvckVhY2goKG5vZGUpID0+IHRoaXMuX2ZpbHRlck5vZGUoaWRzLCBub2RlLCBmaWx0ZXJGbiwgYXV0b1Nob3cpKTtcbiAgICB0aGlzLmhpZGRlbk5vZGVJZHMgPSBpZHM7XG4gICAgdGhpcy5maXJlRXZlbnQoeyBldmVudE5hbWU6IFRSRUVfRVZFTlRTLm9uQ2hhbmdlRmlsdGVyIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyTm9kZShpZHMsIG5vZGUsIGZpbHRlckZuLCBhdXRvU2hvdykge1xuICAgIC8vIGlmIG5vZGUgcGFzc2VzIGZ1bmN0aW9uIHRoZW4gaXQncyB2aXNpYmxlXG4gICAgbGV0IGlzVmlzaWJsZSA9IGZpbHRlckZuKG5vZGUpO1xuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgIC8vIGlmIG9uZSBvZiBub2RlJ3MgY2hpbGRyZW4gcGFzc2VzIGZpbHRlciB0aGVuIHRoaXMgbm9kZSBpcyBhbHNvIHZpc2libGVcbiAgICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2ZpbHRlck5vZGUoaWRzLCBjaGlsZCwgZmlsdGVyRm4sIGF1dG9TaG93KSkge1xuICAgICAgICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIG1hcmsgbm9kZSBhcyBoaWRkZW5cbiAgICBpZiAoIWlzVmlzaWJsZSkge1xuICAgICAgaWRzW25vZGUuaWRdID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gYXV0byBleHBhbmQgcGFyZW50cyB0byBtYWtlIHN1cmUgdGhlIGZpbHRlcmVkIG5vZGVzIGFyZSB2aXNpYmxlXG4gICAgaWYgKGF1dG9TaG93ICYmIGlzVmlzaWJsZSkge1xuICAgICAgbm9kZS5lbnN1cmVWaXNpYmxlKCk7XG4gICAgfVxuICAgIHJldHVybiBpc1Zpc2libGU7XG4gIH1cblxuICBAYWN0aW9uIGNsZWFyRmlsdGVyKCkge1xuICAgIHRoaXMuaGlkZGVuTm9kZUlkcyA9IHt9O1xuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbkNoYW5nZUZpbHRlciB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nhbk1vdmVOb2RlKG5vZGUsIGZyb21JbmRleCwgdG8pIHtcbiAgICAvLyBzYW1lIG5vZGU6XG4gICAgaWYgKG5vZGUucGFyZW50ID09PSB0by5wYXJlbnQgJiYgZnJvbUluZGV4ID09PSB0by5pbmRleCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhdG8ucGFyZW50LmlzRGVzY2VuZGFudE9mKG5vZGUpO1xuICB9XG5cbiAgQGFjdGlvbiBtb3ZlTm9kZShub2RlLCB0bykge1xuICAgIGNvbnN0IGZyb21JbmRleCA9IG5vZGUuZ2V0SW5kZXhJblBhcmVudCgpO1xuICAgIGNvbnN0IGZyb21QYXJlbnQgPSBub2RlLnBhcmVudDtcblxuICAgIGlmICghdGhpcy5fY2FuTW92ZU5vZGUobm9kZSwgZnJvbUluZGV4ICwgdG8pKSByZXR1cm47XG5cbiAgICBjb25zdCBmcm9tQ2hpbGRyZW4gPSBmcm9tUGFyZW50LmdldEZpZWxkKCdjaGlsZHJlbicpO1xuXG4gICAgLy8gSWYgbm9kZSBkb2Vzbid0IGhhdmUgY2hpbGRyZW4gLSBjcmVhdGUgY2hpbGRyZW4gYXJyYXlcbiAgICBpZiAoIXRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKSkge1xuICAgICAgdG8ucGFyZW50LnNldEZpZWxkKCdjaGlsZHJlbicsIFtdKTtcbiAgICB9XG4gICAgY29uc3QgdG9DaGlsZHJlbiA9IHRvLnBhcmVudC5nZXRGaWVsZCgnY2hpbGRyZW4nKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsTm9kZSA9IGZyb21DaGlsZHJlbi5zcGxpY2UoZnJvbUluZGV4LCAxKVswXTtcblxuICAgIC8vIENvbXBlbnNhdGUgZm9yIGluZGV4IGlmIGFscmVhZHkgcmVtb3ZlZCBmcm9tIHBhcmVudDpcbiAgICBsZXQgdG9JbmRleCA9IChmcm9tUGFyZW50ID09PSB0by5wYXJlbnQgJiYgdG8uaW5kZXggPiBmcm9tSW5kZXgpID8gdG8uaW5kZXggLSAxIDogdG8uaW5kZXg7XG5cbiAgICB0b0NoaWxkcmVuLnNwbGljZSh0b0luZGV4LCAwLCBvcmlnaW5hbE5vZGUpO1xuXG4gICAgZnJvbVBhcmVudC50cmVlTW9kZWwudXBkYXRlKCk7XG4gICAgaWYgKHRvLnBhcmVudC50cmVlTW9kZWwgIT09IGZyb21QYXJlbnQudHJlZU1vZGVsKSB7XG4gICAgICB0by5wYXJlbnQudHJlZU1vZGVsLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZUV2ZW50KHsgZXZlbnROYW1lOiBUUkVFX0VWRU5UUy5vbk1vdmVOb2RlLCBub2RlOiBvcmlnaW5hbE5vZGUsIHRvOiB7IHBhcmVudDogdG8ucGFyZW50LmRhdGEsIGluZGV4OiB0b0luZGV4IH0gfSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19