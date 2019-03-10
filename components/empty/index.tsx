import * as React from 'react';
import classNames from 'classnames';
import {ConfigConsumer, ConfigConsumerProps} from '../config-provider';
import emptyImg from './empty.svg';

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

const Empty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({getPrefixCls}: ConfigConsumerProps) => {
      const {
        className,
        prefixCls: customizePrefixCls,
        children,
        ...restProps
      } = props;
      const prefixCls = getPrefixCls('empty', customizePrefixCls);

      return (
        <div className={classNames(prefixCls, className)} {...restProps}>
          <div className={`${prefixCls}-image`}>{<img alt='empty' src={emptyImg}/>}</div>
          {children && <div className={`${prefixCls}-footer`}>{children}</div>}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Empty;
