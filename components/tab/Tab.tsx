import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import TabPanel, { TabPanelProps } from './TabPanel';

interface BaseProps {

}

export type TabProps = {
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?(key: string, index: number): void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  children: React.ReactElement<TabPanelProps>[],
} & BaseProps;

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
  static defaultProps = {};
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

  handleTabClick = (key: string | number | null, index: number) => {
    if ('activeKey' in this.props || 'activeIndex' in this.props) {
      this.triggerChange();
    } else {
      this.setState({ activeIndex: index, activeKey: `${key}` }, this.triggerChange);
    }
  };

  triggerChange = () => {
    const { onChange } = this.props;
    const { activeKey, activeIndex } = this.state;
    if (onChange) {
      onChange(activeKey, activeIndex);
    }
  };

  render() {
    const { children } = this.props;
    const { activeIndex, activeKey } = this.state;
    const tabButtons: React.ReactElement[] = [];
    const tabPanels: React.ReactElement[] = [];
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
        const tabCls = cx({
          'wx-v2-tab-title': true,
          'wx-v2-tab-active': active,
        });
        tabButtons.push(
          <div
            key={key || `${index}`}
            className={tabCls}
            onClick={() => this.handleTabClick(key, index)}
          >
            {child.props.title}
          </div>,
        );
        const tabPanelCls = cx({
          'wx-v2-tab-panel': true,
          'wx-v2-tab-active': active,
        });
        tabPanels.push(
          <div className={tabPanelCls} key={child.key || `${index}`}>
            {child}
          </div>,
        );
      }
    });
    return (
      <div className='wx-v2-tab'>
        <div className='wx-v2-tab-header'>
          {tabButtons}
        </div>
        <div className="wx-v2-tab-body">
          <div className="wx-v2-tab-content">
            {tabPanels}
          </div>
        </div>
      </div>
    );
  }
}

export default Tab;
