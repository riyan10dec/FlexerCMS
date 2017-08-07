var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, TemplateRef, ElementRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { deprecatedSelector } from '../deprecated-selector';
var TreeNodeContent = (function () {
    function TreeNodeContent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('TreeNodeContent', 'tree-node-content', elementRef);
    }
    return TreeNodeContent;
}());
__decorate([
    Input(),
    __metadata("design:type", TreeNode)
], TreeNodeContent.prototype, "node", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], TreeNodeContent.prototype, "index", void 0);
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], TreeNodeContent.prototype, "template", void 0);
TreeNodeContent = __decorate([
    Component({
        selector: 'TreeNodeContent, tree-node-content',
        encapsulation: ViewEncapsulation.None,
        template: "<span *ngIf=\"!template\">{{ node.displayField }}</span>\n  <template\n    [ngTemplateOutlet]=\"template\"\n    [ngOutletContext]=\"{ $implicit: node, node: node, index: index }\">\n  </template>",
    }),
    __metadata("design:paramtypes", [ElementRef])
], TreeNodeContent);
export { TreeNodeContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2NvbXBvbmVudHMvdHJlZS1ub2RlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBVzVELElBQWEsZUFBZTtJQUsxQix5QkFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN4QyxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQVBVO0lBQVIsS0FBSyxFQUFFOzhCQUFPLFFBQVE7NkNBQUM7QUFDZjtJQUFSLEtBQUssRUFBRTs7OENBQWU7QUFDZDtJQUFSLEtBQUssRUFBRTs4QkFBVyxXQUFXO2lEQUFNO0FBSHpCLGVBQWU7SUFUM0IsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9DQUFvQztRQUM5QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtRQUNyQyxRQUFRLEVBQUUscU1BSUU7S0FDYixDQUFDO3FDQU1nQyxVQUFVO0dBTC9CLGVBQWUsQ0FRM0I7U0FSWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIFRlbXBsYXRlUmVmLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJy4uL21vZGVscy90cmVlLW5vZGUubW9kZWwnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZFNlbGVjdG9yIH0gZnJvbSAnLi4vZGVwcmVjYXRlZC1zZWxlY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWVOb2RlQ29udGVudCwgdHJlZS1ub2RlLWNvbnRlbnQnLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICB0ZW1wbGF0ZTogYDxzcGFuICpuZ0lmPVwiIXRlbXBsYXRlXCI+e3sgbm9kZS5kaXNwbGF5RmllbGQgfX08L3NwYW4+XG4gIDx0ZW1wbGF0ZVxuICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlXCJcbiAgICBbbmdPdXRsZXRDb250ZXh0XT1cInsgJGltcGxpY2l0OiBub2RlLCBub2RlOiBub2RlLCBpbmRleDogaW5kZXggfVwiPlxuICA8L3RlbXBsYXRlPmAsXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVOb2RlQ29udGVudCB7XG4gIEBJbnB1dCgpIG5vZGU6IFRyZWVOb2RlO1xuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBkZXByZWNhdGVkU2VsZWN0b3IoJ1RyZWVOb2RlQ29udGVudCcsICd0cmVlLW5vZGUtY29udGVudCcsIGVsZW1lbnRSZWYpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==