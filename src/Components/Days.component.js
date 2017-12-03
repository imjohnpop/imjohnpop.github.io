import React, { Component } from 'react';
import Moment from 'moment';
import Skycons from"react-skycons";

export default class Days extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="days list-group-item bg-transparent row d-flex justiy-content-between">
                <div className="col-7 col-sm-8 col-md-5 col-lg-6">
                    <p className="text-white">{Moment.unix(this.props.day).format('dddd')}</p>
                    <p className="text-white">{Moment.unix(this.props.day).format('MMM Do')}</p>
                    <p className="text-white">{this.props.dayHigh}&deg;C / {this.props.dayLow}&deg;C</p>
                </div>
                <div className="col-5 col-sm-4 col-md-7 col-lg-6">
                    <Skycons color='#17a2b8' icon={this.props.icon.toUpperCase().replace(/-/g, "_")} autoplay={true}/>
                </div>
            </li>
        );
    }
}