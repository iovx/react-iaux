import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

interface BaseProps extends React.HTMLAttributes<HTMLDivElement> {

}

export type TabPanelProps = {
  key?: string;
  title?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
} & BaseProps;


class TabPanel extends React.Component<TabPanelProps, any> {
  static propTypes = {
    key: PropTypes.string,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { children, active, className, ...extraProps } = this.props;
    const tabPanelCls = cx({
      'wx-v2-tab-panel': true,
      'wx-v2-tab-active': active,
    }, className);
    return (
      <div className={tabPanelCls} {...extraProps}>
        {children}
      </div>
    );
  }
}

export default TabPanel;
