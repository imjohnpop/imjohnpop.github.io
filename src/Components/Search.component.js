import React, { Component } from 'react';
import axios from 'axios';

export default class SearchBar extends Component {

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
                self.props.setWeather(response);
                self.props.setHeadlineOne(results.data.results[0].formatted_address);
                self.props.setLocation(results.data.results[0].geometry.location);
                self.props.hideHistory();
            });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let self = this;
        event.preventDefault();
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.value+'&key=AIzaSyCvFpXKqL6yuHEvaffThsFybDE3G8isrq4')
            .then(function (results) {
                self.getForecast(results);
            });
    }

    componentDidMount(){
        this.searchInput.focus();
    }

    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-sm bg-dark">
                <a href="/" className="navbar-brand">SkyCast</a>
                <button className="navbar-toggler mb-2" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav w-100">
                        <li className="nav-item w-100">
                            <form className="d-flex" onSubmit={this.handleSubmit}>
                                <input ref={(input) => { this.searchInput = input; }}
                                       className="form-control text-info" id="search" type="search" placeholder="Enter location" aria-label="Search"
                                       value={this.state.value} onChange={this.handleChange}/>
                                <button className="btn btn-info pointer ml-2" type="submit"><i className="fa fa-search mr-1" aria-hidden="true"></i>Search</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}