
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
import $ from 'jquery';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      term: "",
      searching: false,
      isOpen: false
    }
  }

  onChange(e) {

    let term = e.target.value;
    let searching = (term !== "");
    
    this.setState({
      searching: searching,
      term: term,
      results: []
    });

    $.get(window.SITE_URL + "/?s=" + term, (data) => {
      var data = JSON.parse(data);
      if (data.term !== this.state.term) {
        return;
      }
      console.log(data);
      this.setState({
        results: data.results,
        searching: false
      });
    });



  }

  onMouseEnter () {
    this.setState({
      isOpen: true
    })
  }

  onMouseLeave () {
    if (this.state.term === "" && !(document.activeElement === this.refs.theInput)) {
      this.setState({
        isOpen: false
      })
    }
  }

  render() {
    
    let classnames = ClassNames({
      'search': true,
      'search--open': this.state.isOpen
    });

    return (
      <div className={classnames} onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
        <i className="fa fa-search"></i>
        <input placeholder="Search..." className="search-input" ref="theInput" onChange={ this.onChange.bind(this) } onBlur={ this.onMouseLeave.bind(this) } />
        {
          (this.state.searching) ?
            <div className="search-loader"><div className="loader"></div></div>
          :
            null
        }
        {
          (this.state.results.length > 0) ?
            <div className="search-list">
              <div className="search-list__header">
                Articles matching &quot;{ this.state.term }&quot;
              </div>
              <div className="search-list__list">
                {
                  this.state.results.map((item, index)=>{
                    return (
                      <div className="search-list__item" key={index}>
                        <a href={item.link}>
                          {item.title}
                          <span className="search-list__type">
                            {item.type}
                          </span>
                        </a>
                      </div>)
                  })
                }
              </div>
            </div>
          :
            null
        }
      </div>
    );
  }
}
