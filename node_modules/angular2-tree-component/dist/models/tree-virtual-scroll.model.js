var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { observable, computed, action, autorun, reaction } from 'mobx';
import { TreeModel } from './tree.model';
import { TREE_EVENTS } from '../constants/events';
var Y_OFFSET = 300; // Extra pixels outside the viewport, in each direction, to render nodes in
var Y_EPSILON = 50; // Minimum pixel change required to recalculate the rendered nodes
var TreeVirtualScroll = (function () {
    function TreeVirtualScroll(treeModel) {
        var _this = this;
        this.treeModel = treeModel;
        this.yBlocks = 0;
        this.x = 0;
        this.viewportHeight = null;
        this.viewport = null;
        treeModel.virtualScroll = this;
        this._dispose = autorun(function () { return _this.fixScroll(); });
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
        reaction(function () { return _this.treeModel.roots; }, fn);
        reaction(function () { return _this.treeModel.expandedNodeIds; }, fn);
        reaction(function () { return _this.treeModel.hiddenNodeIds; }, fn);
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
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "yBlocks", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "x", void 0);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeVirtualScroll.prototype, "viewportHeight", void 0);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "y", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "totalHeight", null);
__decorate([
    computed.struct,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "viewportNodes", null);
__decorate([
    computed,
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], TreeVirtualScroll.prototype, "translateY", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "setNewScroll", null);
__decorate([
    action,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], TreeVirtualScroll.prototype, "scrollIntoView", null);
TreeVirtualScroll = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [TreeModel])
], TreeVirtualScroll);
export { TreeVirtualScroll };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRWxELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDJFQUEyRTtBQUNqRyxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxrRUFBa0U7QUFHeEYsSUFBYSxpQkFBaUI7SUF3QjVCLDJCQUFvQixTQUFvQjtRQUF4QyxpQkFHQztRQUhtQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckI1QixZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLG1CQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFtQmQsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLEVBQUUsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFuQlMsc0JBQUksZ0NBQUM7YUFBTDtZQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVTLHNCQUFJLDBDQUFXO2FBQWY7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFNB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QztJQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgYXV0b3J1biwgcmVhY3Rpb24gfSBmcm9tICdtb2J4JztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4vdHJlZS5tb2RlbCc7XG5pbXBvcnQgeyBUUkVFX0VWRU5UUyB9IGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuXG5jb25zdCBZX09GRlNFVCA9IDMwMDsgLy8gRXh0cmEgcGl4ZWxzIG91dHNpZGUgdGhlIHZpZXdwb3J0LCBpbiBlYWNoIGRpcmVjdGlvbiwgdG8gcmVuZGVyIG5vZGVzIGluXG5jb25zdCBZX0VQU0lMT04gPSA1MDsgLy8gTWluaW11bSBwaXhlbCBjaGFuZ2UgcmVxdWlyZWQgdG8gcmVjYWxjdWxhdGUgdGhlIHJlbmRlcmVkIG5vZGVzXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlVmlydHVhbFNjcm9sbCB7XG4gIHByaXZhdGUgX2Rpc3Bvc2U6IGFueTtcblxuICBAb2JzZXJ2YWJsZSB5QmxvY2tzID0gMDtcbiAgQG9ic2VydmFibGUgeCA9IDA7XG4gIEBvYnNlcnZhYmxlIHZpZXdwb3J0SGVpZ2h0ID0gbnVsbDtcbiAgdmlld3BvcnQgPSBudWxsO1xuXG4gIEBjb21wdXRlZCBnZXQgeSgpIHtcbiAgICByZXR1cm4gdGhpcy55QmxvY2tzICogWV9FUFNJTE9OO1xuICB9XG5cbiAgQGNvbXB1dGVkIGdldCB0b3RhbEhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QgPyB0aGlzLnRyZWVNb2RlbC52aXJ0dWFsUm9vdC5oZWlnaHQgOiAwO1xuICB9XG5cbiAgQGNvbXB1dGVkLnN0cnVjdCBnZXQgdmlld3BvcnROb2RlcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRWaWV3cG9ydE5vZGVzKHRoaXMudHJlZU1vZGVsLnJvb3RzKTtcbiAgfVxuXG4gIEBjb21wdXRlZCBnZXQgdHJhbnNsYXRlWSgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3cG9ydE5vZGVzWzBdID8gdGhpcy52aWV3cG9ydE5vZGVzWzBdLnBvc2l0aW9uICsgdGhpcy55IDogMDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJlZU1vZGVsOiBUcmVlTW9kZWwpIHtcbiAgICB0cmVlTW9kZWwudmlydHVhbFNjcm9sbCA9IHRoaXM7XG4gICAgdGhpcy5fZGlzcG9zZSA9IGF1dG9ydW4oKCkgPT4gdGhpcy5maXhTY3JvbGwoKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IGZuID0gdGhpcy5yZWNhbGNQb3NpdGlvbnMuYmluZCh0aGlzKTtcblxuICAgIGZuKCk7XG4gICAgcmVhY3Rpb24oKCkgPT4gdGhpcy50cmVlTW9kZWwucm9vdHMsIGZuKTtcbiAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5leHBhbmRlZE5vZGVJZHMsIGZuKTtcbiAgICByZWFjdGlvbigoKSA9PiB0aGlzLnRyZWVNb2RlbC5oaWRkZW5Ob2RlSWRzLCBmbik7XG4gICAgdGhpcy50cmVlTW9kZWwuc3Vic2NyaWJlKFRSRUVfRVZFTlRTLm9uTG9hZENoaWxkcmVuLCBmbik7XG4gIH1cblxuICByZWNhbGNQb3NpdGlvbnMoKSB7XG4gICAgdGhpcy50cmVlTW9kZWwudmlydHVhbFJvb3QuaGVpZ2h0ID0gdGhpcy5fZ2V0UG9zaXRpb25BZnRlcih0aGlzLnRyZWVNb2RlbC5nZXRWaXNpYmxlUm9vdHMoKSwgMCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb3NpdGlvbkFmdGVyKG5vZGVzLCBzdGFydFBvcykge1xuICAgIGxldCBwb3NpdGlvbiA9IHN0YXJ0UG9zO1xuXG4gICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyTm9kZShub2RlLCBwb3NpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9zaXRpb25BZnRlck5vZGUobm9kZSwgc3RhcnRQb3MpIHtcbiAgICBsZXQgcG9zaXRpb24gPSBub2RlLmdldFNlbGZIZWlnaHQoKSArIHN0YXJ0UG9zO1xuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5pc0V4cGFuZGVkKSB7IC8vIFRCRDogY29uc2lkZXIgbG9hZGluZyBjb21wb25lbnQgYXMgd2VsbFxuICAgICAgcG9zaXRpb24gPSB0aGlzLl9nZXRQb3NpdGlvbkFmdGVyKG5vZGUudmlzaWJsZUNoaWxkcmVuLCBwb3NpdGlvbik7XG4gICAgfVxuICAgIG5vZGUuaGVpZ2h0ID0gcG9zaXRpb24gLSBzdGFydFBvcztcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuXG4gIGNsZWFyKCkge1xuICAgIHRoaXMuX2Rpc3Bvc2UoKTtcbiAgfVxuXG4gIEBhY3Rpb24gc2V0TmV3U2Nyb2xsKHsgdmlld3BvcnQgfSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgdmlld3BvcnQsXG4gICAgICB4OiB2aWV3cG9ydC5zY3JvbGxMZWZ0LFxuICAgICAgeUJsb2NrczogTWF0aC5yb3VuZCh2aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pLFxuICAgICAgdmlld3BvcnRIZWlnaHQ6IHZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgQGFjdGlvbiBzY3JvbGxJbnRvVmlldyhub2RlLCBmb3JjZSwgc2Nyb2xsVG9NaWRkbGUgPSB0cnVlKSB7XG4gICAgaWYgKGZvcmNlIHx8IC8vIGZvcmNlIHNjcm9sbCB0byBub2RlXG4gICAgICBub2RlLnBvc2l0aW9uIDwgdGhpcy55IHx8IC8vIG5vZGUgaXMgYWJvdmUgdmlld3BvcnRcbiAgICAgIG5vZGUucG9zaXRpb24gKyBub2RlLmdldFNlbGZIZWlnaHQoKSA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQpIHsgLy8gbm9kZSBpcyBiZWxvdyB2aWV3cG9ydFxuICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgPSBzY3JvbGxUb01pZGRsZSA/XG4gICAgICAgIG5vZGUucG9zaXRpb24gLSB0aGlzLnZpZXdwb3J0SGVpZ2h0IC8gMiA6IC8vIHNjcm9sbCB0byBtaWRkbGVcbiAgICAgICAgbm9kZS5wb3NpdGlvbjsgLy8gc2Nyb2xsIHRvIHN0YXJ0XG5cbiAgICAgIHRoaXMueUJsb2NrcyA9IE1hdGguZmxvb3IodGhpcy52aWV3cG9ydC5zY3JvbGxUb3AgLyBZX0VQU0lMT04pO1xuICAgIH1cbiAgfVxuXG4gIGdldFZpZXdwb3J0Tm9kZXMobm9kZXMpIHtcbiAgICBpZiAoIXRoaXMudmlld3BvcnRIZWlnaHQgfHwgIW5vZGVzIHx8ICFub2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IHZpc2libGVOb2RlcyA9IG5vZGVzLmZpbHRlcigobm9kZSkgPT4gIW5vZGUuaXNIaWRkZW4pO1xuXG4gICAgaWYgKCF2aXNpYmxlTm9kZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAvLyBTZWFyY2ggZm9yIGZpcnN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcbiAgICAvLyBMb29rIGZvciBmaXJzdCBub2RlIHRoYXQgc3RhcnRzIGFmdGVyIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHZpZXdwb3J0ICh3aXRoIGJ1ZmZlcilcbiAgICAvLyBPciB0aGF0IGVuZHMgYWZ0ZXIgdGhlIGJlZ2lubmluZyBvZiB0aGUgdmlld3BvcnRcbiAgICBjb25zdCBmaXJzdEluZGV4ID0gYmluYXJ5U2VhcmNoKHZpc2libGVOb2RlcywgKG5vZGUpID0+IHtcbiAgICAgIHJldHVybiAobm9kZS5wb3NpdGlvbiArIFlfT0ZGU0VUID4gdGhpcy55KSB8fFxuICAgICAgICAgICAgIChub2RlLnBvc2l0aW9uICsgbm9kZS5oZWlnaHQgPiB0aGlzLnkpO1xuICAgIH0pO1xuXG4gICAgLy8gU2VhcmNoIGZvciBsYXN0IG5vZGUgaW4gdGhlIHZpZXdwb3J0IHVzaW5nIGJpbmFyeSBzZWFyY2hcbiAgICAvLyBMb29rIGZvciBmaXJzdCBub2RlIHRoYXQgc3RhcnRzIGFmdGVyIHRoZSBlbmQgb2YgdGhlIHZpZXdwb3J0ICh3aXRoIGJ1ZmZlcilcbiAgICBjb25zdCBsYXN0SW5kZXggPSBiaW5hcnlTZWFyY2godmlzaWJsZU5vZGVzLCAobm9kZSkgPT4ge1xuICAgICAgcmV0dXJuIG5vZGUucG9zaXRpb24gLSBZX09GRlNFVCA+IHRoaXMueSArIHRoaXMudmlld3BvcnRIZWlnaHQ7XG4gICAgfSwgZmlyc3RJbmRleCk7XG5cbiAgICBjb25zdCB2aWV3cG9ydE5vZGVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpKyspIHtcbiAgICAgIHZpZXdwb3J0Tm9kZXMucHVzaCh2aXNpYmxlTm9kZXNbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3cG9ydE5vZGVzO1xuICB9XG5cbiAgZml4U2Nyb2xsKCkge1xuICAgIGNvbnN0IG1heFkgPSBNYXRoLm1heCgwLCB0aGlzLnRvdGFsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydEhlaWdodCk7XG5cbiAgICBpZiAodGhpcy55IDwgMCkgdGhpcy55QmxvY2tzID0gMDtcbiAgICBpZiAodGhpcy55ID4gbWF4WSkgdGhpcy55QmxvY2tzID0gbWF4WSAvIFlfRVBTSUxPTjtcbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5hcnlTZWFyY2gobm9kZXMsIGNvbmRpdGlvbiwgZmlyc3RJbmRleCA9IDApIHtcbiAgbGV0IGluZGV4ID0gZmlyc3RJbmRleDtcbiAgbGV0IHRvSW5kZXggPSBub2Rlcy5sZW5ndGggLSAxO1xuXG4gIHdoaWxlIChpbmRleCAhPT0gdG9JbmRleCkge1xuICAgIGxldCBtaWRJbmRleCA9IE1hdGguZmxvb3IoKGluZGV4ICsgdG9JbmRleCkgLyAyKTtcblxuICAgIGlmIChjb25kaXRpb24obm9kZXNbbWlkSW5kZXhdKSkge1xuICAgICAgdG9JbmRleCA9IG1pZEluZGV4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChpbmRleCA9PT0gbWlkSW5kZXgpIGluZGV4ID0gdG9JbmRleDtcbiAgICAgIGVsc2UgaW5kZXggPSBtaWRJbmRleDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=