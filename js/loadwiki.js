//This part is to connect the MediaWiki to get the details information.
//There are two parts of subject.
var places = ['Los Angeles', 'University Of Southern California'];
for (var i = 0; i < places.length; i++) {
	loadData(places[i]);
}
//loadData function use .ajax() from jQuery, and set the success function to add link in the html.
function loadData(PlaceStr) {
	var $wikiElem = $('#wikipedia-links');
	$wikiElem.text("");
	//timeout is a error check mechanism when we can not reach the right article within 8 seconds.
	//Error check use timeout function
	var wikiRequestTimeout = setTimeout(function(){
		$wikiElem.text("Failed to load wikipedia resources");
	}, 8000);

	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + PlaceStr + '&format=json&callback=wikiCallback';
	$.ajax({
		url: wikiUrl,
		dataType: "jsonp",
		success: function( response ) {
			var articleList = response[1];

			for (var i = 0; i < articleList.length; i++) {
				articleStr = articleList[i];
				var url = 'http://en.wikipedia.org/wiki/' + articleStr;
				$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
			};
			clearTimeout(wikiRequestTimeout);
		}
	});
}