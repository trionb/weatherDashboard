let cityList = document.getElementById("city-list")
let search = document.getElementById("searchbtn")
let icon;
let cities= [];
init()

// Grabbing and storing the data-animal property value from the button
//var cityList = $(this).attr("data-city");

let searchbtn = $("#form-control mr-sm-2").val();

let card=[]

// let key = "be8970edab66a09fa656ce2ee581855a"

//create on click for search btn

$("#searchForm").on("submit", function (event) {
    event.preventDefault()
    let city = document.getElementById("searchCity").value
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=be8970edab66a09fa656ce2ee581855a&units=imperial"
    let queryURL2 = "http://api.openweathermap.org/data/2.5/forecast?q="+city+ "&appid=be8970edab66a09fa656ce2ee581855a&units=imperial"
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
        $("#currentCity").append(response.name);
        $("#currentCity").append(response.main.temp);
        $("#currentCity").append(response.main.humidity);
        $("#currentCity").append(response.wind.speed);



    })

    $.ajax({
        url: queryURL2,
        method: "GET",
    }).then(function (response) {
        console.log(response)
       for(let i=0; i<response.list.length; i++){
           //console.log(response.list[i].dt)
        if(response.list[i].dt_txt.includes("09:00:00")){
            console.log(response.list[i].main.temp);
            console.log(response.list[i].main.humidity);
            icon=response.list[i].weather[0].icon
            createIcon(icon);
            //console.log(icon)
            //$("#currentCity").append(response.list.length);
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
    function createIcon(icon){
        let queryIconURL ="http://openweathermap.org/img/wn/"+icon+"@2x.png"
        $("#currentCity").append("<img src="+queryIconURL+">")

    }
      
 let city=["Austin","Chicago","New York","Orlando","San Francisco", "Seattle", "Denver"];

     
//create on click for ul

function renderCities() {
  // Clear cityList element 
  cityList.innerHTML = "";

  // Render a new li for each citylist
  for (var i = 0; i < cities.length; i++) {
    let city= cityEl[i];

    let li = document.createElement("li");
    li.textContent = cities;
    li.setAttribute("data-citylist", i);
    CityList.appendChild(li);
  }
  //console.log(renderCities)
}
//local storage for the cityLists

function init() {
    // Get stored cities from localStorage
    // Parsing the JSON string to an object
    var storedCity = JSON.parse(localStorage.getItem("cityEl"));
  
    // If citylist were retrieved from localStorage, update the city array to it
    if (storedCity !== null) {
      cityEl = storedCities;
    }
    // Render city to the DOM
    renderCities();
  }
  function storeCity() {
    // Stringify and set "cities" key in localStorage to city array
    localStorage.setItem("cities", JSON.stringify(cities));
  }
  // When form is submitted...
search.addEventListener("submit", function(event) {
    event.preventDefault();

    var cityText = cityInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (cityText === "") {
    return;
  }
// Add new cityText to city array, clear the input
cities.push(cityText);
cityInput.value = "";

// Store updated todos in localStorage, re-render the list
storeCities();
renderCities();

      

  
//api for weather display with icons


//currentdate and 5 week date with weather info

//.reverse will reverse an array
});
