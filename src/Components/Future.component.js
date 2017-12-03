import React, { Component } from 'react';
import Days from "./Days.component";

export default class Future extends Component {

    constructor(props) {
        super(props);

        this.state = {
            weatherForecast: {}
        }
    }

    changeForecast(weatherData) {
        this.setState({
            weatherForecast: weatherData.data.daily.data,
        });
    }

    render() {
        let days = [];
        for(let i=1; i<this.state.weatherForecast.length; i++) {
            days[i] = <Days  key={i}
                             day={this.state.weatherForecast[i].time}
                             dayHigh={Math.round(this.state.weatherForecast[i].temperatureHigh)}
                             dayLow={Math.round(this.state.weatherForecast[i].temperatureLow)}
                             icon={this.state.weatherForecast[i].icon}
            />;
        }
        return (
            <section id="future" className="col-12 col-md-5 mb-2 mr-auto">
                <div className="card bg-transparent text-info border-info">
                    <div className="card-header bg-info border-info text-center">
                        <h4 className="text-white">Forecast for next 7 days</h4>
                    </div>
                    <ul className="list-group list-group-flush container">
                        { days }
                    </ul>
                </div>
            </section>
        );
    }
}