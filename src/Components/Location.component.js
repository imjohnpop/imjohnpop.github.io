import React, { Component } from 'react';

export default class Location extends Component {

    constructor(props) {
        super(props);

        this.state = {
            headline: "SkyCast Weather App"
        }
    }

    changeHeadlineOne(headline) {
        this.setState({
            headline: 'Weather for ' + headline
        });
    }


    render() {
        return (
            <section id="location" className="col-12 col-md-9 bg-info rounded border border-info mt-3 mx-auto">
                <h1 className="text-center text-white my-3">{ this.state.headline }</h1>
            </section>
        );
    }
}