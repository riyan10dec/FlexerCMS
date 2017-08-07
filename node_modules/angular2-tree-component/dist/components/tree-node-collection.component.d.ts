import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
export declare class TreeNodeCollectionComponent implements OnInit, OnDestroy {
    private virtualScroll;
    private elementRef;
    nodes: any;
    _nodes: any;
    templates: any;
    viewportNodes: TreeNode[];
    readonly marginTop: string;
    _dispose: any[];
    constructor(virtualScroll: TreeVirtualScroll, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
