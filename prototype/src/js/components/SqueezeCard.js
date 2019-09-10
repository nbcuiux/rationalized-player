import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classNames from "classnames";
import Circle from './Circle';

export default class SqueezeCard extends Component {

	static propTypes = {
		show: PropTypes.bool,
		onReplay: PropTypes.func,
		backgroundImgSrc: PropTypes.string,
		goToNextPlaylistItem: PropTypes.func,
		nextItem: PropTypes.object,
		endCardShowInfo: PropTypes.bool,
		links: PropTypes.array,
		mode: PropTypes.string,
		playNextDelay: PropTypes.number,
		timeToEnd: PropTypes.number,
		runTimer: PropTypes.bool
	}

	static defaultProps = {
		mode: "squeeze" // Can be "squeeze" or "end"
	}

	constructor(props) {
		super(props);
		this.state = {
			countdownToNext: 0,
			totalCountdownToNext: 0 
		}
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.runTimer !== nextProps.runTimer) {
			if (nextProps.runTimer) {
				this.countdownTimer = setInterval(this.onCountdownInterval, 1000);
			}
			else {
				clearInterval(this.countdownTimer);
			}
		}

		if (!this.props.show && nextProps.show) {
			clearInterval(this.countdownTimer);
			const initialCountdown = Math.floor(this.props.timeToEnd + this.props.playNextDelay);
			this.setState({
				countdownToNext: initialCountdown,
				totalCountdownToNext: initialCountdown
			})
			this.countdownTimer = setInterval(this.onCountdownInterval, 1000);
		}
		else if (this.props.show && !nextProps.show) {
			clearInterval(this.countdownTimer);
		}
	}

	onCountdownInterval = () => {
		let countdown = this.state.countdownToNext - 1;
		if (countdown <= 0) {
			clearInterval(this.countdown);
			this.props.goToNextPlaylistItem();
			return;
		}
		this.setState({
			countdownToNext: countdown
		})		
	}

	componentWillUnmount() {
		clearInterval(this.countdownTimer);
	}

	getProgress = () => {
		return this.state.countdownToNext / this.state.totalCountdownToNext;
	}

	splitText = (text) => {
		return text.split(' ');
	}

	render() {
		
		const { goToNextPlaylistItem, nextItem, mode, links, endCardShowInfo, playNextDelay, timeToEnd } = this.props;
		const classnames = classNames({
			'squeeze-card': true,
		}, 'squeeze-card--' + mode);

		const { totalCountdownToNext, countdownToNext } = this.state;

		let title;
		(nextItem != null) ? (
			title = this.splitText(nextItem.title).map((item, index) =>
				<span key={index}>{item}{(index != this.splitText(nextItem.title).length) ? ' ' : null}</span>
			)
		) : null;

		return (
			<div className="card-wrapper">

				<ReactCSSTransitionGroup transitionName="squeeze-card" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{
						this.props.show ?
							<div className={classnames} style={{ background: "url(" + this.props.backgroundImgSrc + ")" }}>
								<a className="squeeze-card__button-replay" onClick={this.props.onReplay}>
									<i className="iconcss icon-replay"></i>
									Replay
								</a>
								<div className="squeeze-card__inner">
									<div className="squeeze-card__info-1">
										<div className="squeeze-card-img-wrapper" onClick={goToNextPlaylistItem}>
											<div className="next-episode-counter">Playing in {countdownToNext} seconds</div>
											<div className="squeeze-card-img">
												<img src={nextItem.coverImgSrc} />
												<i className="iconcss icon-play">
													<Circle progress={this.getProgress()} />
												</i>
											</div>
										</div>
										<div className="squeeze-card-text">
											<h4>Coming up next</h4>
											<h3>{title}</h3>
											<h4>{nextItem.subtitle}</h4>
											<p>{nextItem.description}</p>
										</div>
									</div>
									<div className="squeeze-card__info-2">
										<div className="squeeze-card__buttons">											
											{
												links.map(link=> {
													return (
														<a className="squeeze-card__button" href={link.url}>{link.text}</a>
													)
												})
											}
										</div>
									</div>
								</div>
							</div>
						: 
							null
					}
				</ReactCSSTransitionGroup>
			</div>
		)
	}
}