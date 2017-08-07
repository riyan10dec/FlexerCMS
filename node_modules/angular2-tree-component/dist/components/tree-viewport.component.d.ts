import { ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
export declare class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
    private elementRef;
    virtualScroll: TreeVirtualScroll;
    _debounceOnVirtualScroll: () => void;
    constructor(elementRef: ElementRef, virtualScroll: TreeVirtualScroll);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onScroll(e: any): void;
    _onWheel(e: any): void;
    _onVirtualScroll(): void;
}
