<?php
	$results = search();
	echo json_encode(array(
		'term' => $_GET['s'],
		'results' => $results
	));
?>