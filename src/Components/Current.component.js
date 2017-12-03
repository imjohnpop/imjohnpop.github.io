import React, { Component } from 'react';
import Moment from 'moment';
import Hours from "./Hours.component";
import Skycons from"react-skycons";

export default class Current extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weatherData: {},
            weatherHourly: [],
            today: '',
            summary: '',
            sunrise: '',
            sunset: '',
            temperature: '',
            high: '',
            low: '',
            uvindex: '',
            humidity: '',
            pressure: '',
            windSpeed: '',
            icon: 'CLEAR_DAY'
        };
    }

    changeWeather(weatherData) {
        this.setState({
            weatherData: weatherData,
            weatherHourly: weatherData.data.hourly.data,
            today: Moment.unix(weatherData.data.currently.time).format('dddd MMMM Do'),
            summary: weatherData.data.currently.summary,
            sunrise: Moment.unix(weatherData.data.daily.data[0].sunriseTime).format('h:mm a'),
            sunset: Moment.unix(weatherData.data.daily.data[0].sunsetTime).format('h:mm a'),
            temperature: weatherData.data.currently.temperature,
            high: weatherData.data.daily.data[0].temperatureHigh,
            low: weatherData.data.daily.data[0].temperatureLow,
            uvindex: weatherData.data.daily.data[0].uvIndex,
            humidity: weatherData.data.currently.humidity * 100,
            pressure: weatherData.data.currently.pressure,
            windSpeed: (weatherData.data.currently.windSpeed * 3.6).toFixed(2),
            icon: weatherData.data.currently.icon
        });
    }

    render() {
        let hours = [];
        for(let i=0; i<(this.state.weatherHourly.length/2); i++) {
            hours[i] = <Hours  key={i}
                               time={(i===0 ? "Now" : (Moment.unix(this.state.weatherHourly[i].time).format('h a')))}
                               temp={Math.round(this.state.weatherHourly[i].temperature)}
                               icon={this.state.weatherHourly[i].icon}
            />;
        }
        return (
            <section id="current" className="col-12 col-md-5 mb-2 ml-auto">
                <div className="card bg-transparent text-info border-info">
                    <div className="card-header bg-info border-info text-center">
                        <Skycons className="w-75" color='white' icon={this.state.icon.toUpperCase().replace(/-/g, "_")} autoplay={true}/>
                        <h2 className="temp display-2 text-white">{Math.round(this.state.temperature)}&deg;C</h2>
                        <h3 className="text-white">{this.state.summary}</h3>
                        <h4 className="text-white">{this.state.today}</h4>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Today: </span><span>{Math.round(this.state.high)}&deg;C / {Math.round(this.state.low)}&deg;C</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Sunrise: </span><span>{this.state.sunrise}</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Sunset: </span><span>{this.state.sunset}</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Humidity: </span><span>{this.state.humidity} %</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Pressure: </span><span>{this.state.pressure} hPa</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>UV Index: </span><span>{this.state.uvindex}</span></li>
                        <li className="list-group-item bg-transparent d-flex justify-content-between"><span>Wind Speed: </span><span>{this.state.windSpeed} km/h</span></li>
                    </ul>
                    <div className="hourly card-body bg-info d-flex">
                        { hours }
                    </div>
                </div>
            </section>
        );
    }
}