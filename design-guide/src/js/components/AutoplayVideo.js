
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';
require('waypoints/lib/noframework.waypoints.js');

export default class AutoplayVideo extends Component {

  static propTypes = {
    videoSrc: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      isSticky: false
    }
  }

  componentDidMount() {
    this.waypoint1 = new Waypoint({
      element: this.refs.container,
      handler: (direction) => {
        switch (direction) {
          case "up":
            this.video.play()
            return;
          case "down":
            this.video.pause()
            return;
        }
      },
      offset: 0
    })

    this.waypoint2 = new Waypoint({
      element: this.refs.container,
      handler: (direction) => {
        switch (direction) {
          case "up":
            this.video.pause()
            return;
          case "down":
            this.video.play()
            return;
        }
      },
      offset: "bottom-in-view"
    })
  }

  render() {

    let classnames = ClassNames({
      'autoplay-video': true
    });

    const { videoSrc } = this.props;

    return (
      <div className={classnames} ref="container">
        <video src={videoSrc} ref={(el)=>{this.video = el}} loop={true}/>
      </div>
    );
  }
}
