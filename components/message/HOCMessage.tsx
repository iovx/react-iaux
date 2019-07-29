import * as React from 'react';
import cx from 'classnames';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import svg from './assets';

const {svgError, svgInfo, svgPrimary, svgSuccess, svgWarning} = svg;

const types = [
  {
    name: 'success',
    icon: svgSuccess,
  },
  {
    name: 'info',
    icon: svgInfo,
  },
  {
    name: 'warning',
    icon: svgWarning,
  },
  {
    name: 'primary',
    icon: svgPrimary,
  },
  {
    name: 'error',
    icon: svgError,
  },
];

const typeMap = {};
types.forEach(type => {
  typeMap[type.name] = type.icon;
});

export default (HOCWrapped, props: any = {}) => class Toast extends React.Component<any, any> {
  public transitionTime: number = 300;
  public duration: number = 2000;

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  addItem(dataItem) {
    dataItem.uniqueId = Date.now() + Math.floor(Math.random() * 9999 + 1000);
    dataItem.duration = dataItem.duration || this.duration;
    this.setState(prevState => ({data: prevState.data.concat([dataItem])}), () => {
      if (dataItem.duration > 0) {
        setTimeout(() => {
          this.removeItem(dataItem.uniqueId);
        }, dataItem.duration);
      }
    });
  }

  removeItem(uniqueId) {
    this.setState(prevState => ({
      data: prevState.data.filter(toast => {
        if (toast.uniqueId === uniqueId) {
          if (toast.onClose) {
            setTimeout(toast.onClose, this.transitionTime);
          }
          return false;
        }
        return true;
      })
    }));
  }

  render() {
    const {data} = this.state;
    const {className, ...restProps} = props;
    return (
      <TransitionGroup className={className}>
        {
          data.map(item => {
            const icon = typeMap[item.type];
            const cls = cx(`${className}-item`, `wx-v2-xs-${item.type}`);
            return (
              <CSSTransition
                key={item.uniqueId}
                classNames="wx-v2-toast"
                timeout={this.transitionTime}
              >
                <HOCWrapped {...restProps} className={cls} icon={icon} data={item}/>
              </CSSTransition>
            );
          })
        }
      </TransitionGroup>
    );
  }
}

