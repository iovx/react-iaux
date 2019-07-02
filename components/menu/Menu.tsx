import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import cx from 'classnames';

type MenuItemType = {
  key: any;
  text?: React.ReactNode;
  url?: string;
  [index: string]: any;
}

interface BaseProps {
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  itemClassName?: string;
  data?: MenuItemType[];
  header?: React.ReactNode;
  onClick?: (menuItem: MenuItemType, menu: MenuItemType[]) => void;
}

export type MenuProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

class Menu extends React.Component<MenuProps, any> {
  static Item: typeof MenuItem;
  static propTypes = {
    header: PropTypes.node,
    data: PropTypes.array,
  }

  onClick = (menuItem: MenuItemType, menu: MenuItemType[]) => {
    const {onClick} = this.props;
    return () => {
      if (onClick) {
        onClick(menuItem, menu);
      }
    }
  };

  render() {
    const {className, headerClassName, headerStyle, bodyStyle, itemClassName, data = [], header, ...extraProps} = this.props;
    const cls = cx('wx-v2-menu', className);
    const headerCls = cx('wx-v2-menu-title', headerClassName);
    const bodyCls = cx('wx-v2-menu-body', headerClassName);
    return (
      <div className={cls} {...extraProps}>
        <div className={headerCls} style={headerStyle}>
          {header}
        </div>
        <div className={bodyCls} style={bodyStyle}>
          {
            data.map(item => {
              item.key = item.key || item.name;
              const {key, text, url} = item;
              return (
                <MenuItem className={itemClassName} key={key} text={text} url={url} onClick={this.onClick(item, data)}/>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Menu;
