import * as React from 'react';

export declare type FieldDecoratorItemProps = {}

export declare type FieldDecoratorItemState = {}

export declare type ValidateResult = {
    error: boolean;
    message: React.ReactNode;
    type: string;
}

export declare class FieldDecoratorItem extends React.Component<FieldDecoratorItemProps, any> {
    static defaultProps: {
        required: boolean,
        status: string,
        validating: string,
    }
    onFocus: React.MouseEventHandler<HTMLInputElement>;
    onBlur: React.MouseEventHandler<HTMLInputElement>;

    setValue(value: string | object): void;

    updateStatus(nextState: FieldDecoratorItemState, callback: () => void): void;

    validate(value: any, rules: any[]): ValidateResult;

    triggerValidate(paramScales: string[], callback: () => void): Promise<object>;

    render(): JSX.Element;
}

export declare class FieldDcorator {
    data: object;
    errors: object;
    validateStopWhenError: boolean;
    refFields: object;

    onRefField(name: string, ref: object): void;

    decorate(name: string, options: object): () => FieldDecoratorItem;

    getFieldsValue(): object;

    validateFields(callback: (error: object, values: object) => void): void;

    setValue(name: string, value: any): FieldDcorator;

    setFieldValue(name: string, value: any): FieldDcorator;
}
