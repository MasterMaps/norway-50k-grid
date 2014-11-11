L.NorwayGrid = L.FeatureGroup.extend({

	options: {
		bounds: L.bounds([-80000, 6445000], [1120000, 7945000]),
		tileSize: 50000,
		grid: [
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1],
			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,0],
			[0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
			[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			[0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]			
		]
	},

	onAdd: function (map) {
		var bounds = this.options.bounds, 
			tileSize = this.options.tileSize,
			grid = this.options.grid;

		for (var y = 0; y < (bounds.max.y - bounds.min.y) / tileSize; y++) {
			for (var x = 0; x < (bounds.max.x - bounds.min.x) / tileSize; x++) {
				if (grid[y][x]) {
					map.addLayer(this.createTile(x, y));
				}
			}
		}

	},	

	createTile: function (x, y) {
		var utm33 = this._map.options.crs.projection,
			bounds = this.options.bounds, 
			tileSize = this.options.tileSize,
			west = bounds.min.x + (x * tileSize),
			north = bounds.max.y - (y * tileSize),
			east = west + tileSize,
			south = north - tileSize,
			sw = utm33.unproject({x: west, y: south}),
			nw = utm33.unproject({x: west, y: north}),
			se = utm33.unproject({x: east, y: south}),
			ne = utm33.unproject({x: east, y: north});

		return L.polygon([[sw.lat, sw.lng], [nw.lat, nw.lng], [ne.lat, ne.lng], [se.lat, se.lng]], {
			weight: 1,
			color: '#f00'
		}).bindPopup(
			'Tile: [' + x + ', ' + y + ']<br><br>' + 
			'Bounds: ' + west + ' ' + south + ' ' + east + ' ' + north
		);
	},

	getTileInfo: function (y, x) {
		return 'Tile: ' + x + ', ' + y;
	}

});

L.norwayGrid = function () {
	return new L.NorwayGrid();
};