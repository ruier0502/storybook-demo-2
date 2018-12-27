import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './index.css';

/**
 * 翻页组件
 * 如果页数太大，会有一部分被隐藏，但是第一页和对后一个一直都会显示。中间会显示当前选中页和当前选中页附近的页
 * 从0开始计数
 */
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 当前选中页 从0开始计数
      currentPage: this.props.page || 0,
      // 总页数
      totalPage: this.props.totalPage || 0,
      // 要显示在中间的按钮列表
      displayBtnList: [],
    };
  }

  componentDidMount() {
    const { shouldDidMountOnChange } = this.props;
    const { currentPage, totalPage } = this.state;
    if (shouldDidMountOnChange) {
      this.goPage(currentPage);
    } else {
      this.goPageRender(currentPage, totalPage);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { page, totalPage } = nextProps;
    this.goPageRender(page || 0, totalPage);
  }

  prevOnClick = () => {
    this.goPage(this.state.currentPage - 1);
  };

  nextOnClick = () => {
    this.goPage(this.state.currentPage + 1);
  };

  /**
   * 切换到pageNum页
   * @param pageNum 从0开始计数
   * @param totalPage
   */
  goPageRender = (pageNum, totalPage) => {
    const self = this;
    let { maxDisplayNumber } = this.props;
    const displayBtnList = [];
    if (maxDisplayNumber < 3 || maxDisplayNumber > totalPage) {
      maxDisplayNumber = 3;
    }
    if (pageNum < 0 || pageNum >= totalPage) {
      pageNum = 0;
    }
    // 往要显示在中间的按钮列表添加一个元素
    function pushBtn(btnIndex) {
      const cssClass = classnames('page-btn page-link', {
        active: btnIndex === pageNum,
      });
      displayBtnList.push(<span
        key={btnIndex}
        className={cssClass}
        onClick={() => self.goPage(btnIndex)}
      >
        {btnIndex + 1}
      </span>); // eslint-disable-line
    }

    // 去掉第一个和最后一个
    maxDisplayNumber -= 2;
    // page 为1的按钮一直都要显示
    if (pageNum !== 0) {
      pushBtn(0);
    }
    const step = Math.floor(maxDisplayNumber / 2);
    let startIndex = pageNum - step;
    if (startIndex < 1) {
      startIndex = 1;
    }
    let endIndex = pageNum + (maxDisplayNumber - step);
    if (endIndex > totalPage - 2) {
      endIndex = totalPage - 2;
    }
    // 中间是否被隐藏了翻页按钮 隐藏的部分显示为...
    if (startIndex > 1) {
      displayBtnList.push(<span key="<" className="page-btn page-ellipsis">...</span>);
    }
    for (let i = startIndex; i < pageNum; i++) {
      pushBtn(i);
    }
    for (let i = pageNum; i <= endIndex; i++) {
      pushBtn(i);
    }
    // 中间是否被隐藏了翻页按钮 隐藏的部分显示为...
    if (endIndex < totalPage - 2) {
      displayBtnList.push(<span key=">" className="page-btn page-ellipsis">...</span>);
    }
    // 最后一页的按钮必须显示
    pushBtn(totalPage - 1);

    this.setState({
      currentPage: pageNum,
      totalPage,
      displayBtnList,
    });
  };

  /**
   * 跳转到第pageNum页
   * @param pageNum 从0开始计数
   */
  goPage = (pageNum) => {
    const { onChange } = this.props;
    const { totalPage } = this.state;
    this.goPageRender(pageNum, totalPage);
    if (typeof onChange === 'function') {
      onChange(pageNum, this.state.currentPage);
    }
  };

  render() {
    const { style, className } = this.props;
    const { currentPage, displayBtnList, totalPage } = this.state;
    const lastPage = totalPage - 1;

    const cssClass = classnames('s-pagination', className);

    return (
      <div className={cssClass} style={style}>
        <span
          className="page-btn page-prev"
          disabled={currentPage <= 0}
          onClick={currentPage <= 0 ? null : this.prevOnClick}
        >
          &lt;
        </span>
        {displayBtnList}
        <span
          className="page-btn page-next"
          disabled={currentPage >= lastPage}
          onClick={currentPage >= lastPage ? null : this.nextOnClick}
        >
          &gt;
        </span>
      </div>
    );
  }
}

Pagination.propTypes = {
  /** className */
  className: PropTypes.string,
  /** 总页数 */
  totalPage: PropTypes.number.isRequired,
  /** 当前选中页 从0开始计数 */
  page: PropTypes.number,
  /**
   * 最大显示的分页按钮的数量,多余这个数量的按钮将被隐藏
   * 在有很多页时会显示所有页，所以需要设置一个最大显示多少页。
   * 不包含 上一页 和 下一页 按钮
   */
  maxDisplayNumber: PropTypes.number,
  /**
   * 当用户翻页时调用 callback(当前点击页,在点击前选中当页)
   * 注意：从0开始计数
   */
  onChange: PropTypes.func,
  /**
   * 在page组件 componentDidMount 时 是否需要回调 onChange
   */
  shouldDidMountOnChange: PropTypes.bool,
};

Pagination.defaultProps = {
  shouldDidMountOnChange: true,
  maxDisplayNumber: 6,
  page: 0, // 当前叶
};

export default Pagination;
