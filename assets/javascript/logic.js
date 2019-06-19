// Initially hide div where campsite info will be dynamically populated
window.onload = function() {  
  $("#display-campsites").hide();
  $(".weather-header").hide();
};

// User selections will be pushed to this array
var amenitiesArray = [];

// Wiring up checkboxes in search form
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


// When user clicks submit, their amenities selections will be pushed to amenitiesArray and their search location will be formatted such that the campground API can use it
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

// Function to get and display campgrounds meeting the search parameters
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

      // This variable stores the result of the checkAmenities function, which will be a true or false (Boolean)
      var shouldDisplay = checkAmenities(campResults[i]);
      //
      var informationButton = $("<a href='https://www.nps.gov/zion/planyourvisit/" + campgroundName +".htm' target='_blank'> Information </a>").addClass("btn btn-primary");
      // south-campground.htm
      // " + campgroundInfoUrl + " target='_blank'> Information </a>").addClass("btn btn-primary");
      //
      if (shouldDisplay == true) {
        var directionsButton = $("<a id='dynamic-button' href=" + campgroundDirections + " target='_blank'> Directions </a>").addClass("btn btn-primary");
        var campsite = $("<div>").addClass("ajaxResponse col-md-12");
        campsite.append("<h3 class='row container-fluid bg-light text-primary mx-auto justify-content-center border border-right-0 border-left-0 border-primary rounded'>" + campgroundName + "</h3>")
        campsite.append("<p id='dynamic-p'>"  + campgroundDescription + "</p>");
        campsite.append(directionsButton, informationButton);
        $("#append-here").append(campsite);
      }
    } console.log(response);
  });
}

// This function takes campResults[i] defined as campGroundObject and confirms that both the amenitiesArray and the campResults array include the user's search parameters. If they don't BOTH include a chosen amenity then this will return false and filter that campground out.
function checkAmenities(campGroundObject) {
  if (amenitiesArray.includes("showers") && !campGroundObject.amenities.showers.includes("Yes - seasonal") || !campGroundObject.amenities.showers.includes("Yes - year round")) {
    return false;
  }
  if (amenitiesArray.includes("toilets") && !campGroundObject.amenities.toilets.includes("Flush toilets - seasonal") || !campGroundObject.amenities.toilets.includes("Flush toilets - year round") || !campGroundObject.amenities.toilets.includes("Vault toilets - year round")) {
    return false;
  }
  if (amenitiesArray.includes("trash") && !campGroundObject.amenities.trashrecyclingcollection.includes("Yes")) {
    return false;
  }
  if (amenitiesArray.includes("foodStorage") && !campGroundObject.amenities.foodstoragelockers.includes("Yes")) {
    return false;
  }
  if (amenitiesArray.includes("water") && !campGroundObject.amenities.potablewater.includes("Yes - seasonal") || !campGroundObject.amenities.potablewater.includes("Yes - year round")) {
    return false;
  }
  if (amenitiesArray.includes("firewood") && !campGroundObject.amenities.firewoodforsale.includes("Yes")) {
    return false;
  }
}

// Reset button to clear current search results and form input fields/checkboxes
$("#reset").on("click", function() {
  $("#append-here").empty();
  $("input").val("");
  $('input[type=checkbox]').each(function() { 
      this.checked = false; 
  }); 
  $(".custom-control-input").attr("data-check", "false");
  $("#display-campsites").hide();
  
});


// Function to get and display aspects of weather forecast for dates selected by user
function getWeather(parkLatLong) {

  var latLongArray = parkLatLong.split(/[:,]+/g);
  var startDate = $('#start-date').val().trim();

  var startMoment = moment(startDate, 'YYYY-DD-MM');

  var endDate = $('#end-date').val().trim();
  var endMoment = moment(endDate, 'YYYY-DD-MM');

  var dateRange = startMoment.diff(endMoment, 'days')
  var latLongString = '/' + latLongArray[1] + "," + latLongArray[3];
  var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
  var weatherUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkskyKey + latLongString;
 console.log(dateRange)
  // clear out values
  //$('#location').val('');
  for(var i = 0; i < dateRange; i++){

    $.ajax({
      method: 'GET',
      url: weatherUrl
    }).then(function (response) {
      var high = response.daily.data[0].temperatureHigh;
      var low = response.daily.data[0].temperatureLow;
      var precip = response.daily.data[0].precipProbability;
      var wind = response.daily.data[0].windSpeed;
      
      // $(".weather-header").show();
      // var forecast = $("<div ")

      // $("#append-weather-here").append("");

    });
  }
}


// Datepicker to allow only current and future date selections by user //
var today = new Date();
var month = today.getMonth() + 1;
var day = today.getDate();
var year = today.getFullYear();
if(month < 10)
   month = '0' + month.toString();
if(day < 10)
   day = '0' + day.toString();

var minDate = year + '-' + month + '-' + day;
$(".date").attr("min", minDate);