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
var TreeNodeChildrenComponent = (function () {
    function TreeNodeChildrenComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeChildren', 'tree-node-children', elementRef);
    }
    return TreeNodeChildrenComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", TreeNode)
], TreeNodeChildrenComponent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], TreeNodeChildrenComponent.prototype, "templates", void 0);
TreeNodeChildrenComponent = __decorate([
    Component({
        selector: 'TreeNodeChildren, tree-node-children',
        encapsulation: ViewEncapsulation.None,
        styles: [
            '.tree-children.tree-children-no-padding { padding-left: 0 }',
            '.tree-children { padding-left: 20px }'
        ],
        template: "\n    <div *mobxAutorun>\n      <div [class.tree-children]=\"true\"\n          [class.tree-children-no-padding]=\"node.options.levelPadding\"\n          *ngIf=\"node.isExpanded\">\n        <div *ngIf=\"node.children\">\n          <tree-node-collection\n            [nodes]=\"node.children\"\n            [templates]=\"templates\">\n          </tree-node-collection>\n        </div>\n        <tree-loading-component\n          [style.padding-left]=\"node.getNodePadding()\"\n          class=\"tree-node-loading\"\n          *ngIf=\"!node.children\"\n          [template]=\"templates.loadingTemplate\"\n        ></tree-loading-component>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [ElementRef])
], TreeNodeChildrenComponent);
export { TreeNodeChildrenComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNoaWxkcmVuLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9jb21wb25lbnRzL3RyZWUtbm9kZS1jaGlsZHJlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQThCNUQsSUFBYSx5QkFBeUI7SUFJcEMsbUNBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDeEMsa0JBQWtCLENBQUMsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNILGdDQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFOVTtJQUFSLEtBQUssRUFBRTs4QkFBTyxRQUFRO3VEQUFDO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OzREQUFnQjtBQUZiLHlCQUF5QjtJQTVCckMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHNDQUFzQztRQUNoRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxNQUFNLEVBQUU7WUFDTiw2REFBNkQ7WUFDN0QsdUNBQXVDO1NBQ3hDO1FBQ0QsUUFBUSxFQUFFLDJwQkFtQlQ7S0FDRixDQUFDO3FDQUtnQyxVQUFVO0dBSi9CLHlCQUF5QixDQU9yQztTQVBZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZFNlbGVjdG9yIH0gZnJvbSAnLi4vZGVwcmVjYXRlZC1zZWxlY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlQ2hpbGRyZW4sIHRyZWUtbm9kZS1jaGlsZHJlbicsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHN0eWxlczogW1xuICAgICcudHJlZS1jaGlsZHJlbi50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmcgeyBwYWRkaW5nLWxlZnQ6IDAgfScsXG4gICAgJy50cmVlLWNoaWxkcmVuIHsgcGFkZGluZy1sZWZ0OiAyMHB4IH0nXG4gIF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbW9ieEF1dG9ydW4+XG4gICAgICA8ZGl2IFtjbGFzcy50cmVlLWNoaWxkcmVuXT1cInRydWVcIlxuICAgICAgICAgIFtjbGFzcy50cmVlLWNoaWxkcmVuLW5vLXBhZGRpbmddPVwibm9kZS5vcHRpb25zLmxldmVsUGFkZGluZ1wiXG4gICAgICAgICAgKm5nSWY9XCJub2RlLmlzRXhwYW5kZWRcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cIm5vZGUuY2hpbGRyZW5cIj5cbiAgICAgICAgICA8dHJlZS1ub2RlLWNvbGxlY3Rpb25cbiAgICAgICAgICAgIFtub2Rlc109XCJub2RlLmNoaWxkcmVuXCJcbiAgICAgICAgICAgIFt0ZW1wbGF0ZXNdPVwidGVtcGxhdGVzXCI+XG4gICAgICAgICAgPC90cmVlLW5vZGUtY29sbGVjdGlvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDx0cmVlLWxvYWRpbmctY29tcG9uZW50XG4gICAgICAgICAgW3N0eWxlLnBhZGRpbmctbGVmdF09XCJub2RlLmdldE5vZGVQYWRkaW5nKClcIlxuICAgICAgICAgIGNsYXNzPVwidHJlZS1ub2RlLWxvYWRpbmdcIlxuICAgICAgICAgICpuZ0lmPVwiIW5vZGUuY2hpbGRyZW5cIlxuICAgICAgICAgIFt0ZW1wbGF0ZV09XCJ0ZW1wbGF0ZXMubG9hZGluZ1RlbXBsYXRlXCJcbiAgICAgICAgPjwvdHJlZS1sb2FkaW5nLWNvbXBvbmVudD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ2hpbGRyZW5Db21wb25lbnQge1xuICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcbiAgQElucHV0KCkgdGVtcGxhdGVzOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgZGVwcmVjYXRlZFNlbGVjdG9yKCdUcmVlTm9kZUNoaWxkcmVuJywgJ3RyZWUtbm9kZS1jaGlsZHJlbicsIGVsZW1lbnRSZWYpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==