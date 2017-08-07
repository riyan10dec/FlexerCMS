var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, HostListener } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { deprecatedSelector } from '../deprecated-selector';
import { throttle } from 'lodash';
var SCROLL_REFRESH_INTERVAL = 17;
var isFirefox = navigator && navigator.userAgent && navigator.userAgent.indexOf('Firefox') > -1;
var TreeViewportComponent = (function () {
    function TreeViewportComponent(elementRef, virtualScroll) {
        this.elementRef = elementRef;
        this.virtualScroll = virtualScroll;
        deprecatedSelector('TreeNode', 'tree-node', elementRef);
        this._debounceOnVirtualScroll = throttle(this._onVirtualScroll.bind(this), SCROLL_REFRESH_INTERVAL);
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
__decorate([
    HostListener('scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TreeViewportComponent.prototype, "onScroll", null);
TreeViewportComponent = __decorate([
    Component({
        selector: 'TreeViewport, tree-viewport',
        styles: [
            ":host {\n      height: 100%;\n      overflow: auto;\n      display: block;\n    }"
        ],
        providers: [TreeVirtualScroll],
        template: "\n    <div *mobxAutorun>\n      <div [style.height]=\"virtualScroll.totalHeight + 'px'\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  "
    }),
    __metadata("design:paramtypes", [ElementRef,
        TreeVirtualScroll])
], TreeViewportComponent);
export { TreeViewportComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS12aWV3cG9ydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvY29tcG9uZW50cy90cmVlLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFBcUIsWUFBWSxFQUN2RCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRWxDLElBQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO0FBRW5DLElBQU0sU0FBUyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBb0JsRyxJQUFhLHFCQUFxQjtJQUdoQywrQkFDVSxVQUFzQixFQUN2QixhQUFnQztRQUQvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFtQjtRQUV2QyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3RHLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsK0NBQWUsR0FBZjtRQUFBLGlCQUVDO1FBREMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBR0Qsd0NBQVEsR0FBUixVQUFTLENBQUM7UUFDUixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx3Q0FBUSxHQUFSLFVBQVMsQ0FBQztRQUNSLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxnREFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQVhDO0lBREMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7O3FEQUdsQztBQTFCVSxxQkFBcUI7SUFsQmpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsTUFBTSxFQUFFO1lBQ04sbUZBSUU7U0FDSDtRQUNELFNBQVMsRUFBRSxDQUFDLGlCQUFpQixDQUFDO1FBQzlCLFFBQVEsRUFBRSw0SkFNVDtLQUNGLENBQUM7cUNBS3NCLFVBQVU7UUFDUixpQkFBaUI7R0FMOUIscUJBQXFCLENBbUNqQztTQW5DWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBIb3N0TGlzdGVuZXIsIEFmdGVyVmlld0luaXQsIE9uSW5pdCwgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZVZpcnR1YWxTY3JvbGwgfSBmcm9tICcuLi9tb2RlbHMvdHJlZS12aXJ0dWFsLXNjcm9sbC5tb2RlbCc7XG5pbXBvcnQgeyBkZXByZWNhdGVkU2VsZWN0b3IgfSBmcm9tICcuLi9kZXByZWNhdGVkLXNlbGVjdG9yJztcblxuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBTQ1JPTExfUkVGUkVTSF9JTlRFUlZBTCA9IDE3O1xuXG5jb25zdCBpc0ZpcmVmb3ggPSBuYXZpZ2F0b3IgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdUcmVlVmlld3BvcnQsIHRyZWUtdmlld3BvcnQnLFxuICBzdHlsZXM6IFtcbiAgICBgOmhvc3Qge1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9YFxuICBdLFxuICBwcm92aWRlcnM6IFtUcmVlVmlydHVhbFNjcm9sbF0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbW9ieEF1dG9ydW4+XG4gICAgICA8ZGl2IFtzdHlsZS5oZWlnaHRdPVwidmlydHVhbFNjcm9sbC50b3RhbEhlaWdodCArICdweCdcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZVZpZXdwb3J0Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBfZGVib3VuY2VPblZpcnR1YWxTY3JvbGw6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyB2aXJ0dWFsU2Nyb2xsOiBUcmVlVmlydHVhbFNjcm9sbCkge1xuXG4gICAgZGVwcmVjYXRlZFNlbGVjdG9yKCdUcmVlTm9kZScsICd0cmVlLW5vZGUnLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLl9kZWJvdW5jZU9uVmlydHVhbFNjcm9sbCA9IHRocm90dGxlKHRoaXMuX29uVmlydHVhbFNjcm9sbC5iaW5kKHRoaXMpLCBTQ1JPTExfUkVGUkVTSF9JTlRFUlZBTCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZpcnR1YWxTY3JvbGwuaW5pdCgpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5fb25WaXJ0dWFsU2Nyb2xsKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLmNsZWFyKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdzY3JvbGwnLCBbJyRldmVudCddKVxuICBvblNjcm9sbChlKSB7XG4gICAgdGhpcy5fb25XaGVlbChlKTtcbiAgfVxuXG4gIF9vbldoZWVsKGUpIHtcbiAgICB0aGlzLl9vblZpcnR1YWxTY3JvbGwoKTtcbiAgfVxuXG4gIF9vblZpcnR1YWxTY3JvbGwoKSB7XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsLnNldE5ld1Njcm9sbCh7IHZpZXdwb3J0OiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCB9KTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=