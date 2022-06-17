import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { memes, simplePie, generateChartDatasets } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';

export async function getStaticProps() {
    const master = await getMaster()
    return ({ props: { master } })
}

export default function Poll7({ master }) {

    let chartData = require('/charts.json')

    let setsVotingPlans = generateChartDatasets(chartData.chartVotingPlans.columns, master[6].data, 'none')
    let setsAHP = generateChartDatasets(chartData.chartAHP.columns, master[6].data, 'none')
    chartData.chartVotingPlans.chartConfig.datasets[0].data = setsVotingPlans
    chartData.chartAHP.chartConfig.datasets[0].data = [
        setsAHP[0] + setsAHP[1] + setsAHP[2],
        setsAHP[3] + setsAHP[4] + setsAHP[5],
        setsAHP[6]
    ]

    let setsProblems = generateChartDatasets(chartData.chartProblems.columns, master[6].data, 'none')
    //Combining Very Serious and Serious into one data point
    var newSet = []
    for (let i = 0; i < setsProblems[0].length; i++) {
        newSet.push(setsProblems[0][i] + setsProblems[1][i])
    }
    chartData.chartProblems.chartConfig.datasets[0].data = newSet
    chartData.chartProblems.chartConfig.datasets[1].data = setsProblems[2]
    chartData.chartProblems.chartConfig.datasets[2].data = setsProblems[3]
    chartData.chartProblems.chartConfig.datasets[3].data = setsProblems[4]

    let setsLP = generateChartDatasets(chartData.chartLP.columns, master[6].data)
    chartData.chartLP.chartConfig.datasets[0].data = setsLP[0]
    chartData.chartLP.chartConfig.datasets[1].data = setsLP[1]
    chartData.chartLP.chartConfig.datasets[2].data = setsLP[2]
    chartData.chartLP.chartConfig.datasets[3].data = setsLP[3]
    chartData.chartLP.chartConfig.datasets[4].data = setsLP[4]

    let setsFP = generateChartDatasets(chartData.chartFP.columns, master[6].data, 'none')
    chartData.chartFP.chartConfig.datasets[0].data = setsFP[0]
    chartData.chartFP.chartConfig.datasets[1].data = setsFP[1]
    chartData.chartFP.chartConfig.datasets[2].data = setsFP[2]
    chartData.chartFP.chartConfig.datasets[3].data = setsFP[3]
    chartData.chartFP.chartConfig.datasets[4].data = setsFP[4]

    let setsS = generateChartDatasets(chartData.chartS.columns, master[6].data, 'none')
    chartData.chartS.chartConfig.datasets[0].data = setsS[0]
    chartData.chartS.chartConfig.datasets[1].data = setsS[1]
    chartData.chartS.chartConfig.datasets[2].data = setsS[2]
    chartData.chartS.chartConfig.datasets[3].data = setsS[3]
    chartData.chartS.chartConfig.datasets[4].data = setsS[4]

    let setsLife = generateChartDatasets(chartData.chartLife.columns, master[6].data, 'none')
    chartData.chartLife.chartConfig.datasets[0].data = [
        setsLife[7] + setsLife[8] + setsLife[9] + setsLife[10],
        setsLife[5] + setsLife[6],
        setsLife[0] + setsLife[1] + setsLife[2] + setsLife[3] + setsLife[4]
    ]

    let setsFinance = generateChartDatasets(chartData.chartFinance.columns, master[6].data, 'none')
    chartData.chartFinance.chartConfig.datasets[0].data = setsFinance

    let setsExperiences = generateChartDatasets(chartData.chartExperiences.columns, master[6].data)
    //Combining 2 fields into one data point
    var newSetE = []
    for (let i = 0; i < setsExperiences[0].length; i++) {
        newSetE.push(setsExperiences[0][i] + setsExperiences[1][i])
    }
    chartData.chartExperiences.chartConfig.datasets[0].data = newSetE
    chartData.chartExperiences.chartConfig.datasets[1].data = setsExperiences[2]
    chartData.chartExperiences.chartConfig.datasets[2].data = setsExperiences[3]

    let setsCOL = generateChartDatasets(chartData.chartCOL.columns, master[6].data)
    chartData.chartCOL.chartConfig.datasets[0].data = setsCOL[0]
    chartData.chartCOL.chartConfig.datasets[1].data = setsCOL[1]
    chartData.chartCOL.chartConfig.datasets[2].data = setsCOL[2]
    chartData.chartCOL.chartConfig.datasets[3].data = setsCOL[3]
    chartData.chartCOL.chartConfig.datasets[4].data = setsCOL[4]

    let setsStatement = generateChartDatasets(chartData.chartStatement.columns, master[6].data)
    chartData.chartStatement.chartConfig.datasets[0].data = [
        setsStatement[0] + setsStatement[1],
        setsStatement[2] + setsStatement[3],
        setsStatement[4]
    ]

    let setsChallenges = generateChartDatasets(chartData.chartChallenges.columns, master[6].data)
    chartData.chartChallenges.chartConfig.datasets[0].data = setsChallenges[0]
    chartData.chartChallenges.chartConfig.datasets[1].data = setsChallenges[1]
    chartData.chartChallenges.chartConfig.datasets[2].data = setsChallenges[2]
    chartData.chartChallenges.chartConfig.datasets[3].data = setsChallenges[3]

    let setsHealth = generateChartDatasets(chartData.chartHealth.columns, master[6].data)

    //Combining 2 fields into one data point
    var newSetHealth = []
    for (let i = 0; i < setsHealth[0].length; i++) {
        newSetHealth.push(setsHealth[0][i] + setsHealth[1][i])
    }

    chartData.chartHealth.chartConfig.datasets[0].data = newSetHealth
    chartData.chartHealth.chartConfig.datasets[1].data = setsHealth[2]
    chartData.chartHealth.chartConfig.datasets[2].data = setsHealth[3]
    chartData.chartHealth.chartConfig.datasets[3].data = setsHealth[4]
    chartData.chartHealth.chartConfig.datasets[4].data = setsHealth[5]

    let setsCharity = generateChartDatasets(chartData.chartCharity.columns, master[6].data)
    chartData.chartCharity.chartConfig.datasets[0].data = setsCharity
    let setsVolunteer = generateChartDatasets(chartData.chartVolunteer.columns, master[6].data)
    chartData.chartVolunteer.chartConfig.datasets[0].data = setsVolunteer
    let setsDonations = generateChartDatasets(chartData.chartDonations.columns, master[6].data)
    chartData.chartDonations.chartConfig.datasets[0].data = setsDonations

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
                        masterDataset={master[6].data}
                        dataset={chartData.chartVotingPlans.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Would you vote yes or no on a 150 million dollar City of San Antonio bond for Affordable Housing Projects that includes rehabilitating, preserving and producing housing for homeownership or rent, and supportive services for people exiting homelessness?"
                        column={chartData.chartAHP.columns}
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
                        dataset={chartData.chartLife.chartConfig}
                        options={pieOptions}
                        reshape="life"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="How would you describe your current financial situation?"
                        column={chartData.chartFinance.columns}
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
                        dataset={chartData.chartCharity.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you or anyone in your household provided volunteer support to a charitable or non-profit organization in the last year?"
                        column={chartData.chartVolunteer.columns}
                        masterDataset={master[6].data}
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
                        masterDataset={master[6].data}
                        dataset={chartData.chartDonations.chartConfig}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
        </Container>
    )
}