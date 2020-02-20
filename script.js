let cityList = document.getElementById("city-list")
let search = document.getElementById("searchForm")
let icon;
let cities = [];
init()

// Grabbing and storing the data-animal property value from the button
//var cityList = $(this).attr("data-city");

let searchbtn = $("#form-control mr-sm-2").val();

let card = []

// let key = "be8970edab66a09fa656ce2ee581855a"

//create on click for search btn

$("#searchForm").on("submit", function (event) {
  event.preventDefault()
  let city = document.getElementById("searchCity").value
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=be8970edab66a09fa656ce2ee581855a&units=imperial"
  let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=be8970edab66a09fa656ce2ee581855a&units=imperial"
  //let uvIndex="http://api.openweathermap.org/data/2.5/uvi?appid="appid+lat"={lat}&lon={lon}"

  //console.log("it works")
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response)
    console.log(queryURL);
    console.log(JSON.stringify(response));
    console.log(response.main.temp);
    console.log(response.main.humidity);
    console.log(response.wind.speed);
    $("#currentCity").text(response.name);
    $("#currentTemp").text(response.main.temp);
    $("#currentHumidity").text(response.main.humidity);
    $("#currentWindSpeed").text(response.wind.speed);

  })

  $.ajax({
    url: queryURL2,
    method: "GET",
  }).then(function (response) {
    console.log(response)
    for (let i = 0; i < response.list.length; i++) {
      //console.log(response.list[i].dt)
      if (response.list[i].dt_txt.includes("09:00:00")) {
        console.log(response.list[i].main.temp);
        console.log(response.list[i].main.humidity);
        icon = response.list[i].weather[0].icon
        createIcon(icon);
        //$("#5DayForecast").append(response.main.humidity);

        //console.log(icon)
        //("#currentCity").append(response.list.length);
      }
    }
  })
  // $.ajax({
  //     url: uvIndex,
  //     method: "GET",
  // }).then(function (response) {
  //     console.log(response)
  //     })

})
function createIcon(icon) {
  let queryIconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  $("#5DayForecast").append("<img src=" + queryIconURL + ">")

}

let city = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver"];


//create on click for ul

function renderCities(storedCities) {
  // Clear cityList element 
  cityList.innerHTML = "";

  // Render a new li for each citylist
  for (var i = 0; i < storedCities.length; i++) {
    let city = storedCities[i];

    let li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-citylist", i);
    cityList.appendChild(li);
  }
  //console.log(renderCities)
}
//local storage for the cityLists

function init() {
  // Get stored cities from localStorage
  // Parsing the JSON string to an object
  var storedCities = JSON.parse(localStorage.getItem("cityHistory"));

  // If citylist were retrieved from localStorage, update the city array to it
  if (storedCities !== null) {
    cities = storedCities;
    // Render city to the DOM
    renderCities(storedCities);
  }
}
function storeCity() {
  // Stringify and set "cities" key in localStorage to city array
  localStorage.setItem("cityHistory", JSON.stringify(cities));
}
// When form is submitted...
search.addEventListener("submit", function (event) {
  event.preventDefault();
 let cityInput=$("#searchCity")
  var cityText = cityInput.val().trim();

  // Return from function early if submitted cityText is blank
  if (cityText === "") {
    return;
  }
  // Add new cityText to city array, clear the input
  cities.push(cityText);
  // localStorage.setItem("cityHistory", JSON.stringify(cities))
  cityInput.value = "";

  // Store updated cities in localStorage, re-render the list
  storeCity();
  renderCities(cities);

// comment


  //api for weather display with icons


  //currentdate and 5 week date with weather info

  //.reverse will reverse an array
});



// make an empty array outside click function
//push imput to empty array
//local storagesetitem to the localStorage.setitem("cityHistory", JSON.strinify(empptyARR))
// local get item and use JSON.parse istead of stringify
//if statement