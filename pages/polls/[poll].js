import getMaster from '../../lib/master'
import { generateChartDatasets, combineDataPoints } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { useId } from 'react'
import styles from '../../styles/Home.module.css'
import ChartGroup from '../../components/ChartGroup';

export async function getStaticPaths() {
    return {
        paths: [
            // { params: { poll: '1' } },
            // { params: { poll: '2' } },
            // { params: { poll: '3' } },
            // { params: { poll: '4' } },
            // { params: { poll: '5' } },
            // { params: { poll: '6' } },
            { params: { poll: '7' } }
        ],
        fallback: false,
    }
}

export async function getStaticProps() {
    const master = await getMaster()
    return ({ props: { master } })
}

export default function Poll({ master }) {

    const router = useRouter()
    //const id = useId()
    const { poll } = router.query
    const pollNum = poll - 1

    //Read in a JSON file defining chart configuration for the poll page.
    //Loop through all chart objects, generate chart datasets, then assign
    //each chart's dataset.data values to the generated dataset. 
    //This  should set up all charts to be rendered into react components
    let chartData = require('/keyless.json')
    chartData.forEach(chart => {
        if(!("charts" in chart)) {
            combineDataPoints(chart, generateChartDatasets(chart.columns, master[pollNum].data))
        } else { //There exists a chartGroup object, so run combineDataPoints() on all of them
            chart.charts.forEach(chart => {
                combineDataPoints(chart, generateChartDatasets(chart.columns, master[pollNum].data))
            })
        }
        //console.log(chart)
    })

    const options = {
        "barOptions_stacked" : {
            //responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: "Percentage"
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 16
                        },
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Click legend to interact!'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            var data = context.dataset.data,
                                label = context.dataset.label,
                                currentValue = context.raw
                            var percentage = parseFloat((currentValue).toFixed(1));

                            return label + ": (" + percentage + '%)';
                        }
                    }

                },
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 8;
                    },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value).toFixed(0) + "%";
                        return percentage;
                    },
                    color: "white"
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
            },
        },

        "pieOptions" : {
            //responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Click legend to interact!'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            var data = context.dataset.data,
                                label = context.label,
                                currentValue = context.raw,
                                total = 0;

                            //   for( var i = 0; i < data.length; i++ ){
                            //     total += data[i];
                            //   }
                            var percentage = parseFloat((currentValue).toFixed(1));

                            return label + ": (" + percentage + '%)';
                        }
                    }

                },
                datalabels: {
                    font: {
                        size: 20
                    },
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 4;
                    },
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = Math.round((value / sum) * 100) + "%";
                            return percentage;
                        } else {
                            return percentage;
                        }
                    },
                    color: "white"
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
            },
        }
    }

    return (
        <div className={styles.chartGrid}>
            {
                chartData.map(chart => {
                    return renderChart(chart, master[pollNum].data, options)
                })
            }
        </div>
    )
}

export const renderChart = (chart, data, arrOptions) => {
    //console.log(chart)
    switch (chart.type) {
        case 'pie':
            return (
                <PieChart
                    title={chart.config.data.title}
                    column={chart.columns}
                    masterDataset={data}
                    dataset={chart.config.data}
                    options={arrOptions.pieOptions}
                />
            )
        case 'bar':
            return (
                <BarChart
                    title={chart.config.data.title}
                    columns={chart.columns}
                    masterDataset={data}
                    dataset={chart.config.data}
                    options={arrOptions.barOptions_stacked}
                />
            )
        case 'chartGroup':
            return (
                <div className={styles.chartGroup}>
                    <h2>{chart.title}</h2>
                    {
                        chart.charts.map(chart => {
                            return renderChart(chart, data, arrOptions)
                        })
                    }
                </div>
            )
    }
}