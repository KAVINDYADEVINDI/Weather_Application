import React,{ useState } from 'react';
import './App.css';
import {SearchOutlined} from '@ant-design/icons';
import { WiCloudy} from 'weather-icons-react';


const api= {
  key:"dba33e3bee95aa2d1acc7868be9187e5",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query,SetQuery]=useState('');
  const [weather,setWeather]=useState({});

  const search =evt =>{
    if(evt.key==="Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(result=>{
        setWeather(result);
        SetQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day =days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <main>
      <div className="main-box">
       
        <div className="inside-img">
          
          <h1>Weather Forecast</h1>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="left">
                <div className="temp-left">{Math.round(weather.main.temp)}°</div>
              </div>
              <div className="left">
                <div className="location-left">{weather.name}</div> 
                <div className="date-left">{dateBuilder(new Date())}</div>
              </div>
              <div className="left ">
                <WiCloudy className="cloud-icon"/>
                <div className="weather-left">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : ('')}
        
          
        </div>
       
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search Location..."
          onChange={e=> SetQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          <SearchOutlined className="search-icon" />
     
          
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>

              <div className="weather-box">
                <div className="temp">{weather.main.temp}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="weather-description">-{weather.weather[0].description}-</div>
              </div>
              <div className="line"></div>
              <h3>Weather details</h3>
              

              <div className="details">
                <p>Min tempreture</p>
                <p>{weather.main.temp_min}°C</p>
              </div>

              <div className="details">
                <p>Max tempreture</p>
                <p>{weather.main.temp_max}°C</p>
              </div>

              <div className="details">
                <p>Wind</p>
                <p>{weather.wind.speed}km/h</p>
              </div>

              <div className="details">
                <p>Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>

              <div className="details">
                <p>Cloudy</p>
                <p>{weather.clouds.all}%</p>
              </div>

            </div>
          ) : (
            ('')
          )
          }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
