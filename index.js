
//Styling
var LineColour = ['#ff3503','#0ff0fc', '#01f9c6', '#fc74fd', '#ccff02', '#ff9933', '#39ff14', '#7af9ab', '#ffb3de', '#ff4040', '#eddd59', '#005f7a' ]
var suburbStyle = { 
    "color": "#000000",
    "fillColor": "#af6060",
    "weight": 1,
    "lineWidth": '2'
}
var visitedStyle = { 
    "color": "#000000",
    "fillColor": '#c8c8e4',
    "weight": 1,
    "lineWidth": '1'
}

//The map
var map = L.map('map').setView([-33.818553,150.894488], 11);
map.invalidateSize();
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

//All The Suburbs
var geojsonLayer = new L.GeoJSON.AJAX("sydneydata.json", {style: suburbStyle, onEachFeature: onEachFeature});
geojsonLayer.addTo(map);
geojsonLayer.bringToBack()

//Visited Suburbs
var geojsonLayer = new L.GeoJSON.AJAX("visited.json", {style: visitedStyle});
geojsonLayer.addTo(map);
geojsonLayer.bringToBack()

// cycling trips

var GPXs = ['gpx/2021_01_24.gpx', 'gpx/2021_01_31.gpx', 'gpx/2021_02_02.gpx'];
GPXs.forEach(doTheRender);

function doTheRender(item, index) {
    var ColourMonth = item.substring(9, 11);
    var polyColour = LineColour[parseInt(ColourMonth) - 1]; 
    var gpxdraw = item; 
new L.GPX(gpxdraw, {
    async: true,
    marker_options: {
        startIconUrl: 'img/icon.png',
        endIconUrl: 'img/icon.png',
        shadowUrl: 'img/icon.png'
    },
    polyline_options: {
        color: polyColour,
        opacity: 0.75,
        weight: 3,
        lineCap: 'butt',
        lineWidth: '7'
    }
}).on('loaded', function(e) {

}).addTo(map)
}

//Bicycle loading screen

$(window).on('load', function() {
    $("#cover").fadeOut(200);
});



//Pop up function

function onEachFeature(feature, layer) {
    var wikibox = '<a href="https://en.wikipedia.org/wiki/'+feature.id+',_New_South_Wales">'+feature.id+'</a>' ;
    var popupContent = wikibox
    // console.log(wikibox)
    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }
    layer.bindPopup(popupContent);
}

