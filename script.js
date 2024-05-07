const apikey = "0dd941162b12c095adb2a284bbb19471"

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl=document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityValue+'&appid='+apikey+'&units=metric')
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // console.log(data);
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon;
        const details = [
            'Feels like: '+Math.round(data.main.feels_like),
            'Humidity: '+data.main.humidity+'%',
            'Wind speed: '+data.wind.speed +'m/s'
        ];
        weatherDataEl.querySelector(".icon").innerHTML = '<img src="http://openweathermap.org/img/wn/' + icon + '.png" alt="loading...">';
        weatherDataEl.querySelector(".temperature").textContent = temperature+' °C';
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> '<div>'+detail+'</div>').join("");
        GetInfo()
       // document.getElementById("iconsContainer").style.backgroundColor="gainsboro";
        document.getElementById("icon1").style.backgroundColor="#CCCCCC";
        document.getElementById("icon2").style.backgroundColor="#CCCCCC";
        document.getElementById("icon3").style.backgroundColor="#CCCCCC";
        document.getElementById("icon4").style.backgroundColor="#CCCCCC";   
    }catch (error) {
        document.getElementById("iconsContainer").style.display="none";
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error happened ,please enter the city name correctly";
        weatherDataEl.querySelector(".details").innerHTML ="";
    }
}

//4 days data

function GetInfo() {
    // document.getElementById("weatherContainer").style.display="block";
     //var newName = document.getElementById("cityInput");
     //var cityName = document.getElementById("cityName");
     //cityName.innerHTML = "--"+newName.value+"--";
     document.getElementById("iconsContainer").style.display="flex";
     var newName=cityInputEl;
 fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=0dd941162b12c095adb2a284bbb19471')
 .then(response => response.json())
 .then(data => {
     //Getting the min and max values for each day
     for(i = 1; i<5; i++){
         document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°C";
         //Number(1.3450001).toFixed(2); // 1.35
     }
 
     for(i = 1; i<5; i++){
         document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
     }
     //------------------------------------------------------------
 
     //Getting Weather Icons
      for(i = 1; i<5; i++){
         document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
         data.list[i].weather[0].icon
         +".png";
     }
     //------------------------------------------------------------
     for(i = 1; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }
     console.log(data)
 
 
 })
 
 .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"))
 }
 
 
 
 //Getting and displaying the text for the upcoming five days of the week
 var d = new Date();
 var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];
 
 //Function to get the correct integer for the index of the days array
 function CheckDay(day){
     if(day + d.getDay() > 6){
         return day + d.getDay() - 7;
     }
     else{
         return day + d.getDay();
     }
 }
 
