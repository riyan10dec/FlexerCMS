var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { MobxAutorunDirective } from './directives/mobx-autorun.directive';
import { MobxAutorunSyncDirective } from './directives/mobx-autorun-sync.directive';
import { MobxReactionDirective } from './directives/mobx-reaction.directive';
import { observable as mobxObservable } from 'mobx';
import { computed as mobxComputed } from 'mobx';
export { MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective };
var DIRECTIVES = [MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective];
var Ng2MobxModule = (function () {
    function Ng2MobxModule() {
    }
    return Ng2MobxModule;
}());
Ng2MobxModule = __decorate([
    NgModule({
        declarations: DIRECTIVES.slice(),
        exports: DIRECTIVES.slice(),
        imports: [],
        providers: []
    })
], Ng2MobxModule);
export { Ng2MobxModule };
export function observable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mobxObservable.apply(void 0, args);
}
export function computed() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mobxComputed.apply(void 0, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLW1vYnguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvbmcyLW1vYngudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN6RSxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNsRixPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsVUFBVSxJQUFJLGNBQWMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUMsUUFBUSxJQUFJLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QyxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDdEIsQ0FBQTtBQUVELElBQU0sVUFBVSxHQUFHLENBQUMsb0JBQW9CLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLENBQUMsQ0FBQztBQVczRixJQUFhLGFBQWE7SUFBMUI7SUFDQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBREQsSUFDQztBQURZLGFBQWE7SUFWekIsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUNQLFVBQVUsUUFDZDtRQUNELE9BQU8sRUFDRixVQUFVLFFBQ2Q7UUFDRCxPQUFPLEVBQUUsRUFBRTtRQUNYLFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztHQUNXLGFBQWEsQ0FDekI7U0FEWSxhQUFhO0FBRzFCLE1BQU07SUFBcUIsY0FBTztTQUFQLFVBQU8sRUFBUCxxQkFBTyxFQUFQLElBQU87UUFBUCx5QkFBTzs7SUFDaEMsTUFBTSxDQUFFLGNBQXNCLGVBQUksSUFBSSxFQUFFO0FBQzFDLENBQUM7QUFFRCxNQUFNO0lBQW1CLGNBQU87U0FBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQVAseUJBQU87O0lBQzlCLE1BQU0sQ0FBRSxZQUFvQixlQUFJLElBQUksRUFBRTtBQUN4QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9ieEF1dG9ydW5EaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2J4LWF1dG9ydW4uZGlyZWN0aXZlJztcbmltcG9ydCB7TW9ieEF1dG9ydW5TeW5jRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9ieC1hdXRvcnVuLXN5bmMuZGlyZWN0aXZlJztcbmltcG9ydCB7TW9ieFJlYWN0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9ieC1yZWFjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHtvYnNlcnZhYmxlIGFzIG1vYnhPYnNlcnZhYmxlfSBmcm9tICdtb2J4JztcbmltcG9ydCB7Y29tcHV0ZWQgYXMgbW9ieENvbXB1dGVkfSBmcm9tICdtb2J4JztcblxuZXhwb3J0IHtcbiAgTW9ieEF1dG9ydW5EaXJlY3RpdmUsXG4gIE1vYnhBdXRvcnVuU3luY0RpcmVjdGl2ZSxcbiAgTW9ieFJlYWN0aW9uRGlyZWN0aXZlXG59XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbTW9ieEF1dG9ydW5EaXJlY3RpdmUsIE1vYnhBdXRvcnVuU3luY0RpcmVjdGl2ZSwgTW9ieFJlYWN0aW9uRGlyZWN0aXZlXTtcbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmcyTW9ieE1vZHVsZSB7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIChtb2J4T2JzZXJ2YWJsZSBhcyBhbnkpKC4uLmFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZWQoLi4uYXJncykge1xuICByZXR1cm4gKG1vYnhDb21wdXRlZCBhcyBhbnkpKC4uLmFyZ3MpO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=