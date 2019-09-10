<?php 

	/* Template Name: Index Landing */

	$context = Timber::get_context();
    $context['post'] = new TimberPost();

    $links = $context['post']->get_field("links");
    $groupedLinks = array();

    foreach ($links as $link) {    	
    	$cat = $link['category'];
    	$groupedLinks[$cat][] = $link;
    }

    $context['links'] = $groupedLinks;

    Timber::render('index-landing.html', $context);