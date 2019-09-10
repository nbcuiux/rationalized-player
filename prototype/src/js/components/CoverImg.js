import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

export default class CoverImg extends Component {

	static propTypes = {
		show: PropTypes.bool,
		src: PropTypes.string
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.show !== this.props.show) {
			return true;
		}
		return false;
	}

	constructor(props) {
		super(props);
	}

	render() {
		const backgroundImageStyles = {
			backgroundImage: `url(${this.props.src})`
		}

		return (
			<div>
				<ReactCSSTransitionGroup transitionName="cover-img" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				{ 
					this.props.show ?
						<div className="cover-img" style={ backgroundImageStyles }></div>
					:
						null
				}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}