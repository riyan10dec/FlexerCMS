var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, HostListener, Renderer, ElementRef } from '@angular/core';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
var DRAG_OVER_CLASS = 'is-dragging-over';
var TreeDragDirective = (function () {
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
__decorate([
    Input('treeDrag'),
    __metadata("design:type", Object)
], TreeDragDirective.prototype, "draggedElement", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeDragDirective.prototype, "treeDragEnabled", void 0);
__decorate([
    HostListener('dragstart', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeDragDirective.prototype, "onDragStart", null);
__decorate([
    HostListener('dragend'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeDragDirective.prototype, "onDragEnd", null);
TreeDragDirective = __decorate([
    Directive({
        selector: '[treeDrag]'
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer, TreeDraggedElement])
], TreeDragDirective);
export { TreeDragDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL3RyZWUtZHJhZy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFMUUsSUFBTSxlQUFlLEdBQUcsa0JBQWtCLENBQUM7QUFLM0MsSUFBYSxpQkFBaUI7SUFJNUIsMkJBQW9CLEVBQWMsRUFBVSxRQUFrQixFQUFVLGtCQUFzQztRQUExRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFDOUcsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQztJQUNqSCxDQUFDO0lBRXNDLHVDQUFXLEdBQVgsVUFBWSxFQUFFO1FBQXJELGlCQUlDO1FBSEMsMENBQTBDO1FBQzFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLEVBQWhELENBQWdELEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUV3QixxQ0FBUyxHQUFUO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQW5Cb0I7SUFBbEIsS0FBSyxDQUFDLFVBQVUsQ0FBQzs7eURBQWdCO0FBQ3pCO0lBQVIsS0FBSyxFQUFFOzswREFBaUI7QUFTYztJQUF0QyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7b0RBSXJDO0FBRXdCO0lBQXhCLFlBQVksQ0FBQyxTQUFTLENBQUM7Ozs7a0RBRXZCO0FBbkJVLGlCQUFpQjtJQUg3QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtLQUN2QixDQUFDO3FDQUt3QixVQUFVLEVBQW9CLFFBQVEsRUFBOEIsa0JBQWtCO0dBSm5HLGlCQUFpQixDQW9CN0I7U0FwQlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyLCBSZW5kZXJlciwgRWxlbWVudFJlZiwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZURyYWdnZWRFbGVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsJztcblxuY29uc3QgRFJBR19PVkVSX0NMQVNTID0gJ2lzLWRyYWdnaW5nLW92ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdHJlZURyYWddJ1xufSlcbmV4cG9ydCBjbGFzcyBUcmVlRHJhZ0RpcmVjdGl2ZSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICBASW5wdXQoJ3RyZWVEcmFnJykgZHJhZ2dlZEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHRyZWVEcmFnRW5hYmxlZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciwgcHJpdmF0ZSB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCkge1xuICB9XG5cbiAgbmdEb0NoZWNrKCkge1xuICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnZ2FibGUnLCB0aGlzLnRyZWVEcmFnRW5hYmxlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSkgb25EcmFnU3RhcnQoZXYpIHtcbiAgICAvLyBzZXR0aW5nIHRoZSBkYXRhIGlzIHJlcXVpcmVkIGJ5IGZpcmVmb3hcbiAgICBldi5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dC9wbGFpbicsIGV2LnRhcmdldC5pZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyZWVEcmFnZ2VkRWxlbWVudC5zZXQodGhpcy5kcmFnZ2VkRWxlbWVudCksIDMwKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnKSBvbkRyYWdFbmQoKSB7XG4gICAgdGhpcy50cmVlRHJhZ2dlZEVsZW1lbnQuc2V0KG51bGwpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==