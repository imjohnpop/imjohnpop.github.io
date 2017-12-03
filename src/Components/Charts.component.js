import React, { Component } from 'react';
import {Line as LineChart} from 'react-chartjs-2';
import Moment from 'moment';

export default class Chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartData: [],
            options: {},
        }
    }

    componentWillMount() {
        let labels=[],
            datas=[],
            dataLabel=[];
        for(let i=0; i<3; i++) {
            let data=[];
            for(let j=0; j<this.props.data.length; j++) {
                labels[j] = Moment.unix(this.props.data[j].time).format('h a');
                switch (i) {
                    case 0:
                        data[j] = this.props.data[j].temperature;
                        dataLabel[i]='temperature';
                        break;
                    case 1:
                        data[j] = this.props.data[j].humidity * 100;
                        dataLabel[i]='humidity';
                        break;
                    case 2:
                        data[j] = this.props.data[j].pressure;
                        dataLabel[i]='pressure';
                        break;
                }
            }
            datas[i]=data;
        }
        let chartData = [];
        let options = {};
        for(let i=0; i<3; i++) {
            chartData[i]={
                        labels: labels,
                        datasets: [{
                            label: dataLabel[i],
                            data: datas[i],
                            backgroundColor: ['rgba(37, 146, 170, 0.15)'],
                            borderColor: ['rgba(37, 146, 170, 0.95)'],
                            borderWidth: 1
                        }]
            };
            options={
                legend: {
                    position: 'bottom',
                }
            }
        }
        this.setState({
            chartData: chartData,
            options: options
        });
    }

    render() {
        let lineCharts = [];
        for(let i=0; i<this.state.chartData.length; i++) {
            lineCharts[i] = <LineChart
                        key={Math.random()+Math.random()}
                        data={this.state.chartData[i]}
                        options={this.state.options}
                        redraw={true}/>;
        }
        return(
            <div className="chart my-3">
                <h4 className="text-center text-white">Data for {Moment.unix(this.props.data[0].time).format('dddd MMMM Do YYYY')}</h4>
                { lineCharts }
            </div>
        );
    }
}