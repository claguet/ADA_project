/**
 * Created by clementineaguet on 27.01.17. UNTIL COLORS/ LEGEND/ STYLE UNIFORMIZATION WORKED FINE
 */

 
// URL for the base map
var layer_url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

// Definition of base maps
var light_base = L.tileLayer(layer_url, {id: 'mapbox.light', maxZoom: 18}),
    streets_base   = L.tileLayer(layer_url, {id: 'mapbox.streets', maxZoom: 18}),
    outdoor_base = L.tileLayer(layer_url, {id: 'mapbox.outdoors', maxZoom: 18}),
    satellite_base = L.tileLayer(layer_url, {id: 'mapbox.satellite', maxZoom: 18});

// List of properties to display
var list_properties = ['Average_per_capita_living_space_in_m²_2013', 'Foreign_nationals_in_%_2014','Crude_divorce_rate_2014',
    'Social_assistance_rate_2014', 'Graduation_rate_in_higher_education_institutions_2014', 'Main_language_in_%_German_2013'];
var layer_names= ['Living space', 'Foreigner','Crude divorce', 'Social assistance rate', 'Graduation', 'German language'];
var units_properties = ['m² per capita','%','rate','rate', 'rate', '%'];
var legends_properties = [[38, 40, 42, 44, 46, 48, 50, 52],[10, 15, 20, 25, 30, 35, 40, 45],[1, 1.25, 1.5, 2, 2.25, 2.5, 2.75, 3],
    [0, 1, 2, 3, 4, 5, 6, 7], [15, 18, 21, 24, 27, 30, 33, 36], [0, 14, 28, 42, 56, 68, 82, 94]];
var list_votation_cat = ['all','Economie','Education', 'Environnement', 'Immigration', 'Sante', 'Securite', 'Social', 'Travail'];
var votation_names = ["All","Economic", 'Education', 'Environment', 'Immigration', 'Health', 'Security', 'Social', 'Work'];


/// CREATE MAP
var map = L.map('map',{
    center: [46.813823, 8.216127],
    zoom: 8,
    layers: [light_base],
    // Full screen option
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft',
        content: 'FS',
        forceSeparateButton: true
    }
});
	
/// CREATE LAYERS

// DEMOGRPHIC GEOJSONS
var geojson0 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});
var geojson1 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});
var geojson2 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});
var geojson3 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});
var geojson4 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});
var geojson5 = L.geoJson(statesData, {
    style: style,
    onEachFeature: function(feature, layer){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight
        })
    }
});

// VOTATION GEOJSONS
function style_votation(feature) {
    return {
        weight: 0,
        opacity: 1,
        fillOpacity: 0
    };
}
var currentVotation_layer = 0;
var currentVotation = 0;

var marker_id = 0;
var marker_all = [];
var geojson_all_votation = L.geoJson(statesData2, {
    style:style_votation,
    onEachFeature: function(feature, layer){
        marker_all[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.all})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.all)+' with '+String(Math.abs(layer.feature.properties.all_score)));
        marker_id++;
    }
});
var marker_id = 0;
var marker_economic = [];
var geojson_economic = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_economic[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Economie})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Economie)+' with '+String(Math.abs(layer.feature.properties.Economie_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_education = [];
var geojson_education = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_education[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Education})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Education)+' with '+String(Math.abs(layer.feature.properties.Education_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_environment = [];
var geojson_environment = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_environment[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Environnement})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Environnement)+' with '+String(Math.abs(layer.feature.properties.Environnement_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_immigration = [];
var geojson_immigration = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_immigration[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Immigration})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Immigration)+' with '+String(Math.abs(layer.feature.properties.Immigration_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_health = [];
var geojson_health = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_health[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Sante})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Sante)+' with '+String(Math.abs(layer.feature.properties.Sante_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_security = [];
var geojson_security = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_security[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Securite})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Securite)+' with '+String(Math.abs(layer.feature.properties.Securite_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_social = [];
var geojson_social = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_social[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties[list_votation_cat[currentVotation_layer]]})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Social)+' with '+String(Math.abs(layer.feature.properties.Social_score)));
		marker_id++;
	}
});
var marker_id = 0;
var marker_work = [];
var geojson_work = L.geoJson(statesData2, {
    style: style_votation,
    onEachFeature: function(feature, layer){
        marker_work[marker_id] = L.marker(layer.getBounds().getCenter(), {icon: L.divIcon({className: 'label', html: feature.properties.Travail})});
        layer.bindPopup('Score: <br>'+String(layer.feature.properties.Travail)+' with '+String(Math.abs(layer.feature.properties.Travail_score)));
		marker_id++;
	}
});

	
/// DISPLAY FUNCTIONS

var currentLayer = 0;

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties[list_properties[currentLayer]])
    };
}
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2.5,
        color: '#000000',
        dashArray: '',
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    var prop = e.target.feature.properties;
    info.update(prop, prop.name, prop[list_properties[currentLayer]]);
}
function resetHighlight(e) {
    currentJson.resetStyle(e.target);
    info.update();
}

// Hover info
var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
info.update = function (props, name, value) {
    this._div.innerHTML = '<h4>' + layer_names[currentLayer] +  '</h4>' + (props ?
        '<b>' + name + '</b><br />' + value + ' ' + units_properties[currentLayer]  
            : 'Hover over a state');
};
info.addTo(map);

// Legend
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info legend');
	this.update();
    return this._div;
};
legend.update = function (map) {
	var grades = legends_properties[currentLayer],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }
    this._div.innerHTML = labels.join('<br>')+ '<br>' + '   ' + units_properties[currentLayer]  ;
};

// COLOR FOR LEGEND
function getColor(d) {
	if (currentLayer === 0){
		return d > 52 ? '#3f0000' :
			d > 50 ? '#750000' :
				d > 48  ? '#a50000' :
					d > 46  ? '#ce0000' :
						d > 44  ? '#ff1414' :
							d > 42   ? '#ff5151' :
								d > 40   ? '#ffa3a3' :
									d > 38   ? '#ffdbdb' :
												'#fff2f2';
	}
	else if (currentLayer === 1) {
        return d > 45 ? '#3f0000' :
            d > 40 ? '#750000' :
                d > 35  ? '#a50000' :
                    d > 30  ? '#ce0000' :
                        d > 25  ? '#ff1414' :
                            d > 20   ? '#ff5151' :
                                d > 15   ? '#ffa3a3' :
                                    d > 10   ? '#ffdbdb' :
                                        '#fff2f2';
	}
	else if (currentLayer === 2) {
        return d > 3 ? '#3f0000' :
            d > 2.75 ? '#750000' :
                d > 2.5  ? '#a50000' :
                    d > 2.25  ? '#ce0000' :
                        d > 2.00  ? '#ff1414' :
                            d > 1.75  ? '#ff5151' :
                                d > 1.5   ? '#ffa3a3' :
                                    d > 1   ? '#ffdbdb' :
                                        '#fff2f2';
	}
	else if (currentLayer === 3) {
        return d > 7 ? '#3f0000' :
            d > 6 ? '#750000' :
                d > 5  ? '#a50000' :
                    d > 4  ? '#ce0000' :
                        d > 3  ? '#ff1414' :
                            d > 2   ? '#ff5151' :
                                d > 1   ? '#ffa3a3' :
                                    d > 0   ? '#ffdbdb' :
                                        '#fff2f2';
	}
    else if (currentLayer === 4) {
        return d > 36 ? '#3f0000' :
            d > 33 ? '#750000' :
                d > 30  ? '#a50000' :
                    d > 27  ? '#ce0000' :
                        d > 24  ? '#ff1414' :
                            d > 21   ? '#ff5151' :
                                d > 18   ? '#ffa3a3' :
                                    d > 15   ? '#ffdbdb' :
                                        '#fff2f2';
    }
    else if (currentLayer === 5) {
        return d > 94 ? '#3f0000' :
            d > 82 ? '#750000' :
                d > 68  ? '#a50000' :
                    d > 56  ? '#ce0000' :
                        d > 42  ? '#ff1414' :
                            d > 28   ? '#ff5151' :
                                d > 14   ? '#ffa3a3' :
                                    d > 0   ? '#ffdbdb' :
                                        '#fff2f2';
    }
}
var legendOn = false;

// ---------------------------------------------------------------------------------------------------------------------
// INTERACTIVE DISPLAY CHANGES
// ---------------------------------------------------------------------------------------------------------------------

var currentJson = 0;
var currentMarker = [];

// DEMOGRAPHIC, SOCIAL OR ECONOMIC
map.on('baselayerchange', function (eventLayer) {
    // map.removeLayer(currentJson);
    if (eventLayer.name === layer_names[0]) {
        legendOn = true;
        currentLayer = 0;
        currentJson = geojson0;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    else if  (eventLayer.name === layer_names[1]) {
        legendOn = true;
        currentLayer = 1;
        currentJson = geojson1;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    else if  (eventLayer.name === layer_names[2]) {
        legendOn = true;
        currentLayer = 2;
        currentJson = geojson2;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    else if  (eventLayer.name === layer_names[3]) {
        legendOn = true;
        currentLayer = 3;
        currentJson = geojson3;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    else if  (eventLayer.name === layer_names[4]) {
        legendOn = true;
        currentLayer = 4;
        currentJson = geojson4;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    else if  (eventLayer.name === layer_names[5]) {
        legendOn = true;
        currentLayer = 5;
        currentJson = geojson5;
        currentJson.setStyle(style);
        legend.addTo(map);
    }
    if (legendOn){
        legend.update();
    }
});

// VOTATION THEMATICS
map.on('baselayerchange', function(eventLayer){
	var marker_id = 0;
	for (i = 0; i < currentMarker.length; i++) {
		map.removeLayer(currentMarker[i]);
	}
    if(eventLayer.name === votation_names[0]){
        currentVotation_layer = 0;
        currentVotation = geojson_all_votation;
		currentMarker = marker_all;
    }
    else if  (eventLayer.name === votation_names[1]) {        
        currentVotation_layer = 1;
        currentVotation = geojson_economic;
		currentMarker = marker_economic;
		}
    else if  (eventLayer.name === votation_names[2]) {
        currentVotation_layer = 2;
        currentVotation = geojson_education;
		currentMarker = marker_education;
    }
    else if  (eventLayer.name === votation_names[3]) {
		currentVotation_layer = 3;
        currentVotation = geojson_environment;
		currentMarker = marker_environment;
    }
    else if  (eventLayer.name === votation_names[4]) {
		currentVotation_layer = 4;
        currentVotation = geojson_immigration;
		currentMarker = marker_immigration;
    }
    else if  (eventLayer.name === votation_names[5]) {
		currentVotation_layer = 5;
        currentVotation = geojson_health;
		currentMarker = marker_health;
    }
    else if  (eventLayer.name === votation_names[6]) {
		currentVotation_layer = 6;
        currentVotation = geojson_security;
		currentMarker = marker_security;
    }
    else if  (eventLayer.name === votation_names[7]) {
		currentVotation_layer = 7;
        currentVotation = geojson_social;
		currentMarker = marker_social;
    }
    else if  (eventLayer.name === votation_names[8]) {
		currentVotation_layer = 8;
        currentVotation = geojson_work;
		currentMarker = marker_work;
    }
	for (i = 0; i < currentMarker.length; i++) {
		currentMarker[i].addTo(map);
	}	
});

// ---------------------------------------------------------------------------------------------------------------------
// DEFINE BASE AND OVERLAY LAYERS FOR INTERACTIVE DISPLAY
// ---------------------------------------------------------------------------------------------------------------------

var baseLayers = [light_base, streets_base, outdoor_base, satellite_base];

var overlays = {
    "Living space":geojson0,
    "Foreigner":geojson1,
    "Crude divorce":geojson2,
    "Social assistance rate":geojson3,
    "Graduation":geojson4,
    "German language":geojson5
};
var votation = {
  'All': geojson_all_votation,
    'Economic': geojson_economic,
    'Education': geojson_education,
    'Environment': geojson_environment,
    'Immigration': geojson_immigration,
    'Health': geojson_health,
    'Security': geojson_security,
    'Social': geojson_social,
    'Work': geojson_work
};


// ---------------------------------------------------------------------------------------------------------------------
// CONTROLS FOR LAYER DISPLAY
// ---------------------------------------------------------------------------------------------------------------------

var control_overlay = L.control.layers(overlays, {}, {collapsed: false});
var control_votations = L.control.layers(votation, {}, {collapsed: false});
control_overlay.addTo(map);
control_votations.addTo(map);

map.addControl(L.control.basemaps({
    basemaps: baseLayers,
    position: 'bottomright',
    tileX: 0,  // tile X coordinate
    tileY: 0,  // tile Y coordinate
    tileZ: 1   // tile zoom level
}));
