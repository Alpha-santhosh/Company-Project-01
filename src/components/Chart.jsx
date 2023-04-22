import React from 'react'
import { useEffect, useState } from 'react';
// import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/css/highcharts.css';
import Cochart from './Cochart';

const Chart = ({ folder, owner }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getContributorData() {
            const response = await fetch(`https://api.github.com/repos/${owner}/${folder}/stats/contributors`);
            const contributors = await response.json();

            const data = [];
            const commitSeriesData = [];
            const additionSeriesData = [];
            const deletionSeriesData = [];

            contributors.forEach(contributor => {

                contributor.weeks.forEach(week => {
                    const timestamp = week.w * 1000;
                    const commits = week.c;
                    const additions = week.a;
                    const deletions = week.d;

                    commitSeriesData.push([timestamp, commits]);
                    additionSeriesData.push([timestamp, additions]);
                    deletionSeriesData.push([timestamp, deletions]);
                });
            });

            data.push({
                name: 'Commits',
                data: commitSeriesData
            });
            data.push({
                name: 'Additions',
                data: additionSeriesData
            });
            data.push({
                name: 'Deletions',
                data: deletionSeriesData
            });

            setData(data);
        }
        getContributorData()

    }, [owner, folder]);

    const options = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Contributor Commit Activity'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: 7 * 24 * 60 * 60 * 1000,
        },
        yAxis: {
            title: {
                text: 'Commits'
            },
            min: 0
        },
        tooltip: {
            formatter: function () {
                const name = this.series.name;
                const timestamp = Highcharts.dateFormat('%Y-%m-%d', this.x);
                const commits = this.y;
                const additions = this.point.additions;
                const deletions = this.point.deletions;
                return `<b>${name}</b><br>${timestamp}: ${commits} commits<br>${additions} additions, ${deletions} deletions`;
            }
        },
        series: data,
        accessibility: {
            enabled: false
        }
    };


    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <Cochart folder={folder} owner={owner} />
        </div >
    );
};

export default Chart