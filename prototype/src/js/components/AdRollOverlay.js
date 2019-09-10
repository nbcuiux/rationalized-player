import React, { Component, PropTypes } from 'react';
import { formatTime } from '../client/utils';
import classNames from "classnames";

export default class AdRollOverlay extends Component {

	static propTypes = {
		timeToEnd: PropTypes.number,
		placement: PropTypes.string
	}

	static defaultProps = {
		placement: "control-bar"
	}

	constructor(props) {
		super(props);
	}

	render() {
		const time = formatTime(this.props.timeToEnd);
		const classnames = classNames({
			"ad-roll__overlay": true
		}, "ad-roll__overlay--" + this.props.placement)
		return (
			<div className={classnames}>
				<span>Ad</span> 
				<span>{ time }</span>
				<span>
					<a href="amazon.com">amazon.com</a>
					<i className="fa fa-external-link"></i>
				</span>
			</div>
		)
	}
}