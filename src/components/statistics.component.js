import React, { Component } from "react";
import UserService from "../services/user.service";

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default class Statistics extends Component {
    render() {
        function toogleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
        }

        const options = {
            animationEnabled: true,
            title: {
                text: "ScoreBoard"
            },
            axisX: {
                valueFormatString: "MMM"
            },
            axisY: {
                title: "Points",
                prefix: "$"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "top",
                horizontalAlign: "center",
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
            },
            data: [{
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2021, 0), y: 25060 },
                    { x: new Date(2021, 1), y: 27980 },
                    { x: new Date(2021, 2), y: 42800 },
                    { x: new Date(2021, 3), y: 32400 },
                    { x: new Date(2021, 4), y: 35260 },
                    { x: new Date(2021, 5), y: 33900 },
                    { x: new Date(2021, 6), y: 40000 },
                    { x: new Date(2021, 7), y: 52500 },
                    { x: new Date(2021, 8), y: 32300 },
                    { x: new Date(2021, 9), y: 42000 },
                    { x: new Date(2021, 10), y: 37160 },
                    { x: new Date(2021, 11), y: 38400 }
                ]
            },
            {
                yValueFormatString: "$#,###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: [
                    { x: new Date(2021, 0), y: 35260 },
                    { x: new Date(2021, 1), y: 12000 },
                    { x: new Date(2021, 2), y: 52500 },
                    { x: new Date(2021, 3), y: 18500 },
                    { x: new Date(2021, 4), y: 17500 },
                    { x: new Date(2021, 5), y: 32300 },
                    { x: new Date(2021, 6), y: 10700 },
                    { x: new Date(2021, 7), y: 17300 },
                    { x: new Date(2021, 8), y: 1720 },
                    { x: new Date(2021, 9), y: 1740 },
                    { x: new Date(2021, 10), y: 10750 },
                    { x: new Date(2021, 11), y: 1750 },
                ]
            },
            ]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}