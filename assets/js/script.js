var APIkey = "0a0941f54846b3ed7b423a359c52235d";
var searchBtnEl = document.getElementById("sButton");
var tArea = document.getElementById("tArea");
var day1 = document.querySelector("#day-content");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");
var day6 = document.querySelector("#day6");
var historyList = []; //STILL NEED TO STORE TO LOCAL STORAGE BUT .PUSH IS HAVING PROBLEMS
var historyUl = document.querySelector("#history-list");


function init() {
    var storedHistory = JSON.parse(localStorage.getItem("storedHistory"));
    if (storedHistory !== null) {
        historyList = storedHistory;
    }
    for (var i = 0; i < historyList.length; i++) {
        createHistory(historyList[i].city, historyList[i].lat, historyList[i].lon);
    }
}

function storeHistory() {
    localStorage.setItem("storedHistory", JSON.stringify(historyList))
}

function createHistory(city, lat, lon) {
    var historyEl = document.createElement('li');
    var historybtnEl = document.createElement('button');
    historybtnEl.innerHTML = city;
    historyEl.style.listStyleType = "none";
    historybtnEl.style.width = "80%";
    historybtnEl.style.textAlign = "center";
    historybtnEl.style.borderRadius = "4px";
    historybtnEl.style.padding = "5px";
    historybtnEl.className = "search-button";
    historybtnEl.addEventListener('click', function () {
        findWeather(city, lat, lon);
    })
    historyEl.appendChild(historybtnEl);
    historyUl.appendChild(historyEl);
}

searchBtnEl.addEventListener("click", function (event) {
    var city = tArea.value;
    if (tArea !== null) {
        var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey;
        fetch(geoUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var lat = data[0].lat;
                var lon = data[0].lon;
                var next = {
                    city: city,
                    lat: lat,
                    lon: lon
                };
                // historyList.push(next);
                storeHistory();
                createHistory(city, lat, lon);
                //history.push(city,lat,lon); // need to create a history in local storage, they need to all be buttons
                findWeather(city, lat, lon);
            });
    }
});

function findWeather(city, lat, lon) {
    var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?limit=5&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var thisDate = data.list[0].dt_txt.split(" ");
            
            // var icon = "http://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon+".png"
            day1.innerHTML = "<h1>" + city.toUpperCase() + " " + thisDate[0] + " <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png" + " \" /> </h1>" + "Temp: " + data.list[0].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[0].wind.speed + " MPH <br> <br> Humidity: " + data.list[0].main.humidity + "%";
            document.querySelector("#h2").innerHTML = "<h2> 5-Day Forecast: </h2>"
            day2.innerHTML = data.list[8].dt_txt.split(" ")[0] + "<br> <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + ".png" + " \" /> </h1>" + "<br>Temp: " + data.list[8].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[8].wind.speed + " MPH <br> <br> Humidity: " + data.list[8].main.humidity + "%";
            day3.innerHTML = data.list[16].dt_txt.split(" ")[0] + "<br> <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + ".png" + " \" /> </h1>" + "<br>Temp: " + data.list[16].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[16].wind.speed + " MPH <br> <br> Humidity: " + data.list[16].main.humidity + "%";
            //we need to jump by 8 in order to get the next day
            day4.innerHTML = data.list[24].dt_txt.split(" ")[0] + "<br> <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + ".png" + " \" /> </h1>" + "<br>Temp: " + data.list[24].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[24].wind.speed + " MPH <br> <br> Humidity: " + data.list[24].main.humidity + "%";
            day5.innerHTML = data.list[32].dt_txt.split(" ")[0] + "<br> <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + ".png" + " \" /> </h1>" + "<br>Temp: " + data.list[32].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[32].wind.speed + " MPH <br> <br> Humidity: " + data.list[32].main.humidity + "%";
            day6.innerHTML = data.list[39].dt_txt.split(" ")[0] + "<br> <img src= \"" + "http://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + ".png" + " \" /> </h1>" + "<br>Temp: " + data.list[39].main.temp + String.fromCharCode(176) + "F <br> <br> Wind: " + data.list[39].wind.speed + " MPH <br> <br> Humidity: " + data.list[39].main.humidity + "%";




        })
}
init();