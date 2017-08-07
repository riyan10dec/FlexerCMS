var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, Renderer, ElementRef, ViewEncapsulation, ContentChild, TemplateRef, HostListener } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import * as _ from 'lodash';
import { deprecatedSelector } from '../deprecated-selector';
var TreeComponent = (function () {
    function TreeComponent(treeModel, treeDraggedElement, renderer, elementRef) {
        var _this = this;
        this.treeModel = treeModel;
        this.treeDraggedElement = treeDraggedElement;
        this.renderer = renderer;
        this.elementRef = elementRef;
        deprecatedSelector('Tree', 'tree-root', elementRef);
        treeModel.eventNames.forEach(function (name) { return _this[name] = new EventEmitter(); });
    }
    Object.defineProperty(TreeComponent.prototype, "nodes", {
        // Will be handled in ngOnChanges
        set: function (nodes) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TreeComponent.prototype, "options", {
        set: function (options) { },
        enumerable: true,
        configurable: true
    });
    ;
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
__decorate([
    ContentChild('loadingTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "loadingTemplate", void 0);
__decorate([
    ContentChild('treeNodeTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "treeNodeTemplate", void 0);
__decorate([
    ContentChild('treeNodeFullTemplate'),
    __metadata("design:type", TemplateRef)
], TreeComponent.prototype, "treeNodeFullTemplate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], TreeComponent.prototype, "nodes", null);
__decorate([
    Input(),
    __metadata("design:type", TreeOptions),
    __metadata("design:paramtypes", [TreeOptions])
], TreeComponent.prototype, "options", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TreeComponent.prototype, "focused", null);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onToggleExpanded", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onActivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onDeactivate", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onFocus", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onBlur", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onUpdateData", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onInitialized", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onMoveNode", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onLoadChildren", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onChangeFilter", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], TreeComponent.prototype, "onEvent", void 0);
__decorate([
    HostListener('body: keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeComponent.prototype, "onKeydown", null);
__decorate([
    HostListener('body: mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeComponent.prototype, "onMousedown", null);
TreeComponent = __decorate([
    Component({
        selector: 'Tree, tree-root',
        encapsulation: ViewEncapsulation.None,
        providers: [TreeModel],
        styles: [
            '.tree-children { padding-left: 20px }',
            '.empty-tree-drop-slot .node-drop-slot { height: 20px; min-width: 100px }',
            ".tree {\n      width: 100%;\n      position:relative;\n      display: inline-block;\n      cursor: pointer;\n      -webkit-touch-callout: none; /* iOS Safari */\n      -webkit-user-select: none;   /* Chrome/Safari/Opera */\n      -khtml-user-select: none;    /* Konqueror */\n      -moz-user-select: none;      /* Firefox */\n      -ms-user-select: none;       /* IE/Edge */\n      user-select: none;           /* non-prefixed version, currently not supported by any browser */\n    }"
        ],
        template: "\n    <tree-viewport>\n      <div\n        class=\"tree\"\n        [class.node-dragging]=\"treeDraggedElement.isDragging()\">\n        <tree-node-collection\n          *ngIf=\"treeModel.roots\"\n          [nodes]=\"treeModel.roots\"\n          [templates]=\"{\n            loadingTemplate: loadingTemplate,\n            treeNodeTemplate: treeNodeTemplate,\n            treeNodeFullTemplate: treeNodeFullTemplate\n          }\">\n        </tree-node-collection>\n        <tree-node-drop-slot\n          class=\"empty-tree-drop-slot\"\n          *ngIf=\"treeModel.isEmptyTree()\"\n          [dropIndex]=\"0\"\n          [node]=\"treeModel.virtualRoot\">\n        </tree-node-drop-slot>\n      </div>\n    </tree-viewport>\n  "
    }),
    __metadata("design:paramtypes", [TreeModel,
        TreeDraggedElement,
        Renderer,
        ElementRef])
], TreeComponent);
export { TreeComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQ3ZFLGlCQUFpQixFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMzRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDMUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTNELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBOEM1RCxJQUFhLGFBQWE7SUE0QnhCLHVCQUNTLFNBQW9CLEVBQ3BCLGtCQUFzQyxFQUNyQyxRQUFrQixFQUNsQixVQUFzQjtRQUpoQyxpQkFRQztRQVBRLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFNUIsa0JBQWtCLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwRCxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksRUFBRSxFQUEvQixDQUErQixDQUFDLENBQUM7SUFDNUUsQ0FBQztJQTNCUSxzQkFBSSxnQ0FBSztRQURsQixpQ0FBaUM7YUFDeEIs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UUFBUSxDQUFDLENBQUM7Ozs7Z0RBTzNDO0FBeERVLGFBQWE7SUE1Q3pCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7UUFDckMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ3RCLE1BQU0sRUFBRTtZQUNOLHVDQUF1QztZQUN2QywwRUFBMEU7WUFDMUUsc2VBV0U7U0FDSDtRQUNELFFBQVEsRUFBRSxxdEJBc0JUO0tBQ0YsQ0FBQztxQ0E4Qm9CLFNBQVM7UUFDQSxrQkFBa0I7UUFDM0IsUUFBUTtRQUNOLFVBQVU7R0FoQ3JCLGFBQWEsQ0FpRXpCO1NBakVZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBSZW5kZXJlciwgRWxlbWVudFJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sIENvbnRlbnRDaGlsZCwgVGVtcGxhdGVSZWYsIEhvc3RMaXN0ZW5lclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVNb2RlbCB9IGZyb20gJy4uL21vZGVscy90cmVlLm1vZGVsJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAnLi4vbW9kZWxzL3RyZWUtbm9kZS5tb2RlbCc7XG5pbXBvcnQgeyBUcmVlRHJhZ2dlZEVsZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwnO1xuaW1wb3J0IHsgVHJlZU9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS1vcHRpb25zLm1vZGVsJztcblxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZGVwcmVjYXRlZFNlbGVjdG9yIH0gZnJvbSAnLi4vZGVwcmVjYXRlZC1zZWxlY3Rvcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1RyZWUsIHRyZWUtcm9vdCcsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHByb3ZpZGVyczogW1RyZWVNb2RlbF0sXG4gIHN0eWxlczogW1xuICAgICcudHJlZS1jaGlsZHJlbiB7IHBhZGRpbmctbGVmdDogMjBweCB9JyxcbiAgICAnLmVtcHR5LXRyZWUtZHJvcC1zbG90IC5ub2RlLWRyb3Atc2xvdCB7IGhlaWdodDogMjBweDsgbWluLXdpZHRoOiAxMDBweCB9JyxcbiAgICBgLnRyZWUge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBwb3NpdGlvbjpyZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTsgLyogaU9TIFNhZmFyaSAqL1xuICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsgICAvKiBDaHJvbWUvU2FmYXJpL09wZXJhICovXG4gICAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7ICAgIC8qIEtvbnF1ZXJvciAqL1xuICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgICAgICAvKiBGaXJlZm94ICovXG4gICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7ICAgICAgIC8qIElFL0VkZ2UgKi9cbiAgICAgIHVzZXItc2VsZWN0OiBub25lOyAgICAgICAgICAgLyogbm9uLXByZWZpeGVkIHZlcnNpb24sIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGJ5IGFueSBicm93c2VyICovXG4gICAgfWBcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dHJlZS12aWV3cG9ydD5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3M9XCJ0cmVlXCJcbiAgICAgICAgW2NsYXNzLm5vZGUtZHJhZ2dpbmddPVwidHJlZURyYWdnZWRFbGVtZW50LmlzRHJhZ2dpbmcoKVwiPlxuICAgICAgICA8dHJlZS1ub2RlLWNvbGxlY3Rpb25cbiAgICAgICAgICAqbmdJZj1cInRyZWVNb2RlbC5yb290c1wiXG4gICAgICAgICAgW25vZGVzXT1cInRyZWVNb2RlbC5yb290c1wiXG4gICAgICAgICAgW3RlbXBsYXRlc109XCJ7XG4gICAgICAgICAgICBsb2FkaW5nVGVtcGxhdGU6IGxvYWRpbmdUZW1wbGF0ZSxcbiAgICAgICAgICAgIHRyZWVOb2RlVGVtcGxhdGU6IHRyZWVOb2RlVGVtcGxhdGUsXG4gICAgICAgICAgICB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogdHJlZU5vZGVGdWxsVGVtcGxhdGVcbiAgICAgICAgICB9XCI+XG4gICAgICAgIDwvdHJlZS1ub2RlLWNvbGxlY3Rpb24+XG4gICAgICAgIDx0cmVlLW5vZGUtZHJvcC1zbG90XG4gICAgICAgICAgY2xhc3M9XCJlbXB0eS10cmVlLWRyb3Atc2xvdFwiXG4gICAgICAgICAgKm5nSWY9XCJ0cmVlTW9kZWwuaXNFbXB0eVRyZWUoKVwiXG4gICAgICAgICAgW2Ryb3BJbmRleF09XCIwXCJcbiAgICAgICAgICBbbm9kZV09XCJ0cmVlTW9kZWwudmlydHVhbFJvb3RcIj5cbiAgICAgICAgPC90cmVlLW5vZGUtZHJvcC1zbG90PlxuICAgICAgPC9kaXY+XG4gICAgPC90cmVlLXZpZXdwb3J0PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBfbm9kZXM6IGFueVtdO1xuICBfb3B0aW9uczogVHJlZU9wdGlvbnM7XG5cbiAgQENvbnRlbnRDaGlsZCgnbG9hZGluZ1RlbXBsYXRlJykgbG9hZGluZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICBAQ29udGVudENoaWxkKCd0cmVlTm9kZVRlbXBsYXRlJykgdHJlZU5vZGVUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQENvbnRlbnRDaGlsZCgndHJlZU5vZGVGdWxsVGVtcGxhdGUnKSB0cmVlTm9kZUZ1bGxUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAvLyBXaWxsIGJlIGhhbmRsZWQgaW4gbmdPbkNoYW5nZXNcbiAgQElucHV0KCkgc2V0IG5vZGVzKG5vZGVzOiBhbnlbXSkgeyB9O1xuICBASW5wdXQoKSBzZXQgb3B0aW9ucyhvcHRpb25zOiBUcmVlT3B0aW9ucykgeyB9O1xuXG4gIEBJbnB1dCgpIHNldCBmb2N1c2VkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0Rm9jdXModmFsdWUpO1xuICB9XG5cbiAgQE91dHB1dCgpIG9uVG9nZ2xlRXhwYW5kZWQ7XG4gIEBPdXRwdXQoKSBvbkFjdGl2YXRlO1xuICBAT3V0cHV0KCkgb25EZWFjdGl2YXRlO1xuICBAT3V0cHV0KCkgb25Gb2N1cztcbiAgQE91dHB1dCgpIG9uQmx1cjtcbiAgQE91dHB1dCgpIG9uVXBkYXRlRGF0YTtcbiAgQE91dHB1dCgpIG9uSW5pdGlhbGl6ZWQ7XG4gIEBPdXRwdXQoKSBvbk1vdmVOb2RlO1xuICBAT3V0cHV0KCkgb25Mb2FkQ2hpbGRyZW47XG4gIEBPdXRwdXQoKSBvbkNoYW5nZUZpbHRlcjtcbiAgQE91dHB1dCgpIG9uRXZlbnQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHRyZWVNb2RlbDogVHJlZU1vZGVsLFxuICAgIHB1YmxpYyB0cmVlRHJhZ2dlZEVsZW1lbnQ6IFRyZWVEcmFnZ2VkRWxlbWVudCxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcblxuICAgICAgZGVwcmVjYXRlZFNlbGVjdG9yKCdUcmVlJywgJ3RyZWUtcm9vdCcsIGVsZW1lbnRSZWYpO1xuICAgICAgdHJlZU1vZGVsLmV2ZW50TmFtZXMuZm9yRWFjaCgobmFtZSkgPT4gdGhpc1tuYW1lXSA9IG5ldyBFdmVudEVtaXR0ZXIoKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OiBrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlkb3duKCRldmVudCkge1xuICAgIGlmICghdGhpcy50cmVlTW9kZWwuaXNGb2N1c2VkKSByZXR1cm47XG4gICAgaWYgKF8uaW5jbHVkZXMoWydpbnB1dCcsICd0ZXh0YXJlYSddLFxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpIHJldHVybjtcblxuICAgIGNvbnN0IGZvY3VzZWROb2RlID0gdGhpcy50cmVlTW9kZWwuZ2V0Rm9jdXNlZE5vZGUoKTtcblxuICAgIHRoaXMudHJlZU1vZGVsLnBlcmZvcm1LZXlBY3Rpb24oZm9jdXNlZE5vZGUsICRldmVudCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdib2R5OiBtb3VzZWRvd24nLCBbJyRldmVudCddKVxuICBvbk1vdXNlZG93bigkZXZlbnQpIHtcbiAgICBjb25zdCBpbnNpZGVDbGljayA9IHRoaXMucmVuZGVyZXIuaW52b2tlRWxlbWVudE1ldGhvZCgkZXZlbnQudGFyZ2V0LCAnY2xvc2VzdCcsIFsnVHJlZSddKTtcblxuICAgIGlmICghaW5zaWRlQ2xpY2spIHtcbiAgICAgIHRoaXMudHJlZU1vZGVsLnNldEZvY3VzKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XG4gICAgdGhpcy50cmVlTW9kZWwuc2V0RGF0YSh7XG4gICAgICBvcHRpb25zOiBjaGFuZ2VzLm9wdGlvbnMgJiYgY2hhbmdlcy5vcHRpb25zLmN1cnJlbnRWYWx1ZSxcbiAgICAgIG5vZGVzOiBjaGFuZ2VzLm5vZGVzICYmIGNoYW5nZXMubm9kZXMuY3VycmVudFZhbHVlLFxuICAgICAgZXZlbnRzOiBfLnBpY2sodGhpcywgdGhpcy50cmVlTW9kZWwuZXZlbnROYW1lcylcbiAgICB9KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=