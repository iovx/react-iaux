import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import {noop} from "../_utils/function";

export interface PageObject {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
}

interface BaseProps {
  page?: number;
  pageSize?: number;
  total: number;
  hideOnSinglePage?: true;
  onPageChange?: (pageObject: PageObject) => void;
}

export type PaginationProps = {} & BaseProps & React.HTMLAttributes<HTMLUListElement>;

interface PaginationState {
  page: number;
  pages: number[];
}

class Pagination extends React.PureComponent<PaginationProps, PaginationState> {
  static propTypes = {
    page: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    hideOnSinglePage: PropTypes.bool,
    onPageChange: PropTypes.func,
  };
  static defaultProps = {
    page: 1,
    pageSize: 15,
    total: 0,
    hideOnSinglePage: true,
    onPageChange: noop,
  }
  private firstIndex = 1;
  private pageCount: number = 0;

  constructor(props) {
    super(props);
    this.state = {
      page: props.page || 1,
      pages: [],
    }
    this.previous = this.previous.bind(this);
    this.go = this.go.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.build();
  }

  componentWillReceiveProps(nextProps) {
    const {page} = nextProps;
    if (page !== this.props.page) {
      this.setState({page}, () => {
        this.build();
      });
    }
  }

  private build() {
    const pages: number[] = [];
    const {pageSize = 15} = this.props;
    this.pageCount = Math.ceil(this.props.total / pageSize);
    if (this.pageCount <= 9) {
      for (let i = 2; i <= this.pageCount - 1; i++) {
        pages.push(i);
      }
    } else {
      const current = this.state.page;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.pageCount - 1);
      if (current - 1 <= 2) {
        right = 5;
      }
      if (this.pageCount - current <= 2) {
        left = this.pageCount - 4;
      }
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }
    }
    this.setState({pages});
  }

  private next() {
    if (this.state.page < this.pageCount) {
      this.go(this.state.page + 1)();
    }
  }

  private previous() {
    if (this.state.page > 1) {
      this.go(this.state.page - 1)();
    }
  }

  private go(page: number) {
    return () => {
      if (page === this.state.page) {
        return;
      }
      this.setState({page}, () => {
        const {pageCount} = this;
        const {pageSize = 15, total} = this.props;
        const {onPageChange} = this.props;
        this.build();
        if (onPageChange) {
          onPageChange({page, pageCount, pageSize, total})
        }
      });
    }
  }

  render() {
    const {hideOnSinglePage, className, total, onPageChange, pageSize, ...props} = this.props;
    const {pageCount, firstIndex} = this;
    const {page, pages} = this.state;
    const clsName = cx('vx-pagination', className);
    const prevCls = cx('vx-pagination-prev', page === 1 ? 'vx-pagination-unarrived' : '');
    const nextCls = cx('vx-pagination-next', page === pageCount ? 'vx-pagination-unarrived' : '');
    const firstItemCls = cx('vx-pagination-item', firstIndex === page ? 'vx-pagination-current' : '');
    const lastItemCls = cx('vx-pagination-item', pageCount === page ? 'vx-pagination-current' : '');
    return (
      <ul className={clsName} onSelect={() => false}
          style={{display: (hideOnSinglePage && pageCount === 1) ? 'none' : 'block'}} {...props}>
        <li className={prevCls} onClick={this.previous} >上一页</li >
        <li className={firstItemCls} onClick={this.go(firstIndex)} >
          {firstIndex}
        </li >
        {
          (pageCount > 9) && (page - 3) > firstIndex && (
            <li className="vx-pagination-item" onClick={this.go(page - 5)} >
              <span >...</span >
            </li >
          )
        }
        {
          pages.map(pageNum => {
            const cls = cx("vx-pagination-item", pageNum === page ? 'vx-pagination-current' : '')
            return (
              <li className={cls} key={pageNum} onClick={this.go(pageNum)} >{pageNum}</li >
            )
          })
        }
        {
          (pageCount > 9) && (page + 3) < pageCount && (
            <li className="vx-pagination-item" onClick={this.go(page + 5)} >
              <span >...</span >
            </li >
          )
        }
        <li className={lastItemCls} onClick={this.go(pageCount)} >
          {pageCount}
        </li >
        <li className={nextCls} onClick={this.next} >下一页</li >
      </ul >
    )
  }
}


export default Pagination;
