import React, { Component } from 'react';
// Importing Components
import SearchBar from './Search.component';
import Location from './Location.component';
import Past from './Past.component';
import Current from './Current.component';
import Future from './Future.component';
import LandingSearchPage from './LandingSearchPage.component';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            renderForecast: false,
            weatherData: {},
            locationData: {},
            headline: '',
        }
    }

    firstSearch(results, response) {
        this.setState({
            renderForecast: true,
            weatherData: response,
            locationData: results.data.results[0].geometry.location,
            headline: results.data.results[0].formatted_address,
        });
        this.render();
        this.setWeather(this.state.weatherData);
        this.setLocation(this.state.locationData);
        this.setHeadlineOne(this.state.headline);
    }

    hideHistory() {
        this.hideHistoryIfExists.hideHistory();
    }

    setHeadlineOne(headline) {
        this.LocationHeadline.changeHeadlineOne(headline);
    }

    setLocation(locationData) {
        this.WeatherHistLoc.searchWeatherHist(locationData);
    }

    setWeather(weatherData) {
        this.Weather.changeWeather(weatherData);
        this.WeatherForecast.changeForecast(weatherData);
    }

    render() {
        let components = <LandingSearchPage firstSearch={this.firstSearch.bind(this)}/>;
        if (this.state.renderForecast) {
            components = <div>
                <SearchBar setHeadlineOne={this.setHeadlineOne.bind(this)}
                           setLocation={this.setLocation.bind(this)}
                           setWeather={this.setWeather.bind(this)}
                           hideHistory={this.hideHistory.bind(this)}/>
                <Location ref={ (el) => {this.LocationHeadline = el;} }/>
                <div className="row mt-4 mx-1 mx-sm-2 mx-md-3 mx-lg-5">
                    <Current ref={ (el) => {this.Weather = el;} }/>
                    <Future ref={ (el) => {this.WeatherForecast = el;} }/>
                </div>
                <div className="row mx-1 mx-sm-2 mx-md-3 mx-lg-5">
                    <Past ref={ (el) => {this.WeatherHistLoc = el;
                                         this.hideHistoryIfExists = el;} }/>
                </div>
                <div className="text-center w-100 text-white mb-3">Created by Jan Poprocsi</div>
            </div>;
        }
        return (
            <div className="App">
                { components }
            </div>
        );
    }
}