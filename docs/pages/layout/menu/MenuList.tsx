import * as React from 'react';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom';
import * as meta from '../../../docs/contents';
import {History} from 'history';

interface IContent {
  id: string;
  type: string;
  group: string;
  name: string;
  path: string;
  title: string;
  children: IContent[];
  open: boolean;
}

interface IMenuListState {
  contents: IContent[];
}

interface IHistory {
  prototype: History,
}

interface MenuListProps extends History {
  history?: IHistory;
  match?: {
    params: { name: string; }
  };
}

class MenuList extends React.Component<MenuListProps, IMenuListState> {
  static propTypes = {};

  constructor(props: any) {
    super(props);
    this.state = {
      contents: [],
    };
  }

  componentDidMount() {
    const contents = meta.default.contents as IContent[];
    const path = this.props.location.pathname;
    this.setState(() => {
      return {
        contents: contents.map(item => {
          const newItem: IContent = {...item} as IContent;
          newItem.open = newItem.children.some(subItem=>path.indexOf(`${subItem.path}${subItem.name}`) !== -1)
          return newItem;
        }),
      };
    });
  }

  handleGroupTitleClick(item, contents, idx) {
    return () => {
      const nextContents = [...contents];
      this.setState(() => {
        nextContents[idx].open = !nextContents[idx].open;
        return {
          contents: nextContents,
        };
      });
    };
  }

  renderContents() {
    const {contents} = this.state;
    return (
      <div>
        {contents.map((item, idx) => {
          const {title, name, open, id, children} = item;
          const bodyStyle: React.CSSProperties = {};
          if (!open) {
            bodyStyle.display = 'none';
          }
          const titleCls = `dc-intro-page-menu-group-title ${open ? 'dc-open' : ''}`;
          return (
            <div className="dc-intro-page-menu-group" key={id} title={title} data-name={name}>
              <div className={titleCls} onClick={this.handleGroupTitleClick(item, contents, idx)}>
                <i className="iconfont iconjinrujiantou"/>
                {item.title}
              </div>
              <div className="dc-intro-page-menu-group-body" style={bodyStyle}>
                {children.map(item => {
                  return (
                    <div key={item.id} className="dc-intro-page-menu-group-child-item-title">
                      <Link to={`${item.path}${item.name}`}>{item.title}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return <div>{this.renderContents()}</div>;
  }
}

export default withRouter(MenuList);
