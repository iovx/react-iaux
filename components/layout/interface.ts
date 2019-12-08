export interface IField {
  id: string | number;
  fieldName?: string;
  label: string;
  value: string | number;

  [index: string]: any;
}

export interface IBaseLayoutWidget {
  type: string;
}

export interface IFieldItem extends IBaseLayoutWidget {
  width?: number;
  fieldId: string | number;
}

export interface ICol extends IBaseLayoutWidget {
  span?: number;
  offset?: number;
  children: IFieldItem[];
}

export interface IRow extends IBaseLayoutWidget {
  children: ICol[];
}

export interface ILayoutItem extends IRow {

}

export type ILayout = ILayoutItem[];
