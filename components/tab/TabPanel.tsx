import * as React from 'react';
import * as PropTypes from 'prop-types';

interface BaseProps {

}

export type TabPanelProps = {
  key?: string;
  title: string;
} & BaseProps;


class TabPanel extends React.Component<TabPanelProps, any> {
  static propTypes = {
    key: PropTypes.string,
    title: PropTypes.string.isRequired,
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

export default TabPanel;
