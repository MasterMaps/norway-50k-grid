(function(){ 'use strict';

	var bounds = [[57, 4], [71, 32]];

	var map = L.map('map', {
		crs: L.CRS.EPSG32633,
 		continuousWorld: true,
		worldCopyJump: false		
	});

	map.fitBounds(bounds);

	L.geoJson(norway, {
		weight: 1
	}).addTo(map);

	/*
	L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=norges_grunnkart&STYLE=default&TILEMATRIXSET=EPSG:32633&TILEMATRIX=EPSG:32633:{z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png', {
		attribution: 'Kartverket',
		bounds: bounds
	}).addTo(map);
	*/

	L.norwayGrid().addTo(map);


})();