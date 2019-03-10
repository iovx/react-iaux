import * as React from 'react';

export declare type FormWidgetProps = {
    className:string;
    style:React.CSSProperties;
}

export declare type FormWidgetState = any

export declare class FormWidget extends React.Component<FormWidgetProps, FormWidgetState> {
    componentWillMount():void;
    render(): JSX.Element;
}


export declare type FormProps = {
    className:string;
    style:React.CSSProperties;
}

export declare type FormState = any


export default class Form extends React.Component<FormProps, FormState> {

    static create(WrapperForm: Form): FormWidget;

    render(): JSX.Element;

}
