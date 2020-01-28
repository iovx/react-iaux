import * as React from 'react';
import { History } from 'history';
import MarkDown from '../../shared/MarkDown';
import { getDocsList } from '../../docs/docs';

interface IHistory {
  prototype: History,
}

interface BaseProps extends History {
  history?: IHistory;
  match: {
    params: { name: string; }
  };
}

export type ComponentDocsProps = {} & BaseProps;

export interface ComponentDocsState {
  docList: string[];
}

class ComponentDocs extends React.Component<ComponentDocsProps, ComponentDocsState> {
  static propTypes = {};
  docs: any;

  constructor(props: any) {
    super(props);
    this.state = {
      docList: [],
    };
    this.docs = getDocsList();
    console.log(this.docs);
  }

  componentDidMount() {
    const { name } = this.props.match.params;
    const dataList: string[] = [];
    Object.keys(this.docs).forEach(item => {
      if (item.toLowerCase().indexOf(name.toLowerCase()) === 0) {
        dataList.push(item);
      }
    });
    this.setState(() => ({ docList: dataList }));
  }

  render() {
    const { name } = this.props.match.params;
    const { docList } = this.state;
    console.log(name, docList);
    return (
      <div>
        Hello Component#{name}
        {
          docList.map(item => {
            return <MarkDown content={this.docs[item]} />;
          })
        }

      </div>
    );
  }
}

export default ComponentDocs;
