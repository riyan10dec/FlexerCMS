var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, TemplateRef, ElementRef } from '@angular/core';
import { deprecatedSelector } from '../deprecated-selector';
var LoadingComponent = (function () {
    function LoadingComponent(elementRef) {
        this.elementRef = elementRef;
        deprecatedSelector('LoadingComponent', 'tree-loading-component', elementRef);
    }
    return LoadingComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", TemplateRef)
], LoadingComponent.prototype, "template", void 0);
LoadingComponent = __decorate([
    Component({
        selector: 'LoadingComponent, tree-loading-component',
        template: "<span *ngIf=\"!template\">loading...</span>\n  <template [ngTemplateOutlet]=\"template\"></template>",
    }),
    __metadata("design:paramtypes", [ElementRef])
], LoadingComponent);
export { LoadingComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy9sb2FkaW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBTzVELElBQWEsZ0JBQWdCO0lBRzNCLDBCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3hDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTFU7SUFBUixLQUFLLEVBQUU7OEJBQVcsV0FBVztrREFBTTtBQUR6QixnQkFBZ0I7SUFMNUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBDQUEwQztRQUNwRCxRQUFRLEVBQUUsc0dBQzBDO0tBQ3JELENBQUM7cUNBSWdDLFVBQVU7R0FIL0IsZ0JBQWdCLENBTTVCO1NBTlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVGVtcGxhdGVSZWYsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlcHJlY2F0ZWRTZWxlY3RvciB9IGZyb20gJy4uL2RlcHJlY2F0ZWQtc2VsZWN0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdMb2FkaW5nQ29tcG9uZW50LCB0cmVlLWxvYWRpbmctY29tcG9uZW50JyxcbiAgdGVtcGxhdGU6IGA8c3BhbiAqbmdJZj1cIiF0ZW1wbGF0ZVwiPmxvYWRpbmcuLi48L3NwYW4+XG4gIDx0ZW1wbGF0ZSBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZVwiPjwvdGVtcGxhdGU+YCxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIGRlcHJlY2F0ZWRTZWxlY3RvcignTG9hZGluZ0NvbXBvbmVudCcsICd0cmVlLWxvYWRpbmctY29tcG9uZW50JywgZWxlbWVudFJlZik7XG4gIH1cbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19