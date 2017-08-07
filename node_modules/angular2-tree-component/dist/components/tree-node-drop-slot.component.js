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
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';
var TreeNodeDropSlot = (function () {
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
__decorate([
    Input(),
    __metadata("design:type", TreeNode)
], TreeNodeDropSlot.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TreeNodeDropSlot.prototype, "dropIndex", void 0);
TreeNodeDropSlot = __decorate([
    Component({
        selector: 'TreeNodeDropSlot, tree-node-drop-slot',
        encapsulation: ViewEncapsulation.None,
        styles: [
            '.node-drop-slot { display: block; height: 2px; width: 100%}',
            '.node-drop-slot.is-dragging-over { background: #ddffee; height: 20px; border: 2px dotted #888; }'
        ],
        template: "\n    <div\n      class=\"node-drop-slot\"\n      (treeDrop)=\"onDrop($event)\"\n      [treeAllowDrop]=\"allowDrop.bind(this)\">\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [ElementRef])
], TreeNodeDropSlot);
export { TreeNodeDropSlot };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWRyb3Atc2xvdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLW5vZGUtZHJvcC1zbG90LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBaUI1RCxJQUFhLGdCQUFnQjtJQUkzQiwwQkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsaUNBQU0sR0FBTixVQUFPLE1BQU07UUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUMxQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7U0FDakQsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVSxPQUFPO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWpCVTtJQUFSLEtBQUssRUFBRTs4QkFBTyxRQUFROzhDQUFDO0FBQ2Y7SUFBUixLQUFLLEVBQUU7O21EQUFtQjtBQUZoQixnQkFBZ0I7SUFmNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHVDQUF1QztRQUNqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxNQUFNLEVBQUU7WUFDTiw2REFBNkQ7WUFDN0Qsa0dBQWtHO1NBQ25HO1FBQ0QsUUFBUSxFQUFFLGtKQU1UO0tBQ0YsQ0FBQztxQ0FLZ0MsVUFBVTtHQUovQixnQkFBZ0IsQ0FrQjVCO1NBbEJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZFNlbGVjdG9yIH0gZnJvbSAnLi4vZGVwcmVjYXRlZC1zZWxlY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlRHJvcFNsb3QsIHRyZWUtbm9kZS1kcm9wLXNsb3QnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzdHlsZXM6IFtcbiAgICAnLm5vZGUtZHJvcC1zbG90IHsgZGlzcGxheTogYmxvY2s7IGhlaWdodDogMnB4OyB3aWR0aDogMTAwJX0nLFxuICAgICcubm9kZS1kcm9wLXNsb3QuaXMtZHJhZ2dpbmctb3ZlciB7IGJhY2tncm91bmQ6ICNkZGZmZWU7IGhlaWdodDogMjBweDsgYm9yZGVyOiAycHggZG90dGVkICM4ODg7IH0nXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJub2RlLWRyb3Atc2xvdFwiXG4gICAgICAodHJlZURyb3ApPVwib25Ecm9wKCRldmVudClcIlxuICAgICAgW3RyZWVBbGxvd0Ryb3BdPVwiYWxsb3dEcm9wLmJpbmQodGhpcylcIj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlTm9kZURyb3BTbG90IHtcbiAgQElucHV0KCkgbm9kZTogVHJlZU5vZGU7XG4gIEBJbnB1dCgpIGRyb3BJbmRleDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIGRlcHJlY2F0ZWRTZWxlY3RvcignVHJlZU5vZGVEcm9wU2xvdCcsICd0cmVlLW5vZGUtZHJvcC1zbG90JywgZWxlbWVudFJlZik7XG4gIH1cblxuICBvbkRyb3AoJGV2ZW50KSB7XG4gICAgdGhpcy5ub2RlLm1vdXNlQWN0aW9uKCdkcm9wJywgJGV2ZW50LmV2ZW50LCB7XG4gICAgICBmcm9tOiAkZXZlbnQuZWxlbWVudCxcbiAgICAgIHRvOiB7IHBhcmVudDogdGhpcy5ub2RlLCBpbmRleDogdGhpcy5kcm9wSW5kZXggfVxuICAgIH0pO1xuICB9XG5cbiAgYWxsb3dEcm9wKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLm9wdGlvbnMuYWxsb3dEcm9wKGVsZW1lbnQsIHsgcGFyZW50OiB0aGlzLm5vZGUsIGluZGV4OiB0aGlzLmRyb3BJbmRleCB9KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=