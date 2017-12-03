import React, { Component } from 'react';
import axios from 'axios';

export default class LandingSearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getForecast(results) {
        let self = this;
        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a91f54d7dc52eef47cd45f6be3580ae1/'+results.data.results[0].geometry.location.lat+','+results.data.results[0].geometry.location.lng+'?units=si')
            .then(function (response) {
                self.props.firstSearch(results, response);
            });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let self = this;
        event.preventDefault();
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.value + '&key=AIzaSyCvFpXKqL6yuHEvaffThsFybDE3G8isrq4')
            .then(function (results) {
                self.getForecast(results);
            });
    }

    componentDidMount(){
        this.searchInput.focus();
    }

    render() {
        return (
            <section id="landSearch">
                <div className="card text-center col-8 bg-info">
                    <div className="card-header bg-info">
                        <h1 className="text-white">SkyCast</h1>
                    </div>
                    <div className="card-body bg-dark">
                        <form className="form col" onSubmit={this.handleSubmit}>
                            <input ref={(input) => { this.searchInput = input; }}
                                className="form-control text-info" id="search" type="search" placeholder="Enter location" aria-label="Search"
                                value={this.state.value} onChange={this.handleChange}/>
                            <button className="btn btn-dark pointer border-white my-2" type="submit"><i className="fa fa-search mr-1" aria-hidden="true"></i>Search</button>
                        </form>
                    </div>
                    <div className="card-footer bg-info text-muted">
                        <h2 className="text-white">Your Weather Forecast</h2>
                        <p className="text-white">Powered by DarkSky</p>
                    </div>
                </div>
            </section>
        );
    }
}