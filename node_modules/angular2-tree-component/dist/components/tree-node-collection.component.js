var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, ElementRef } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed } from 'ng2-mobx';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { deprecatedSelector } from '../deprecated-selector';
var TreeNodeCollectionComponent = (function () {
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
            reaction(function () {
                return _this.virtualScroll.getViewportNodes(_this.nodes).map(function (n) { return n.index; });
            }, function (nodeIndexes) {
                _this.viewportNodes = nodeIndexes.map(function (i) { return _this.nodes[i]; });
            }, { compareStructural: true, fireImmediately: true }),
            reaction(function () { return _this.nodes; }, function (nodes) {
                _this.viewportNodes = _this.virtualScroll.getViewportNodes(nodes);
            })
        ];
    };
    TreeNodeCollectionComponent.prototype.ngOnDestroy = function () {
        this._dispose.forEach(function (d) { return d(); });
    };
    return TreeNodeCollectionComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], TreeNodeCollectionComponent.prototype, "nodes", null);
__decorate([
    observable,
    __metadata("design:type", Object)
], TreeNodeCollectionComponent.prototype, "_nodes", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeNodeCollectionComponent.prototype, "templates", void 0);
__decorate([
    observable,
    __metadata("design:type", Array)
], TreeNodeCollectionComponent.prototype, "viewportNodes", void 0);
__decorate([
    computed,
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], TreeNodeCollectionComponent.prototype, "marginTop", null);
TreeNodeCollectionComponent = __decorate([
    Component({
        selector: 'tree-node-collection, TreeNodeCollection',
        encapsulation: ViewEncapsulation.None,
        template: "\n    <div *mobxAutorun>\n      <div\n        [style.margin-top]=\"marginTop\">\n        <tree-node\n          *ngFor=\"let node of viewportNodes; let i = index; trackBy: index\"\n          [node]=\"node\"\n          [index]=\"i\"\n          [templates]=\"templates\">\n        </tree-node>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [TreeVirtualScroll, ElementRef])
], TreeNodeCollectionComponent);
export { TreeNodeCollectionComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbGxlY3Rpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFxQixVQUFVLEVBQ25FLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQVcsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFFeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFxQjVELElBQWEsMkJBQTJCO0lBbUJ0QyxxQ0FBb0IsYUFBZ0MsRUFBVSxVQUFzQjtRQUFoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRnBGLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFHWixrQkFBa0IsQ0FBQyxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBbkJELHNCQUFJLDhDQUFLO2FBQVQsY0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbkMsVUFBVSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7T0FETjtJQVF6QixzQkFBSSxrREFBUzthQUFiO1lBQ1IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQU0sZ0JBQWdCLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFM0gsTUFBTSxDQUFJLGdCQUFnQixPQUFJLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFRRCw4Q0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsUUFBUSxHQUFHO1lBQ2Qsc0RBQXNEO1lBQ3RELFFBQVEsQ0FBQztnQkFDUCxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsQ0FBQztZQUMzRSxDQUFDLEVBQUUsVUFBQyxXQUFXO2dCQUNYLEtBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7WUFDN0QsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FDdEQ7WUFDRCxRQUFRLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxFQUFFLFVBQUMsS0FBSztnQkFDL0IsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQztTQUNILENBQUM7SUFDSixDQUFDO0lBRUQsaURBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxFQUFFLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNILGtDQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXZDQztJQURDLEtBQUssRUFBRTs7O3dEQUMyQjtBQUd2QjtJQUFYLFVBQVU7OzJEQUFRO0FBRVY7SUFBUixLQUFLLEVBQUU7OzhEQUFXO0FBRVA7SUFBWCxVQUFVOztrRUFBMkI7QUFDNUI7SUFBVCxRQUFROzs7NERBS1I7QUFmVSwyQkFBMkI7SUFqQnZDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQ0FBMEM7UUFDcEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsUUFBUSxFQUFFLGtVQVlUO0tBQ0YsQ0FBQztxQ0FvQm1DLGlCQUFpQixFQUFzQixVQUFVO0dBbkJ6RSwyQkFBMkIsQ0F5Q3ZDO1NBekNZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPbkluaXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHJlYWN0aW9uLCBhdXRvcnVuIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQgeyBvYnNlcnZhYmxlLCBjb21wdXRlZCB9IGZyb20gJ25nMi1tb2J4JztcbmltcG9ydCB7IFRyZWVWaXJ0dWFsU2Nyb2xsIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtdmlydHVhbC1zY3JvbGwubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU5vZGUgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1ub2RlLm1vZGVsJztcbmltcG9ydCB7IGRlcHJlY2F0ZWRTZWxlY3RvciB9IGZyb20gJy4uL2RlcHJlY2F0ZWQtc2VsZWN0b3InO1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RyZWUtbm9kZS1jb2xsZWN0aW9uLCBUcmVlTm9kZUNvbGxlY3Rpb24nLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm1vYnhBdXRvcnVuPlxuICAgICAgPGRpdlxuICAgICAgICBbc3R5bGUubWFyZ2luLXRvcF09XCJtYXJnaW5Ub3BcIj5cbiAgICAgICAgPHRyZWUtbm9kZVxuICAgICAgICAgICpuZ0Zvcj1cImxldCBub2RlIG9mIHZpZXdwb3J0Tm9kZXM7IGxldCBpID0gaW5kZXg7IHRyYWNrQnk6IGluZGV4XCJcbiAgICAgICAgICBbbm9kZV09XCJub2RlXCJcbiAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ0ZW1wbGF0ZXNcIj5cbiAgICAgICAgPC90cmVlLW5vZGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZUNvbGxlY3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGdldCBub2RlcygpIHsgcmV0dXJuIHRoaXMuX25vZGVzOyB9XG4gIHNldCBub2Rlcyhub2RlcykgeyB0aGlzLl9ub2RlcyA9IG5vZGVzOyB9XG5cbiAgQG9ic2VydmFibGUgX25vZGVzO1xuXG4gIEBJbnB1dCgpIHRlbXBsYXRlcztcblxuICBAb2JzZXJ2YWJsZSB2aWV3cG9ydE5vZGVzOiBUcmVlTm9kZVtdO1xuICBAY29tcHV0ZWQgZ2V0IG1hcmdpblRvcCgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGZpcnN0Tm9kZSA9IHRoaXMudmlld3BvcnROb2RlcyAmJiB0aGlzLnZpZXdwb3J0Tm9kZXNbMF07XG4gICAgY29uc3QgcmVsYXRpdmVQb3NpdGlvbiA9IGZpcnN0Tm9kZSA/IGZpcnN0Tm9kZS5wb3NpdGlvbiAtIGZpcnN0Tm9kZS5wYXJlbnQucG9zaXRpb24gLSBmaXJzdE5vZGUucGFyZW50LmdldFNlbGZIZWlnaHQoKSA6IDA7XG5cbiAgICByZXR1cm4gYCR7cmVsYXRpdmVQb3NpdGlvbn1weGA7XG4gIH1cblxuICBfZGlzcG9zZSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlydHVhbFNjcm9sbDogVHJlZVZpcnR1YWxTY3JvbGwsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIGRlcHJlY2F0ZWRTZWxlY3RvcignVHJlZU5vZGVDb2xsZWN0aW9uJywgJ3RyZWUtbm9kZS1jb2xsZWN0aW9uJywgZWxlbWVudFJlZik7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9kaXNwb3NlID0gW1xuICAgICAgLy8gcmV0dXJuIG5vZGUgaW5kZXhlcyBzbyB3ZSBjYW4gY29tcGFyZSBzdHJ1Y3R1cmFsbHksXG4gICAgICByZWFjdGlvbigoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpcnR1YWxTY3JvbGwuZ2V0Vmlld3BvcnROb2Rlcyh0aGlzLm5vZGVzKS5tYXAobiA9PiBuLmluZGV4KTtcbiAgICAgIH0sIChub2RlSW5kZXhlcykgPT4ge1xuICAgICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IG5vZGVJbmRleGVzLm1hcCgoaSkgPT4gdGhpcy5ub2Rlc1tpXSk7XG4gICAgICAgIH0sIHsgY29tcGFyZVN0cnVjdHVyYWw6IHRydWUsIGZpcmVJbW1lZGlhdGVseTogdHJ1ZSB9XG4gICAgICApLFxuICAgICAgcmVhY3Rpb24oKCkgPT4gdGhpcy5ub2RlcywgKG5vZGVzKSA9PiB7XG4gICAgICAgIHRoaXMudmlld3BvcnROb2RlcyA9IHRoaXMudmlydHVhbFNjcm9sbC5nZXRWaWV3cG9ydE5vZGVzKG5vZGVzKTtcbiAgICAgIH0pXG4gICAgXTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2Rpc3Bvc2UuZm9yRWFjaChkID0+IGQoKSk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19