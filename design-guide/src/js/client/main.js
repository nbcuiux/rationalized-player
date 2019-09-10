


// Sample code to set up React and JQuery



var React     = window.React = require('react');
import $ from "jquery"
window.jQuery = $;

import ReactDOM from 'react-dom';
//import setupSplash from "./lib/splash.js";


import NavMenu from "../components/NavMenu.js";
import Header from "../components/Header.js";
import Pagination from "../components/Pagination.js";
import Search from "../components/Search.js";
import Accordion from "../components/Accordion.js";
import AutoplayVideo from "../components/AutoplayVideo.js";

window.components = {
	NavMenu, Header, Pagination, Search
}



window.ReactDOM = ReactDOM;
//window.setupSplash = setupSplash;





window.setupSectionNav = function() {
	$(".section-nav__item a").on("click", function(e) {
		e.preventDefault();
		let id = $(this).attr("href");
		let $el = $(id);

		$("html, body").animate({
			scrollTop: $el.offset().top - 100
		}, 500);
	});

	let numItems = $(".section-nav__item").length;
	let numClass = "";

	if (numItems < 8) {
		numClass = "section-nav__item-list--sm";
	}
	else if (numItems < 12) {
		numClass = "section-nav__item-list--md";
	}
	else if (numItems < 16) {
		numClass = "section-nav__item-list--lg";
	}
	$(".section-nav__item-list").addClass(numClass);
}




window.setupWidgets = function() {

	// Accordion widget
	$("[data-accordion]").each((index, el)=>{
		let items = [];
		let sections = $(el).find("[data-accordion-title]");
		// Extract data from the rendered markup
		sections.each((index, titleEl) => {
			let $titleEl = $(titleEl);
			let title = $titleEl.html();
			let content = $titleEl.next().html();
			items.push({
				title: title,
				content: content
			})
		});
		ReactDOM.render(
	    	React.createElement(Accordion, {items: items}),
	    	el
	    );
	});

	// Nav menu
	const navEl = document.getElementById("nav");
	if (navEl) {
		let props = Object.assign({}, window.MENU_DATA, { logoSrc: window.OPTIONS_DATA.menu_logo })
		ReactDOM.render(
	    	React.createElement(window.components.NavMenu, props),
	    	navEl
	    );
	}


	// Autoplay videos
	console.log("okkk lets try seting this up");
	$("[data-autoplay-video]").each((index,el) => {
		const props = {
			videoSrc: $(el).attr("data-src")
		}
		ReactDOM.render(
	    	React.createElement(AutoplayVideo, props),
	    	el
	   );



	});


	var elem = document.querySelector('.index-landing');

}
