import { TreeModel } from './tree.model';
export declare class TreeVirtualScroll {
    private treeModel;
    private _dispose;
    yBlocks: number;
    x: number;
    viewportHeight: any;
    viewport: any;
    readonly y: number;
    readonly totalHeight: number;
    readonly viewportNodes: any[];
    readonly translateY: any;
    constructor(treeModel: TreeModel);
    init(): void;
    recalcPositions(): void;
    private _getPositionAfter(nodes, startPos);
    private _getPositionAfterNode(node, startPos);
    clear(): void;
    setNewScroll({viewport}: {
        viewport: any;
    }): void;
    scrollIntoView(node: any, force: any, scrollToMiddle?: boolean): void;
    getViewportNodes(nodes: any): any[];
    fixScroll(): void;
}
