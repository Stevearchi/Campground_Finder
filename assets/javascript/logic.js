var amenitiesArray = [];
$("#display-campsites").hide();
$(".custom-control-input").on("click", function () {
 // console.log($(this).attr("data-check"));
  if ($(this).attr("data-check") === "false") {
    $(this).attr("data-check", "true");
  } else {
    $(this).attr("data-check", "false");
  }
});
var parkCode;
var parkLatLong;


$("#submit").on("click", function (event) {
  event.preventDefault();
  //console.log('in on submit');

  // var amenitiesArray = [];
  if ($("#showers").attr("data-check") === "true") {
    amenitiesArray.push($("#showers").attr("id"));
  }
  if ($("#toilets").attr("data-check") === "true") {
    amenitiesArray.push($("#toilets").attr("id"));
  }
  if ($("#trash").attr("data-check") === "true") {
    amenitiesArray.push($("#trash").attr("id"));
  }
  if ($("#foodStorage").attr("data-check") === "true") {
    amenitiesArray.push($("#foodStorage").attr("id"));
  }
  if ($("#water").attr("data-check") === "true") {
    amenitiesArray.push($("#water").attr("id"));
  }
  if ($("#firewood").attr("data-check") === "true") {
    amenitiesArray.push($("#firewood").attr("id"));
  }
  var parkName = $('#location').val().trim();
  var parkUrl =
    "https://developer.nps.gov/api/v1/parks?api_key=IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ&q=" +
    parkName;
  $.ajax({
    url: parkUrl,
    method: "GET"
  }).then(function (response) {
    var parkResults = response.data[0];
    parkCode = parkResults.parkCode;
    parkLatLong = parkResults.latLong;
    campground();
    getWeather(parkLatLong);
  })

});

function campground() {
  //console.log('in campground');

  var campgroundUrl =
    "https://developer.nps.gov/api/v1/campgrounds?api_key=IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ&parkCode=" +
    parkCode;

  $.ajax({
    url: campgroundUrl,
    method: "GET"
  }).then(function (response) {
    var campResults = response.data;
    //console.log(campResults);

    //console.log(campResults.length);
    for (var i = 0; i < campResults.length; i++) {
      var campgroundName = campResults[i].name;
      var campgroundDescription = campResults[i].description;
      var campgroundInfoUrl = campResults[i].regulationsurl;
      var campgroundDirections = campResults[i].directionsUrl;
      $("#display-campsites").show();
      var informationButton = $("<a href=" + campgroundInfoUrl + " target='_blank'> Information </a>").addClass("btn btn-primary");
      var directionsButton = $("<a href=" + campgroundDirections + " target='_blank'> Directions </a>").addClass("btn btn-primary");
      var campsite = $("<div>").addClass("ajaxResponse col-md-12 border-bottom border-primary");
      campsite.append("<h2>" + campgroundName + "</h2>")
      campsite.append("<p> Brief campground description: " + campgroundDescription + "</p>");
      campsite.append(directionsButton, informationButton);
      $("#append-here").append(campsite);
    }
    // append these divs to soon to be created row
  });
}




function getWeather(parkLatLong) {
  var latLongArray = parkLatLong.split(/[:,]+/g);
  var startDate = $('#start-date').val().trim();
  var startMoment = moment(startDate, 'MM/DD/YYYY');
  var endDate = $('#end-date').val().trim();
  var latLongString = '/' + latLongArray[1] + "," + latLongArray[3];
  var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
  var weatherUrl = "https://api.darksky.net/forecast/" + darkskyKey + latLongString;
  console.log(weatherUrl)
  // clear out values
  //$('#location').val('');
  $.ajax({
    method: 'GET',
    url: weatherUrl
  }).then(function (response) {

  });
}