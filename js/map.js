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

	L.norwayGrid().addTo(map);

})();