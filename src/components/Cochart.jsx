import React from 'react'
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import 'highcharts/css/highcharts.css';

function Cochart({ folder, owner }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async (owner, folder) => {
            const token = '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';
            const response = await fetch(`https://api.github.com/repos/${owner}/${folder}/stats/commit_activity `, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                owner: 'OWNER',
                repo: 'REPO',
                
            });
            const tempdata = await response.json();
            console.log(tempdata);
            setData(tempdata)
        }
        fetchData(owner, folder)
    }, [folder, owner]);

    const chartOptions = {
        title: {
            text: 'Last Year of Commit Activity',
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Number of Commits',
            },
        },
        series: [
            {
                name: 'Commits',
                data: data.map((weekData) => [
                    weekData.week * 1000,
                    weekData.total,
                ]),
            },
        ],accessibility: {
            enabled: false
        }
    };

    return (
        <>
            {data.length > 0 && (
                <>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </>
            )}
        </>
    );

}

export default Cochart