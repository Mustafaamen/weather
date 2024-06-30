
// if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(){
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         console.log(lat);
//         console.log(lon);
//         // getWeather(`${lat},${lon}`)
//     })
// }else{
//     console.log("Geolocation is not supported by this browser.");
// }




// let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
// const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December",];
// let result=[]
// function search(){
//     let xhr =new XMLHttpRequest()
  
//     xhr.open("get",'https://api.weatherapi.com/v1/forecast.json?key=d5170c71830f47a0820113500231508&q='+kewword+'&days=3'); 
//     xhr.addEventListener("readystatechange", function(){
//         if(xhr.readyState==4 ){
//             let result=JSON.parse(xhr.responseText)
//         }
//     })
//     xhr.send()
// }
// document.querySelector('input').addEventListener("keyup",function(){
    
// })

let searchLocationInput =document.getElementById('searchLocation')


async function getWeather(query){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=a7191f31224a4b3aad961643242706`)
    let data = await res.json()
    console.log(data);
    displayTodayWeather(data)
    displayTomm(data)
    displayThree(data)
}
getWeather('cairo')

searchLocationInput.addEventListener('input',function(e){
    // console.log(e.target.value);
    getWeather(e.target.value)
    // getWeather(e.target.value)

})


function displayTodayWeather(data){

    // console.log(data, 'from display');
    //  console.log(data.current.last_updated, 'date');
     const today =data.current.last_updated
     let date = new Date(today);
    //  console.log(date.getDate());
    //  console.log(date.getMonth()+1);
    //  console.log(date.getFullYear());
    let todayWeekDay =(date.toLocaleString('en-us',{weekday:"long"}));  // اسم يوم الاسبوع
    let todayDay= (date.getDate()) //يوم كام في الشهر
    let todayWeek =(date.toLocaleString('en-us',{month:"long"}));  // اسم الشهر
    let cityName= (data.location.name)
    let todayDegree= (data.current.temp_c)
    let todaycondition= (data.current.condition.text)
    let hum = (data.current.humidity)
    let winspeed=(data.current.wind_kph)
    let dirToday=(data.current.wind_dir)
    // console.log(todaycondition);
    todayWeekDayMarkup.innerHTML=todayWeekDay
    dayTodayMarkup.innerHTML=`${todayDay} ${todayWeek}`
    cityNameMarkup.innerHTML=cityName
    todayDeg.innerHTML=todayDegree
    condition.innerHTML=todaycondition
    imgToday.setAttribute('src',data.current.condition.icon)
    humidityToday.innerHTML=hum 
    speed.innerHTML=winspeed
    direction.innerHTML=dirToday
    //  console.log(date);
}


function displayTomm({forecast}){
    tomDay.innerHTML= new Date (forecast.forecastday[1].date).toLocaleString('en-us',{weekday:"long"});
iconTom.setAttribute('src',forecast.forecastday[1].day.condition.icon);
hiDeg.innerHTML=forecast.forecastday[1].day.maxtemp_c;
lowDeg.innerHTML=forecast.forecastday[1].day.mintemp_c;
conditionTom.innerHTML=forecast.forecastday[1].day.condition.text;

// console.log(forecast.forecastday[1].day.condition.text);

}
function displayThree({forecast}){
    thirdDay.innerHTML= new Date (forecast.forecastday[2].date).toLocaleString('en-us',{weekday:"long"});
iconThird.setAttribute('src',forecast.forecastday[2].day.condition.icon);
hiDegThird.innerHTML=forecast.forecastday[2].day.maxtemp_c;
lowDegThird.innerHTML=forecast.forecastday[2].day.mintemp_c;
conditionTomThird.innerHTML=forecast.forecastday[2].day.condition.text;

// console.log(forecast.forecastday[2]);

}
