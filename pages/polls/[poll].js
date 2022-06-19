import getMaster from '../../lib/master'
import { generateChartDatasets } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router'

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

//This function will take each chart object and set the data values for
//each of its datasets
export function combineDataPoints(chart, sets) {
    let i = 0

    chart.chartConfig.datasets.forEach(dataset => {
        //As it is, this loop will only combine adjacent datasets and at most combine 2 datasets
        //and it will only combine the first 2 datasets
        if(dataset.combine) {
            var combinedDataset = []
            for (let k = 0; k < sets[0].length; k++) {
                combinedDataset.push(sets[0][k] + sets[1][k])
            }
            dataset.data = combinedDataset
            i = i + 2  
        } else if(dataset.shape) {
            let newset = []
            dataset.shape.forEach(combo => {
                let total = 0
                combo.forEach(index => {
                    total = total + sets[i][index]
                })
                newset.push(total)
            })

            dataset.data = newset
        } else {
            dataset.data = sets[i]
            i = i + 1
        }
    })
}

export default function Poll({ master }) {

    const router = useRouter()
    const { poll } = router.query
    const pollNum = poll - 1

    let chartData = require('/charts.json')

    combineDataPoints(chartData.chartVotingPlans, generateChartDatasets(chartData.chartVotingPlans.columns, master[pollNum].data))
    combineDataPoints(chartData.chartAHP, generateChartDatasets(chartData.chartAHP.columns, master[pollNum].data))
    combineDataPoints(chartData.chartProblems, generateChartDatasets(chartData.chartProblems.columns, master[pollNum].data))
    combineDataPoints(chartData.chartLP, generateChartDatasets(chartData.chartLP.columns, master[pollNum].data))
    combineDataPoints(chartData.chartFP, generateChartDatasets(chartData.chartFP.columns, master[pollNum].data))
    combineDataPoints(chartData.chartS, generateChartDatasets(chartData.chartS.columns, master[pollNum].data))
    combineDataPoints(chartData.chartLife, generateChartDatasets(chartData.chartLife.columns, master[pollNum].data))
    combineDataPoints(chartData.chartFinance, generateChartDatasets(chartData.chartFinance.columns, master[pollNum].data))
    combineDataPoints(chartData.chartExperiences, generateChartDatasets(chartData.chartExperiences.columns, master[pollNum].data))
    combineDataPoints(chartData.chartCOL, generateChartDatasets(chartData.chartCOL.columns, master[pollNum].data))
    combineDataPoints(chartData.chartStatement, generateChartDatasets(chartData.chartStatement.columns, master[pollNum].data))
    combineDataPoints(chartData.chartChallenges, generateChartDatasets(chartData.chartChallenges.columns, master[pollNum].data))
    combineDataPoints(chartData.chartHealth, generateChartDatasets(chartData.chartHealth.columns, master[pollNum].data))
    combineDataPoints(chartData.chartCharity, generateChartDatasets(chartData.chartCharity.columns, master[pollNum].data))
    combineDataPoints(chartData.chartVolunteer, generateChartDatasets(chartData.chartVolunteer.columns, master[pollNum].data))
    combineDataPoints(chartData.chartDonations, generateChartDatasets(chartData.chartDonations.columns, master[pollNum].data))


    var barOptions_stacked = {
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
    }

    var pieOptions = {
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

    return (
        <Container fluid>
            <Row>
                <Col lg={6} xs={12} >
                    <PieChart
                        title="How do you plan on voting in this year's elections?"
                        column={chartData.chartVotingPlans.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartVotingPlans.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Would you vote yes or no on a 150 million dollar City of San Antonio bond for Affordable Housing Projects that includes rehabilitating, preserving and producing housing for homeownership or rent, and supportive services for people exiting homelessness?"
                        column={chartData.chartAHP.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartAHP.chartConfig}
                        options={pieOptions}
                        reshape="ahp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Some say these issues are problems in the greater San Antonio area. Do you think it's a serious problem, somewhat serious problem or not a serious problem?"
                        columns={chartData.chartProblems.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartProblems.chartConfig}
                        options={barOptions_stacked}
                        reshape="problems"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h2>For the following 3 charts, respondents were asked:  Which government level do you think should take the lead in addressing the stated issue?</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Local Priorities"
                        columns={chartData.chartLP.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartLP.chartConfig}
                        options={barOptions_stacked}
                        reshape="lp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Federal Priorities"
                        columns={chartData.chartFP.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartFP.chartConfig}
                        options={barOptions_stacked}
                        reshape="fp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Split on which level of government should lead"
                        columns={chartData.chartS.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartS.chartConfig}
                        options={barOptions_stacked}
                        reshape="s"
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="The Cantril Self-Anchoring Scale is a tool used to assess the well-being of a population by asking respondents to rate where their life stands now, and where they think it will be in five years, using a hypothetical ten-point “ladder” scale. By combining a respondents rating we are able able to identify if people feel they are Thriving, Struggling, or Suffering."
                        column={chartData.chartLife.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartLife.chartConfig}
                        options={pieOptions}
                        reshape="life"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="How would you describe your current financial situation?"
                        column={chartData.chartFinance.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartFinance.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Have you experienced any of the following over the last 12 months?"
                        columns={chartData.chartExperiences.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartExperiences.chartConfig}
                        options={barOptions_stacked}
                        reshape="experiences"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Do you think these things contribute to the rising cost of living in Bexar County?"
                        columns={chartData.chartCOL.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartCOL.chartConfig}
                        options={barOptions_stacked}
                        reshape="lp"
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6} xs={12} className="w-100">
                    <PieChart
                        title='Do you agree or disagree with the following statement "Having reliable, high quality child care for young children is crucial for parents to be able to work?"'
                        column={chartData.chartStatement.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartStatement.chartConfig}
                        options={pieOptions}
                        reshape="statement"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="What do you think is a challenge when looking for a job?"
                        columns={chartData.chartChallenges.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartChallenges.chartConfig}
                        options={barOptions_stacked}
                        reshape="challenges"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="How important do you think each of the following factors are to a person's health?"
                        columns={chartData.chartHealth.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartHealth.chartConfig}
                        options={barOptions_stacked}
                        reshape="health"
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you provided any monetary support to a charitable or non-profit organization in the last year?"
                        column={chartData.chartCharity.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartCharity.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you or anyone in your household provided volunteer support to a charitable or non-profit organization in the last year?"
                        column={chartData.chartVolunteer.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartVolunteer.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6} xs={12} className="w-100">
                    <PieChart
                        title="Were some or all of your charitable donations in 2021 benefiting a community in Bexar County?"
                        column={chartData.chartDonations.columns}
                        masterDataset={master[pollNum].data}
                        dataset={chartData.chartDonations.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
        </Container>
    )

}