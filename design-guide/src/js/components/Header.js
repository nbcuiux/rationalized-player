
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import Search from './Search.js';
import $ from "jquery";
//import Waypoint from '../lib/waypoints.js';

// this attaches `Waypoint` to window
require('waypoints/lib/noframework.waypoints.js')

export default class Header extends Component {


  constructor(props) {
    super(props);
    this.state = {
      isSticky: false
    }
  }

  componentDidMount() {
    this.waypoint = new Waypoint({
      element: this.refs.container,
      handler: (direction) => {
        console.log('Scrolled to waypoint!', direction)
        switch (direction) {
          case "up":
            this.setState({
              isSticky: false
            });
            return;
          case "down":
            this.setState({
              isSticky: true
            });
            return;
        }
      },
      offset: -192
    })
  }

  scrollToTop() {
    $("body").animate({
      scrollTop: 0
    }, 500);
  }

  render() {

    let classnames = ClassNames({
      'header': true,
      'header--sticky': this.state.isSticky
    });

    console.log("The props", this.props);

    return (
      <header className={classnames} ref="container">
        <Search />
        <div className="header-wrapper">
          <div className="header-inner">
            <div className="header-inner-inner">
              <div className="header-title">
                <span>{ this.props.headerTitle } </span>
                {
                  this.props.pageTitle ?
                    <span className="header-title__longer">- { this.props.pageTitle }</span>
                  :
                    null
                }
              </div>
            </div>
          </div>
          <div className="header-to-top" onClick={this.scrollToTop.bind(this)}>
             <i className="fa fa-sort-asc"></i>
          </div>
        </div>
      </header>
    );
  }
}
