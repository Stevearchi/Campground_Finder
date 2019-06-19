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



  var parkName = $("#location")
    .val()
    .trim();

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
    for (var i = 0; i < campResults.length; i++) {
      $("#display-campsites").show();
      var campgroundName = campResults[i].name;
      campgroundName = campgroundName.replace(/\s+/g, '-');
      var campgroundDescription = campResults[i].description;
      var campgroundInfoUrl = campResults[i].regulationsurl;
      var campgroundDirections = campResults[i].directionsUrl;
      //
      var informationButton = $("<a href='https://www.nps.gov/zion/planyourvisit/" + campgroundName +".htm' target='_blank'> Information </a>").addClass("btn btn-primary");
      // south-campground.htm
      // " + campgroundInfoUrl + " target='_blank'> Information </a>").addClass("btn btn-primary");
      //
      var directionsButton = $("<a href=" + campgroundDirections + " target='_blank'> Directions </a>").addClass("btn btn-primary");
      var campsite = $("<div>").addClass("ajaxResponse col-md-12 border-bottom border-primary");
      campsite.append("<h2>" + campgroundName + "</h2>")
      campsite.append("<p>"  + campgroundDescription + "</p>");
      campsite.append(directionsButton, informationButton);
      $("#append-here").append(campsite);
    }
    // append these divs to soon to be created row
  });
}

$("#reset").on("click", function() {
  $("#append-here").empty();
  $("input").val("");
  $("#display-campsites").hide();
  
});



function getWeather(parkLatLong) {

  var latLongArray = parkLatLong.split(/[:,]+/g);

  var startDate = $('#start-date').val().trim();
  var startMoment = moment(startDate, 'YYYY-MM-DD');

  var endDate = $('#end-date').val().trim();
  var endMoment = moment(endDate, 'YYYY-MM-DD');
  startMoment.format('MM/DD/YYYY');
  endMoment.format('MM/DD/YYYY');
  var dateRange = endMoment.diff(startMoment, 'days');
  var latLongString = '/' + latLongArray[1] + "," + latLongArray[3];
  var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
  var weatherUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkskyKey + latLongString;

  // clear out values
  //$('#location').val('');
  for(var i = 0; i < dateRange +1; i++){
    console.log(startMoment.add(i, 'days').format('X'))//.calendar());
    
   // console.log(startMoment.clone().add(i, 'days'))
    $.ajax({
      method: 'GET',
      url: weatherUrl + ',' + startMoment.add(i, 'days').format('X')
    }).then(function (response) {
      var high = response.daily.data[0].temperatureHigh;
      var low = response.daily.data[0].temperatureLow;
      var precip = response.daily.data[0].precipProbability;
      var wind = response.daily.data[0].windSpeed;
      
    });
    startMoment.subtract(i, 'days');
  }
}
