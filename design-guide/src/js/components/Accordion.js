
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from "jquery";

export default class Accordion extends Component {


  constructor(props) {
    super(props);
    this.state = {
      openIndex: null
    }
  }

  componentDidMount() {
    // Calculate the offsets while the accordian is closed so we can 
    // scroll to each item on open
    let containerOffset = $(this.refs.container).offset().top;
    this.initialOffsetPositions = this.props.items.map((item, index)=> {
      let el = $(this.refs["item" + index]);
      return el.offset().top - 70 - containerOffset;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.openIndex !== prevState.openIndex) {
      if (this.state.openIndex !== null) {
        setTimeout(()=>{
          this.scrollToItem(this.state.openIndex);
        }, 100);
      }
    }
  }

  scrollToItem(index) {
    let containerOffset = $(this.refs.container).offset().top;
    let el = $(this.refs["item" + index]);
    $("body").animate({
      scrollTop: this.initialOffsetPositions[index] + containerOffset
    });
  }

  selectItem(index) {
    if (this.state.openIndex === index) {
      this.setState({
        openIndex: null
      })
    }
    else {
      this.setState({
        openIndex: index
      })
    }
  }

  render() {
    let { items } = this.props;
    let { openIndex } = this.state;
    return (
      <div className="accordion" ref="container">
        {
          items.map((item, index)=>{
            let isOpen = index === openIndex;
            let classnames = ClassNames({
              'accordion-item': true,
              'accordion-item--open': isOpen
            })
            let contentHeight = isOpen ? $(this.refs["content" + index]).innerHeight() : 0;
            return (
              <div className={classnames} key={index} ref={"item" + index }>
                <div className="accordion-title" onClick={this.selectItem.bind(this, index)}>
                  <div wysiwyg-content dangerouslySetInnerHTML={{__html: item.title }}></div>
                  <div className="accordion-caret">
                    <svg width="28" height="15">
                      <path d="M0 0 L 14 14 L 28 0" />
                    </svg>
                  </div>
                </div>
                <div className="accordion-content" ref="contentContainer" style={{ height:contentHeight }}>
                  <div className="accordion-content__inner wysiwyg-content" dangerouslySetInnerHTML={{__html: item.content }} ref={"content" + index}></div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}
