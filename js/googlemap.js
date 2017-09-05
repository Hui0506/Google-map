//This the main part of google map setting.
var map;
var markers = [];
var search_place_marker = [];
var googlemapTimeout = setTimeout(function() {
	$('#map').append("<div>Can not find the map resource</div>");
	}, 8000);

//This array stores the title and location of the listing six places.
var my_favo_pla = [
{title: 'University of Southern California', location: {lat: 34.0223519, lng: -118.285117}},
{title: 'Santa Monica', location: {lat: 34.0194543, lng: -118.4911912}},
{title: 'Hollywood', location: {lat: 34.0928092, lng: -118.3286614}},
{title: 'Universal Studios', location: {lat: 34.13811680000001, lng: -118.3533783}},
{title: 'Chinatown', location: {lat: 34.0623339, lng: -118.2383309}},
{title: 'Griffith Observatory', location: {lat: 34.1184341, lng: -118.3003935}}
	];

//This function is used to set the map, show markers and streetview.
function initMap(){
	//set the map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 34.0320157, lng: -118.2882069},
		zoom: 13,
		mapTypeControl: false
	});
	clearTimeout(googlemapTimeout);

	//creat the search box to search typing place
	var searchBox = new google.maps.places.SearchBox(document.getElementById('input-places'))
	searchBox.setBounds(map.getBounds());

	setMarkers();
	//set marker if one of the place in the left list is clicked, clear the markier if the clear button is clicked
	setSingleMarker(my_favo_pla[0], document.getElementById("place0"), document.getElementById("clear0"));
	setSingleMarker(my_favo_pla[1], document.getElementById("place1"), document.getElementById("clear1"));
	setSingleMarker(my_favo_pla[2], document.getElementById("place2"), document.getElementById("clear2"));
	setSingleMarker(my_favo_pla[3], document.getElementById("place3"), document.getElementById("clear3"));
	setSingleMarker(my_favo_pla[4], document.getElementById("place4"), document.getElementById("clear4"));
	setSingleMarker(my_favo_pla[5], document.getElementById("place5"), document.getElementById("clear5"));

	//change the color if the button is mouseover or mouseout
	document.getElementById('search-places').addEventListener('click', textPlaces);
	
	document.getElementById('show-place').addEventListener('click', showMarkers);
	document.getElementById('show-place').addEventListener('mouseover', function(){
		document.getElementById('show-place').style.backgroundColor = '#AAAAAA';
	});
	document.getElementById('show-place').addEventListener('mouseout', function(){
		document.getElementById('show-place').style.backgroundColor = '#5E5E5E';
	});
	document.getElementById('hide-place').addEventListener('click', function() {
		hideMarkers(markers);
	});
	document.getElementById('hide-place').addEventListener('mouseover', function() {
		document.getElementById('hide-place').style.backgroundColor = '#AAAAAA';
	});
	document.getElementById('hide-place').addEventListener('mouseout', function() {
		document.getElementById('hide-place').style.backgroundColor = '#5E5E5E';
	});
	document.getElementById('search-places').addEventListener('mouseover', function(){
		document.getElementById('search-places').style.backgroundColor = '#AAAAAA';
	});
	document.getElementById('search-places').addEventListener('mouseout', function(){
		document.getElementById('search-places').style.backgroundColor = '#5E5E5E';
	});

}

//Change the marker style when a cursor is moved on.
function MarkerMaker(markercolor, sizew, sizeh, ancf, ancl) {
	var makimg = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markercolor + '|40|_|%E2%80%A2',
      new google.maps.Size(sizew, sizeh),
      new google.maps.Point(0, 0),
      new google.maps.Point(ancf, ancl),
      new google.maps.Size(sizew, sizeh));
    return makimg;
}

//set the single marker when one of the place in the left list is chosen and clear the marker when the clear button is clicked.
function setSingleMarker(singlePla, element1, element2) {

	var marker = new google.maps.Marker({
		position: singlePla.location,
		title: singlePla.title,
		icon: MarkerMaker('FFFF00', 23, 40, 15, 40)
	});

	var bounds = new google.maps.LatLngBounds();

	element1.addEventListener('click', function() {
		marker.setAnimation(google.maps.Animation.DROP);
		marker.setMap(map);
		bounds.extend(marker.position);
		map.fitBounds(bounds);
		map.setZoom(12);
	});
	element1.addEventListener('mouseover', function(){
		element1.style.backgroundColor = '#AAAAAA';
	});
	element1.addEventListener('mouseout', function(){
		element1.style.backgroundColor = '#5E5E5E';
	});
	element2.addEventListener('click', function(){
		marker.setMap(null);
	});
	element2.addEventListener('mouseover', function(){
		element2.style.backgroundColor = '#AAAAAA';
	});
	element2.addEventListener('mouseout', function(){
		element2.style.backgroundColor = '#5E5E5E';
	});		

	var infowindow = new google.maps.InfoWindow();

	marker.addListener('click', function() {
		populateInfoWindow(this, infowindow);
	});
	marker.addListener('mouseover', function() {
		this.setIcon(MarkerMaker('EE9611', 31, 51, 10, 41));
	});
	marker.addListener('mouseout', function() {
		this.setIcon(MarkerMaker('FFFF00', 23, 40, 15, 40));
	});
}

//set the all markers when click show all markers and add the streetview when click the marker.
function setMarkers(){
	for (var i = 0; i < my_favo_pla.length; i++){
		var position = my_favo_pla[i].location;
		var title = my_favo_pla[i].title;

		var marker = new google.maps.Marker({
			position: position,
			title: title,
			icon: MarkerMaker('FFFF00', 23, 40, 15, 40)
		});
		markers.push(marker);

		var infowindow = new google.maps.InfoWindow();

		marker.addListener('click', function() {
			populateInfoWindow(this, infowindow);
		});
		marker.addListener('mouseover', function() {
			this.setIcon(MarkerMaker('EE9611', 31, 51, 10, 41));
		});
		marker.addListener('mouseout', function() {
			this.setIcon(MarkerMaker('FFFF00', 23, 40, 15, 40));
		});
	}
}
//Show all the markers generated in the above step.
function showMarkers() {

	var bounds = new google.maps.LatLngBounds();

	for (var i = 0; i < markers.length; i++) {
		markers[i].setAnimation(google.maps.Animation.DROP);
		markers[i].setMap(map);
		bounds.extend(markers[i].position);
	}
	map.fitBounds(bounds);
}
//Hide markers
function hideMarkers(marker_array) {
	for (var i = 0; i < marker_array.length; i++) {
		marker_array[i].setMap(null);
	}
}
//read the typing content in the search box and find the location. And set the marker.
function textPlaces() {
	hideMarkers(search_place_marker);
	var bounds = map.getBounds();
	var textSearchService = new google.maps.places.PlacesService(map);
	textSearchService.textSearch({
		query: document.getElementById('input-places').value,
		bounds: bounds
	}, function(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			createMarker(results);
		}
	});
}
//Create the marker of the place typing in the search box and get the inforwindow including detail information.
function createMarker(places) {
	var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < places.length; i++){
		var place = places[i];
		var marker = new google.maps.Marker({
			title: place.name,
			position: place.geometry.location,
			id: place.place_id
		});
		marker.setAnimation(google.maps.Animation.DROP);
		marker.setMap(map);
		search_place_marker.push(marker);
		var infowindow = new google.maps.InfoWindow();
		marker.addListener('click', function() {
			getPlaceDetails(this, infowindow);
		});
		if (place.geometry.viewport) {
			bounds.union(place.geometry.viewport);
		} else {
			bounds.extend(place.geometry.location);
		}
	}
	map.fitBounds(bounds);
}

//creat the inforwindong of the corresponding marker and open it when the click event happens.
function populateInfoWindow(marker, infowindow) {
	var street = new google.maps.StreetViewService();
	street.getPanoramaByLocation(marker.position, 50, function(data, status) {
		if (status == google.maps.StreetViewStatus.OK) {
		var Loc = data.location.latLng;
		var heading = google.maps.geometry.spherical.computeHeading(Loc, marker.position);
		infowindow.setContent('<div>'+marker.title+'</div><div id="pano"></div>');
		var panorama = new google.maps.StreetViewPanorama(
			document.getElementById('pano'), {
				position: Loc,
				pov: {
					heading: heading,
					pitch: 30
				}
			});
		}else {
			infowindow.setContent('<div>' + marker.title + '</div><div>No Street View Available</div>');
		}
	});
	infowindow.open(map, marker);
}
//Get place detail in the inforwindow.
function getPlaceDetails(marker, infowindow) {
	var service = new google.maps.places.PlacesService(map);
	service.getDetails({
		placeId: marker.id
	}, function(place, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			var innerHTML = '<div>';
			if (place.name) {
				innerHTML += '<strong>' + place.name + '</strong>';
			}
			if (place.formatted_address) {
				innerHTML += '<br>' + place.formatted_address;
			}
			if (place.website) {
				innerHTML += '<br>' + place.website; 
			}
			if (place.rating) {
				innerHTML += '<br>rating: ' + place.rating;
			}
			if (place.photos) {
				innerHTML += '<br><img src="' + place.photos[0].getUrl({maxHeight: 100, maxWidth: 200}) + '">';
			}
			innerHTML += '</div>';
			infowindow.setContent(innerHTML);
			infowindow.open(map, marker);
		} else {
			inforwindow.setContent('Sorry, we cannot find this place');
			inforwindow.open(map, marker);
		}
	});
}