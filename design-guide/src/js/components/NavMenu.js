
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';


export default class NavMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }

        this.loaded = false;
    }

    maskClick(e) {
        this.setState({
            isOpen: false
        })
    }

    triggerClick(e) {
        this.setState({
            isOpen: true
        })
    }

    componentDidUpdate() {
        this.loaded = true;
    }

    render() {
        let classnames = ClassNames({
            "nav": true,
            "nav--open": this.state.isOpen,
            "nav--closed": (!this.state.isOpen && this.loaded)
        });
        return (
            <nav className={classnames} ref="container">
                <div className="nav-trigger" onClick={this.triggerClick.bind(this)}>
                    <i className="material-icons">menu</i>
                </div>
                <div className="nav-mask" onClick={this.maskClick.bind(this)}></div>
                <div className="nav-menu">
                    <div className="nav-menu__heading">
                        <a href={window.SITE_URL}> 
                            <img src={this.props.logoSrc} />
                        </a>
                    </div>
                    <div className="nav-menu__list">
                        {
                            this.props.items.map((item, index)=>{
                                return <NavMenuItem item={item} key={index} />
                            })
                        }
                    </div>
                </div>
            </nav>
        )
    }
}


class NavMenuItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.item.current_item_ancestor
        }
    }

    componentDidMount() {
        this.updateHeight();
    }

    componentDidUpdate(prevProps, prevState) {
        this.updateHeight();
    }

    updateHeight() {
        if (this.props.item.children) {
            if (this.state.isOpen) {
                let height = this.refs.listInner.offsetHeight;
                this.refs.listWrapper.style.height = height + "px";
            }

            else {
                this.refs.listWrapper.style.height = "0px";
            }
        }
    }

    clickHandler(e) {
        let item = this.props.item;
        if (item.children) {
            this.setState({
                isOpen: !this.state.isOpen
            });
            e.preventDefault();
            return;
        }
    }

    render() {
        let item = this.props.item;
        let classnames = ClassNames({
            "nav-menu__item": true,
            "nav-menu__item--open": this.state.isOpen,
        })

        let subclassnames = ClassNames({
            "nav-menu__item-link": true,
            "nav-menu__item-link--current": item.current,
            "nav-menu__item-link--no-children": item.children === null
        })

        return (
            <div className={classnames}>
                <div className={subclassnames} onClick={this.clickHandler.bind(this)}>
                    <a href={item.url} target={item.target}>
                        { item.name }
                    </a>
                </div>
                {
                    item.children ?
                        <div className="nav-menu__sub-list" ref="listWrapper">
                            <div className="nav-menu__sub-list-inner" ref="listInner">
                                {
                                    item.children.map((item, index)=>{
                                        return <NavMenuItem item={item} key={index} />
                                    })
                                }
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        )
    }
} 
