import * as React from 'react';
import * as PropTypes from 'prop-types';


export declare type FormItemProps = {
    required: boolean;
    colon: string;
    style: React.CSSProperties;
    className: string;
    label: React.ReactNode;
}
export declare type FormItemState = {
    required: boolean;
    label: React.ReactNode;
}

export default class FormItem extends React.Component<FormItemProps, FormItemState> {

    static defaultProps: {
        required: boolean;
        colon: React.ReactNode;
    }
    static propTypes: {
        label: PropTypes.Requireable<React.ReactNode>;
        required: PropTypes.Requireable<boolean>;
        colon: PropTypes.Requireable<string>;
    }

    componentWillMount(): void;

    componentWillReceiveProps(nextProps: FormItemProps): void;

    update(data: object): void;

    render(): JSX.Element;
}
