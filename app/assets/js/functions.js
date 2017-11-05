// Charolotte Hotels Reservations
// Felipe Vegners - RV Front-End Test 2017, Nov.
// felipevegners@gmail.com
// Plugins used: Star-Rating / Flatpickr

// App Funcitons


// Disabling Search Hotels Button

$(".searchHotels").prop('disabled', true);

// Setting the calendar plugin 'Flatpickr' and put dates in fields

$("#calendarContainer").flatpickr({
  minDate: "today",
  inline: true,
  mode: "range",
  dateFormat: "Y-m-d",
  onChange: function(dateObj, dateStr, selectedDates, instance) {

    checkInOutDate = dateStr.split('/');


    if (dateObj.length == 1) {
      $('#checkIn').text(checkInOutDate[0]);
      $('#dateStart').text(checkInOutDate[0]);
    }
    if (dateObj.length == 2) {
      $('#checkOut').text(checkInOutDate[1]);
      $('#dateEnd').text(checkInOutDate[1] + ':');

      // Enabling Search Hotels Button after select two dates
      $(".searchHotels").prop('disabled', false);
    }

    date1 = checkInOutDate[0];
    date2 = checkInOutDate[1];

  },

  onReady: function(dateObj, dateStr, instance) {
    var $cal = $(instance.calendarContainer);
    $('.newDates').on('click', function() {
      instance.clear();
      instance.close();
      $('#checkIn').text('Choose a date');
      $('#checkOut').text('Choose a date');
    });

  }

}); /// end calendar


// API - Loading JSON and append data into HTML on button "Search Hotels" click

$(".searchHotels").on('click', function() {

  $("#hotelList").html('');

  $(".resultsSection").fadeIn();

  $('html, body').animate({
    scrollTop: $(".resultsSection").offset().top
  }, 650);

  //Get JSON Data
  $.getJSON('http://www.raphaelfabeni.com.br/rv/hotels.json', function(data) {

    // Sorting the results by price from lowest to highest

    function sortByPrice(a,b){
      return a.price > b.price ? 1 : -1;
    }

    var hotelList = $(data.hotels).sort(sortByPrice);

    //starting loop trough results
    $.each(hotelList, function(k, v) {

      //Stars rating template
      var span = '<span id="hotelStars" class="fa fa-star starRating-' + this.rate + '"></span>';

      var months = '';

      $(this.price_history).each(function() {

        months += '<p>' + this.month + '</p>';

      });

      // Price history modal template

      var chartBars = '';

      //Price history loop for modal

      // List results in priceBar
      $(this.price_history).each(function() {

        chartBars += '<div class="priceBar ' + this.month + '" data-tooltip="$' + this.value + '" style="height: ' + this.value / 8 + '%;"></div>';

      });

      // Getting dates to calculate stay dates
      var dayIn = parseInt(date1.replace(/^\D+|\D.*$/g, ""), 10);
      var dayOut = parseInt(date2.replace(/^\D+|\D.*$/g, ""), 10);
      var calcDays = dayOut - dayIn + 1;

      // Hotel Results Template
      var html =
        '<article id="hotelInfo" class="hotelInfoWrapper" data-rating="' + this['rate'] + '" data-price="' + this['price'] + '">' +
        '<div class="imgCtn"><img src="' + this['image'] + '" alt=""></div>' +
        '<div class="hotelInfo">' +
        span +
        '<h1>' + this['name'] + '</h1>' +
        '<p>' + this['description'] + '</p>' +
        '<button class="bookNow">Book now</button>' +
        '<button value="' + k + '" class="priceHistory">Price history</button>' +
        '</div>' +
        '<div class="hotelPrice">' +
        '<small>Total for ' + calcDays + ' nights</small>' +
        '<h2 class="price">$' + parseFloat(this['price'] * calcDays).toFixed(2).toString() + '</h2>' +
        '</div>' +
        '<div id="modal_' + k + '" class="modalCtn">' +
        '<div class="modalWrapper">' +
        '<div class="modalTextWrapper">' +
        '<h2>Price History for 2017</h2>' +
        '<span class="backDescription"></span>' +
        '</div>' +
        '<div class="chartWrapper">' + chartBars + '</div>' +
        '<div class="months">' + months + '</div>'
      '</article>';

      // Button price history to trigger every modal

      $("#hotelList").on('click', '.priceHistory', function(event) {
        $("#modal_" + $(this).prop('value')).show("slide", {
          direction: "left"
        }, 300);
      });

      //Append the html template variable to hotel list


      $(html).hide().appendTo("#hotelList").fadeIn(400);


    }); //End Loop

    //Function to close modal
    $(".backDescription").on("click", function(event) {
      $(event.target).closest(".modalCtn").hide("slide", {
        direction: "left"
      }, 300);
    });
  }); //End Ajax
}); //End Button Search Hotels Event


// Setting star rating filter

$(".starRating").rating(function(vote, event) {


  $("#hotelList  article").each(function() {

    // Put the data-rating elements in variabels
    var hotelRate = $(this).attr("data-rating");

    var hotelsIn = $("#hotelList  article").filter(function() {
      return $(this).attr("data-rating") == vote;
    });

    var hotelsOut = $("#hotelList  article").filter(function() {
      return $(this).attr("data-rating") != vote;
    });

    // Check hotel rate with the selected star
    if (vote == hotelRate) {
      // Then show results with the selected stars
      hotelsOut.fadeOut(300);
      hotelsIn.fadeIn(300);

    }
    // Check in results if the selected star return any result
    if (hotelsIn.length == 0) {
      // If won't show modal
      $(".sorryModal p").text('Sorry, there\'s 0 hotels with ' + vote + ' star rating.');

      $(".sorryModal").animate({
        top: '0',
        opacity: 1
      }, 450);
      $(".sorryModal").delay(4000).animate({
        top: '-=100%',
        opacity: 0
      }, 650);
      return false;
    }


  });
});

// Setting slider to filter by price and show in real time the values

function filterByPrice(minPrice, maxPrice) {
  $("#hotelList  article").fadeOut().filter(function() {
    var price = parseInt($(this).attr("data-price"), 10);
    return price >= minPrice && price <= maxPrice;
  }).fadeIn();

}

// Setting filter by slider position in range

$("#sliderRange").slider({
  range: true,
  min: 100,
  max: 600,
  step: 10,
  values: [100, 600],
  slide: function(event, ui) {
    var min = ui.values[0],
      max = ui.values[1];
    $("#lowPrice").val("$" + ui.values[0]);
    $("#highPrice").val("$" + ui.values[1]);
  },
  stop: function(event, ui) {
    min = $("#sliderRange").slider("values", 0);
    max = $("#sliderRange").slider("values", 1);
    filterByPrice(min, max);
  }
});
