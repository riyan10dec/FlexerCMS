var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { autorun } from 'mobx';
import { ng2MobxDebug } from '../utils/ng2-mobx-debug';
var MobxAutorunDirective = (function () {
    function MobxAutorunDirective(templateRef, viewContainer, renderer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.renderer = renderer;
        this.templateBindings = {};
    }
    MobxAutorunDirective.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.templateRef);
        if (this.dispose)
            this.dispose();
        this.autoDetect(this.view);
        ng2MobxDebug(this.view, this.renderer, this.dispose);
    };
    MobxAutorunDirective.prototype.autoDetect = function (view) {
        this.dispose = autorun(function () {
            view['detectChanges']();
        });
    };
    MobxAutorunDirective.prototype.ngOnDestroy = function () {
        if (this.dispose)
            this.dispose();
    };
    return MobxAutorunDirective;
}());
MobxAutorunDirective = __decorate([
    Directive({ selector: '[mobxAutorun]' }),
    __metadata("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        Renderer])
], MobxAutorunDirective);
export { MobxAutorunDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ieC1hdXRvcnVuLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL21vYngtYXV0b3J1bi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQWdCLFFBQVEsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHdkQsSUFBYSxvQkFBb0I7SUFLL0IsOEJBQ1ksV0FBNkIsRUFDN0IsYUFBK0IsRUFDL0IsUUFBa0I7UUFGbEIsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBUHBCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztJQVE5QixDQUFDO0lBRUgsdUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFcEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQseUNBQVUsR0FBVixVQUFXLElBQUk7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLG9CQUFvQjtJQURoQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLENBQUM7cUNBT2QsV0FBVztRQUNULGdCQUFnQjtRQUNyQixRQUFRO0dBUm5CLG9CQUFvQixDQTZCaEM7U0E3Qlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBUZW1wbGF0ZVJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlciwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGF1dG9ydW4gfSBmcm9tICdtb2J4JztcbmltcG9ydCB7IG5nMk1vYnhEZWJ1ZyB9IGZyb20gJy4uL3V0aWxzL25nMi1tb2J4LWRlYnVnJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW21vYnhBdXRvcnVuXScgfSlcbmV4cG9ydCBjbGFzcyBNb2J4QXV0b3J1bkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHRlbXBsYXRlQmluZGluZ3MgPSB7fTtcbiAgcHJvdGVjdGVkIGRpc3Bvc2U6IGFueTtcbiAgcHJvdGVjdGVkIHZpZXc6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT4sXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcikge1xuICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZpZXcgPSB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGVSZWYpO1xuXG4gICAgaWYgKHRoaXMuZGlzcG9zZSkgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLmF1dG9EZXRlY3QodGhpcy52aWV3KTtcbiAgICBuZzJNb2J4RGVidWcodGhpcy52aWV3LCB0aGlzLnJlbmRlcmVyLCB0aGlzLmRpc3Bvc2UpO1xuICB9XG5cbiAgYXV0b0RldGVjdCh2aWV3KSB7XG4gICAgdGhpcy5kaXNwb3NlID0gYXV0b3J1bigoKSA9PiB7XG4gICAgICB2aWV3WydkZXRlY3RDaGFuZ2VzJ10oKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmRpc3Bvc2UpIHRoaXMuZGlzcG9zZSgpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==