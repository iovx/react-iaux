import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import cx from 'classnames';


interface BaseProps {
  format: string;
}

export type CurrentTimeProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>

export interface CurrentTimeState {
  now: number;
}

class CurrentTime extends React.PureComponent<CurrentTimeProps, CurrentTimeState> {
  static propTypes = {
    format: PropTypes.string,
  };
  static defaultProps = {
    format: 'YYYY-MM-DD HH:mm:ss',
  };
  timer: number = 0;
  state = {
    now: Date.now(),
  };

  componentDidMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.timer = window.setTimeout(() => {
      this.setState({ now: Date.now() }, () => {
        this.tick();
      });
    }, 1000);
  }

  render() {
    const { now } = this.state;
    const { format, className, ...extraProps } = this.props;
    const wrapperCls = cx('wx-v2-current-time', className);
    return (
      <div className={wrapperCls} {...extraProps}>{moment(now).format(format)}</div>
    );
  }
}

export default CurrentTime;
