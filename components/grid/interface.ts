export interface IGridDataItem {
  [index: string]: any;
}

export interface IImageGridDataItem extends IGridDataItem {
  title?: string;
  url: string;
}
