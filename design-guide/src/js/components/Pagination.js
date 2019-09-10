
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from "jquery";
//import Waypoint from '../lib/waypoints.js';




function flattenMenu(items, flattened) {
  items.forEach((item, index)=>{
    if (item.children === null) {
      flattened.push(item);
    }
    else {
      flattenMenu(item.children, flattened);
    }
  });
}



export default class Pagination extends Component {

  constructor(props) {
    super(props);

    let flattened = [];
    flattenMenu(props.menu.items, flattened);

    // Find current
    for (let i = 0; i < flattened.length; i++) {
      if (flattened[i].current) {
        this.state = {
          prev: flattened[i-1],
          current: flattened[i],
          next: flattened[i+1]
        }
        return;
      }
    }
    this.state = {};
  }

  componentDidMount() {
    this.waypoint = new Waypoint({
      element: this.refs.container,
      handler: (direction) => {
        console.log('Scrolled to footer!', direction)
        switch (direction) {
          case "up":
            $("body").removeClass("scrolled-to-pagination");
            return;
          case "down":
            $("body").addClass("scrolled-to-pagination");
            return;
        }
      },
      offset: "100%"
    })
  }

  render() {
    return (
      <div className="pagination" ref="container">
        {
          (this.state.prev) ?
            <a className="pagination-back" href={this.state.prev.url}>
              <i className="material-icons arrow-L">arrow_back</i>
              <span className="pagination-direction">Previous</span>
              <div className="pagination-name">{ this.state.prev.name }</div>
            </a>
          :
            <div></div>
        }
        {
          (this.state.next) ?
            <a className="pagination-next" href={this.state.next.url}>
              <i className="material-icons arrow-R">arrow_forward</i>
              <span className="pagination-direction">Next</span>
              <div className="pagination-name">{ this.state.next.name }</div>
            </a>
          :
            <div></div>
        }
      </div>
    );
  }
}
