(function(){ 'use strict';

	var map = L.map('map', {
		crs: L.CRS.EPSG32633
	});

	map.fitBounds([[57.76914, 5.22972], [70.81525, 32.10659]]);

	L.geoJson(norway, {
		weight: 1
	}).addTo(map);

	L.terrainGrid().addTo(map);

	L.marker([60.598144,7.507339]).addTo(map);

})();