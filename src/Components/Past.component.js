import React, { Component } from 'react';
import Moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Charts from './Charts.component';

export default class Past extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: {},
            weatherHist: {},
            startDate: Moment.unix(Moment().unix() - 86400),
            renderCharts: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date,
        });
    }

    getHistoric() {
        let self = this,
            histTime = Moment(this.state.startDate.toDate()).format('X');
        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a91f54d7dc52eef47cd45f6be3580ae1/'+this.state.location.lat+','+this.state.location.lng+','+histTime+'?units=si')
            .then(function (response) {
                self.setState({
                    weatherHist: response.data.hourly.data,
                    renderCharts: true
                });
            });
    }

    searchWeatherHist(locationData) {
        this.setState({
            location: locationData,
        });
    }

    hideHistory() {
        this.setState({
            renderCharts: false
        });
    }

    render() {
        let charts = null;
        if (this.state.renderCharts) {

            charts = <Charts key={Math.random()+Math.random()}
                             data={this.state.weatherHist}/>;
        }
        return (
            <section id="past" className="col-12 col-md-10 mx-auto rounded border border-info mb-4 p-0">
                <div className="py-3 bg-info d-flex flex-column align-items-center">
                    <h2 className="text-white">Historical Data</h2>
                    <div className="text-center">
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            className="bg-transparent border border-white text-white rounded text-center pointer"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            maxDate={Moment.unix(Moment().unix() - 86400)}
                            showYearDropdown
                            showMonthDropdown
                        />
                        <button className="btn btn-info pointer border-white mt-2" type="button" onClick={() => { this.getHistoric() }}>Search</button>
                    </div>
                </div>
                { charts }
            </section>
        );
    }
}