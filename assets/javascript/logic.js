// Initially hide divs where campground and weather info will be dynamically populated
window.onload = function() {
  $("#display-campsites").hide();
  $(".weather-header").hide();
};

// Declaring amenities array
var amenitiesArray = [];

// Twitter Typeahead autocomplete functionality:
$(document).ready(function(){
  // Defining the local dataset
    var parks = ["Acadia National Park", "National Park of American Samoa", "Arches National Park", "Badlands National Park", "Big Bend National Park", "Biscayne National Park", "Black Canyon of the Gunnison National Park", "Bryce Canyon National Park", "Canyonlands National Park", "Capitol Reef National Park", "Carlsbad Caverns National Park", "Channel Islands National Park", "Congaree National Park", "Crater Lake National Park", "Cuyahoga Valley National Park", "Death Valley National Park", "Denali National Park", "Dry Tortugas National Park", "Everglades National Park", "Gates of the Arctic National Park", "Glacier National Park", "Glacier Bay National Park", "Grand Canyon National Park", "Grand Teton National Park", "Great Basin National Park", "Great Sand Dunes National Park", "Great Smoky Mountains National Park", "Guadalupe Mountains National Park", "Haleakala National Park", "Hawaii Volcanoes National Park", "Hot Springs National Park", "Isle Royale National Park", "Joshua Tree National Park", "Katmai National Park and Preserve", "Kenai Fjords National Park", "Kings Canyon National Park", "Kobuk Valley National Park", "Lake Clark National Park and Preserve", "Lassen Volcanic National Park", "Mammoth Cave National Park", "Mesa Verde National Park", "Mount Rainier National Park", "North Cascades National Park", "Olympic National Park", "Petrified Forest National Park", "Pinnacles National Park", "Redwood National and State Parks", "Rocky Mountain National Park", "Saguaro National Park", "Sequoia National Park", "Shenandoah National Park", "Theodore Roosevelt National Park", "Virgin Islands National Park", "Voyageurs National Park", "Wind Cave National Park", "Wrangell-St. Elias National Park", "Yellowstone National Park", "Yosemite National Park", "Zion National Park"];

  // Constructing the suggestion engine
    var parks = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: parks
  });
  // Initializing the typeahead
  $("#location").typeahead({
      hint: true,
      highlight: true, /* Enable substring highlighting */
      minLength: 1 /* Specify minimum characters required for showing suggestions */
  },
  {
      name: 'parks',
      source: parks
  });
});

// Wiring up checkbox functionality in search form
$(".custom-control-input").on("click", function () {

  if ($(this).attr("data-check") === "false") {
    $(this).attr("data-check", "true");
  } else {
    $(this).attr("data-check", "false");
  }
});

// Declaring these variables globally
var parkCode;
var parkLatLong;


// When user clicks submit, their amenities selections will be pushed to amenitiesArray and their search location will be formatted such that the campground API and the weather API can use it
$("#submit").on("click", function(event) {
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
  }).then(function(response) {
    var parkResults = response.data[0];
    parkCode = parkResults.parkCode;
    parkLatLong = parkResults.latLong;
    campground();
    getWeather(parkLatLong);
  });
});

// Function to both get and display campgrounds meeting the search parameters
function campground() {

  var campgroundUrl =
    "https://developer.nps.gov/api/v1/campgrounds?api_key=IvDm5VJctJF8OHMsxVyrHXjVShQNgrTwYSbzQrYJ&parkCode=" +
    parkCode;

  $.ajax({
    url: campgroundUrl,
    method: "GET"
  }).then(function(response) {
    $("#append-here").empty();
    var campResults = response.data;
    if (campResults.length === 0) {
      $("#display-campsites").show()
      var errorDiv = $("<div class='col-md-12' id='error-message'>");
        errorDiv.append(
          "<h3 class='row container-fluid bg-light text-primary text-center mx-auto justify-content-center border border-right-0 border-left-0 border-primary rounded'> Sorry, there are no campgrounds in this park. Please search again. </h3>"
        );
        $("#append-here").append(errorDiv);
        return;
    }
    console.log(campResults);
    for (var i = 0; i < campResults.length; i++) {
      $("#display-campsites").show();

      var campgroundName = campResults[i].name;
      var campgroundNameUrl = campgroundName.replace(/\s+/g, "").toLowerCase();
      var campgroundDescription = campResults[i].description;
      var campgroundInfoUrl = campResults[i].regulationsurl;
      var campgroundDirections = campResults[i].directionsUrl;

      // This variable stores the result of the checkAmenities function as a Boolean
      var shouldDisplay = checkAmenities(campResults[i]);

      // Logic to only print campgroud results to page in specific scenarios
      if (shouldDisplay == true) {
        if (campgroundInfoUrl === "") {
          var informationButton = $(
            "<a id='dynamic-button' href='https://www.nps.gov/" +
              parkCode +
              "/planyourvisit/index.htm' target='_blank'> Information </a>"
          ).addClass("btn btn-primary");
        } else {
          informationButton = $(
            "<a id='dynamic-button' href=" +
              campgroundInfoUrl +
              " target='_blank'> Information </a>"
          ).addClass("btn btn-primary");
        }
        if (campgroundDirections === "") {
          var directionsButton = $(
            "<a id='dynamic-button' href='https://www.nps.gov/" +
              parkCode +
              "/planyourvisit/directions.htm' target='_blank'> Directions </a>"
          ).addClass("btn btn-primary");
        } else {
          directionsButton = $(
            "<a id='dynamic-button' href=" +
              campgroundDirections +
              " target='_blank'> Directions </a>"
          ).addClass("btn btn-primary");
        }
        var campsite = $("<div>").addClass("ajaxResponse col-md-12");
        campsite.append(
          "<h3 class='row container-fluid bg-light text-primary mx-auto justify-content-center border border-right-0 border-left-0 border-primary rounded'>" +
            campgroundName +
            "</h3>"
        );
        campsite.append("<p id='dynamic-p'>" + campgroundDescription + "</p>");
        campsite.append(directionsButton, informationButton);
        $("#append-here").append(campsite);

      } else if (shouldDisplay == false) {
        var errorDiv = $("<div class='col-md-12' id='error-message'>");
        errorDiv.append(
          "<h3 class='row container-fluid bg-light text-primary text-center mx-auto justify-content-center border border-right-0 border-left-0 border-primary rounded'> Sorry, no campgrounds match your parameters.  Please search again. </h3>"
        );
        $("#append-here").append(errorDiv);
        return;
      }
    }
  });
}

// This function takes campResults[i], defined as campGroundObject, and confirms that BOTH the amenitiesArray AND the campResults array include the user's search parameters. If they don't BOTH include a chosen amenity then this will return false and filter that campground out.
function checkAmenities(campGroundObject) {
  if (
    amenitiesArray.includes("showers") &&
    !campGroundObject.amenities.showers[0]
      .toLowerCase()
      .includes("yes - seasonal") &&
    (amenitiesArray.includes("showers") &&
      !campGroundObject.amenities.showers[0]
        .toLowerCase()
        .includes("yes - year round"))
  ) {
    return false;
  }

  if (
    amenitiesArray.includes("toilets") &&
    !campGroundObject.amenities.toilets[0]
      .toLowerCase()
      .includes("flush toilets - seasonal") &&
    (amenitiesArray.includes("toilets") &&
      !campGroundObject.amenities.toilets[0]
        .toLowerCase()
        .includes("flush toilets - year round")) &&
    (amenitiesArray.includes("toilets") &&
      !campGroundObject.amenities.toilets[0]
        .toLowerCase()
        .includes("vault toilets - year round")) && (amenitiesArray.includes("toilets") &&
        !campGroundObject.amenities.toilets[0]
          .toLowerCase()
          .includes("portable toilets - seasonal"))
  ) {
    return false;
  }

  if (
    amenitiesArray.includes("trash") &&
    !campGroundObject.amenities.trashrecyclingcollection.includes("Yes")
  ) {
    return false;
  }
  if (
    amenitiesArray.includes("foodStorage") &&
    !campGroundObject.amenities.foodstoragelockers.includes("Yes")
  ) {
    return false;
  }
  if (
    amenitiesArray.includes("water") &&
    !campGroundObject.amenities.potablewater[0]
      .toLowerCase()
      .includes("yes - seasonal") &&
    (amenitiesArray.includes("water") &&
      !campGroundObject.amenities.potablewater[0]
        .toLowerCase()
        .includes("yes - year round"))
  ) {
    return false;
  }
  if (
    amenitiesArray.includes("firewood") &&
    !campGroundObject.amenities.firewoodforsale.includes("Yes")
  ) {
    return false;
  } else {
    return true;
  }
};

// Reset button to clear current search results, form input fields/checkboxes, and empty amenitiesArray
$("#reset").on("click", function () {
  $("#append-here").empty();
  $("#append-weather-here").empty();
  $("input").val("");
  $("input[type=checkbox]").each(function() {
    this.checked = false;
  });
  $(".custom-control-input").attr("data-check", "false");
  $("#display-campsites").hide();
  $(".weather-header").hide();
  amenitiesArray = [];
});


// Function to get aspects of weather forecast for dates and location selected by user
function getWeather(parkLatLong) {
  var latLongArray = parkLatLong.split(/[:,]+/g);

  var startDate = $("#start-date")
    .val()
    .trim();
  var startMoment = moment(startDate, "YYYY-MM-DD");

  var endDate = $('#end-date').val().trim();
  var endMoment = moment(endDate, 'YYYY-MM-DD');
  // startMoment.format('MM/DD/YYYY');
  // endMoment.format('MM/DD/YYYY');
  var dateRange = endMoment.diff(startMoment, 'days');
  var latLongString = '/' + latLongArray[1] + "," + latLongArray[3];
  var darkskyKey = "24ad87e96d744bd3fb31284ccc8763a1"
  var weatherUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkskyKey + latLongString;
  var currentMoment = startMoment;
  // clear out values
  //$('#location').val('');
  currentMoment.subtract(7, 'days');
  for (var i = 0; i < dateRange + 1; i++) {
    currentMoment = startMoment;
    var ajaxMoment = startMoment;

    $.ajax({
      method: 'GET',
      url: weatherUrl + ',' + ajaxMoment.add(i, 'days').format('X')
    }).then(function (response) {

      currentMoment.add(1, 'days');
      high = response.daily.data[0].temperatureHigh;
      low = response.daily.data[0].temperatureLow;
      precip = response.daily.data[0].precipProbability;
      wind = response.daily.data[0].windSpeed;
    
      renderWeather(currentMoment, high, low, precip, wind);
    
    }); // .then

    // startMoment.subtract(i, 'days');
  }
}


// Function to display weather data on page
function renderWeather(currentMoment, high, low, precip, wind) {
  
  ulHigh = $("<li>").text('Hi: ' + Math.round(high) + '°');
  ulLow = $("<li>").text('Lo: ' + Math.round(low) + '°');
  ulPrecip = $("<li>").text('Precip: ' + Math.round(precip * 100) + '%');
  ulWind = $("<li>").text('Wind: ' + wind + ' MPH');
  var nestedCol = $("<div>").addClass("col-md-6 border border-primary weather");
  var nesteddiv = $('<div>').addClass('row text-primary text-center');
  var nested2ndcol = $('<div>').addClass('col-md-12 bg-white border-bottom border-primary');

 
  var nestedP = $("<p><strong>" + currentMoment.format('MM/DD') + "</strong></p>")

  var weatherdiv = $("<div>").addClass("row weather");
  var weather2nddiv = $("<div>").addClass('col-md-12');
  var list = $("<ul>");


  weatherdiv.append(weather2nddiv)
  nestedP.append(weatherdiv)
  nested2ndcol.append(nestedP)
  nesteddiv.append(nested2ndcol)
  nestedCol.append(nesteddiv)
  list.append(ulHigh)
  list.append(ulLow)
  list.append(ulPrecip)
  list.append(ulWind)
  weather2nddiv.append(list)
  $("#append-weather-here").append(nestedCol);
  $(".weather-header").show();
}

// Datepicker to allow only current and future date selections by user
var today = new Date();
var month = today.getMonth() + 1;
var day = today.getDate();
var year = today.getFullYear();
if (month < 10) month = "0" + month.toString();
if (day < 10) day = "0" + day.toString();

var minDate = year + "-" + month + "-" + day;
$(".date").attr("min", minDate);