import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { tuple } from '../_utils/type';

const TipType = tuple('none', 'default', 'left', 'right', 'center');

interface BaseProps {
  className?: string;
  barClassName?: string;
  total: number;
  tip?: typeof TipType[number];
  progress?: number;
  bgBarStyle?: React.CSSProperties;
  progressStyle?: React.CSSProperties;
}

export type ProgressBarProps = {} & BaseProps & React.HTMLAttributes<HTMLDivElement>;

export interface ProgressBarState {
  progress: number;
}

class ProgressBar extends React.PureComponent<ProgressBarProps, ProgressBarState> {
  static propTypes = {
    total: PropTypes.number,
    progress: PropTypes.number,
    tip: PropTypes.oneOf(TipType),
  };
  static defaultProps = {
    progress: 0,
    total: 100,
    type: 'default',
    tip: 'none',
  };

  constructor(props: ProgressBarProps) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentWillMount() {
    const { progress } = this.props;
    if (progress) {
      this.setState({ progress });
    }
  }

  componentWillReceiveProps(nextProps: ProgressBarProps) {
    const { progress } = nextProps;
    if (this.props.progress !== progress && typeof progress === 'number') {
      this.setState({ progress });
    }
  }

  render() {
    const { className, barClassName, total, tip, progress: pg, bgBarStyle, progressStyle, ...props } = this.props;
    const { progress } = this.state;
    const percent = (progress / (total || 1) * 100);
    const tipText = `${percent >= 100 ? percent.toFixed(0) : percent.toFixed(2)}%`;
    const width = `${percent}%`;
    const innerStyle = {
      ...progressStyle,
      width,
    };
    const tipTextStyle: React.CSSProperties = {};
    const tipWidth = 40;
    const renderTip = tip === 'none';
    if (renderTip) {

    } else {
      switch (tip) {
        case 'default': {
          tipTextStyle.left = percent > 50 ? `calc(${width} - ${tipWidth}px)` : width;
          break;
        }
        case 'left':
          tipTextStyle.left = 0;
          break;
        case 'center':
          tipTextStyle.left = `calc(50% - ${tipWidth / 2}px)`;
          break;
        case 'right':
          tipTextStyle.right = 0;
          break;
      }
    }
    return (
      <div className={cx('wx-v2-progressBar-container', className)} {...props}>
        <div className={cx('wx-v2-progressBar', barClassName)}>
          <div className='wx-v2-progressBar-background' style={bgBarStyle} />
          <div className='wx-v2-progressBar-progress' style={innerStyle} />
        </div>
        {
          !renderTip && (
            <div className='wx-v2-progressBar-tip'>
              <div className='wx-v2-progressBar-tip-text' style={tipTextStyle}>{tipText}</div>
            </div>
          )
        }
      </div>
    );
  }
}

export default ProgressBar;
