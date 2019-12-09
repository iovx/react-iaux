import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import TabPanel, { TabPanelProps } from './TabPanel';
import { Omit } from '../_utils/type';

interface BaseProps {

}

export type TabProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?(key: string | null | number, index: number): void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  children: React.ReactElement<TabPanelProps> | React.ReactElement<TabPanelProps>[],
  tabCtrl?: boolean;
  bodyClassName?: string;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
} & BaseProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export interface TabState {
  activeKey: string;
  activeIndex: number;
}

class Tab extends React.Component<TabProps, TabState> {
  static propTypes = {
    activeKey: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onChange: PropTypes.func,
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
  };
  static defaultProps = {
    tabCtrl: true,
  };
  static Panel: typeof TabPanel;

  constructor(props: TabProps) {
    super(props);
    this.state = {
      activeKey: props.activeKey || props.defaultActiveKey || '0',
      activeIndex: props.activeIndex || props.defaultActiveIndex || 0,
    };
  }

  static getDerivedStateFromProps(props: TabProps) {
    if ('activeKey' in props) {
      return {
        activeKey: props.activeKey,
      };
    }
    if ('activeIndex' in props) {
      return {
        activeIndex: props.activeIndex,
      };
    }
    return null;
  }

  handleTabClick = (key: string | number | null, index: number, disabled: boolean) => {
    if (disabled) {
      return;
    }
    if ('activeKey' in this.props || 'activeIndex' in this.props) {
      this.triggerChange(key, index);
    } else {
      this.setState({ activeIndex: index, activeKey: `${key}` }, () => {
        this.triggerChange(this.state.activeKey, this.state.activeIndex);
      });
    }
  };

  triggerChange = (key: string | number | null, index: number) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(key, index);
    }
  };

  getExtraProps() {
    const {
      activeKey,
      defaultActiveKey,
      onChange,
      activeIndex,
      defaultActiveIndex,
      children,
      className,
      tabCtrl,
      headerStyle,
      headerClassName,
      bodyStyle,
      bodyClassName,
      ...extraProps
    } = this.props;
    return extraProps;
  }

  render() {
    const { children, tabCtrl, className, bodyClassName, headerClassName, bodyStyle, headerStyle } = this.props;
    const { activeIndex, activeKey } = this.state;
    const tabButtons: React.ReactElement[] = [];
    const tabPanels: React.ReactElement[] = [];
    const wrapperCls = cx('wx-v2-tab', className);
    const headerCls = cx('wx-v2-tab-header', headerClassName);
    const bodyCls = cx('wx-v2-tab-body', bodyClassName);
    React.Children.forEach<React.ReactElement<TabPanelProps>>(children, (child, index) => {
      if (child.type === TabPanel) {
        const { key } = child;
        let active = false;
        if ('activeKey' in this.props) {
          active = activeKey === key;
        } else if ('activeIndex' in this.props) {
          active = activeIndex === index;
        } else if ('defaultActiveKey' in this.props) {
          active = activeKey === key;
        } else if ('defaultActiveIndex' in this.props) {
          active = activeIndex === index;
        } else {
          active = activeIndex === index;
        }
        if (tabCtrl) {
          const tabCls = cx({
            'wx-v2-tab-title': true,
            'wx-v2-tab-active': active,
            'wx-v2-tab-disabled': child.props.disabled,
          });
          tabButtons.push(
            <div
              key={key || `${index}`}
              className={tabCls}
              onClick={() => this.handleTabClick(key, index, child.props.disabled || false)}
            >
              {child.props.title}
            </div>,
          );
        }
        tabPanels.push(React.cloneElement(child, {
          active,
        }));
      }
    });
    return (
      <div className={wrapperCls} {...this.getExtraProps()}>
        <div className={headerCls} style={headerStyle}>
          {tabButtons}
        </div>
        <div className={bodyCls} style={bodyStyle}>
          <div className="wx-v2-tab-content">
            {tabPanels}
          </div>
        </div>
      </div>
    );
  }
}

export default Tab;
