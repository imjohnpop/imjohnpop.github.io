import React, { Component } from 'react';
import Skycons from"react-skycons";

export default class Hours extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hours card bg-transparent m-1">
                <div className="card-body py-2">
                    <p className="card-text text-center text-white">{this.props.time}</p>
                    <Skycons color='white' icon={this.props.icon.toUpperCase().replace(/-/g, "_")} autoplay={true}/>
                    <p className="card-text text-center text-white">{this.props.temp}&deg;C</p>
                </div>
            </div>
        );
    }
}