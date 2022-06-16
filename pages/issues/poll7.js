import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { memes, simplePie } from '../../lib/myfuncs'
import 'chart.js/auto';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import { Container, Row, Col } from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.css';
//This is a pull request test
//Second line for a test
export async function getStaticProps() {
    const master = await getMaster()
    return ({ props: { master } })
}

export default function Poll7({ master }) {

    let chartData = require('/charts.json')
    

    let setsVotingPlans = simplePie('Q3', master[6].data, 'none')
    let setsAHP = simplePie('Q4', master[6].data, 'none')
    chartData.chartVotingPlans.datasets[0].data = setsVotingPlans
    chartData.chartAHP.datasets[0].data = [
        setsAHP[0] + setsAHP[1] + setsAHP[2],
        setsAHP[3] + setsAHP[4] + setsAHP[5],
        setsAHP[6]
    ]
    var questions7 = [
        'Q7A',
        'Q7B',
        'Q7C',
        'Q7D',
        'HOMELESSNESS',
        'Q7F',
        'Q7G',
        'Q7H',
        'Q7I',
        'Q7J',
        'PROPERTY_TAXES',
        'Q7L',
        'Q7M',
        'Q7N',
        'Q7O',
        'CRIME'
    ]
    let setsProblems = memes(questions7, master[6].data, 'none')
    //Combining Very Serious and Serious into one data point
    var newSet = []
    for (let i = 0; i < setsProblems[0].length; i++) {
        newSet.push(setsProblems[0][i] + setsProblems[1][i])
    }
    chartData.chartProblems.datasets[0].data = newSet
    chartData.chartProblems.datasets[1].data = setsProblems[2]
    chartData.chartProblems.datasets[2].data = setsProblems[3]
    chartData.chartProblems.datasets[3].data = setsProblems[4]


    var questions8LP = [
        'Q8C',
        'Q8E',
        'Q8K',
        'Q8L',
        'Q8O',
        'Q8P'
    ]
    let setsLP = memes(questions8LP, master[6].data)
    chartData.chartLP.datasets[0].data = setsLP[0]
    chartData.chartLP.datasets[1].data = setsLP[1]
    chartData.chartLP.datasets[2].data = setsLP[2]
    chartData.chartLP.datasets[3].data = setsLP[3]
    chartData.chartLP.datasets[4].data = setsLP[4]

    var questions8FP = [
        'Q8B',
        'Q8D',
        'Q8G',
        'Q8J',
        'Q8N'
    ]
    let setsFP = memes(questions8FP, master[6].data, 'none')
    chartData.chartFP.datasets[0].data = setsFP[0]
    chartData.chartFP.datasets[1].data = setsFP[1]
    chartData.chartFP.datasets[2].data = setsFP[2]
    chartData.chartFP.datasets[3].data = setsFP[3]
    chartData.chartFP.datasets[4].data = setsFP[4]

    var questions8S = [
        'Q8A',
        'Q8F',
        'Q8H',
        'Q8I',
        'Q8M'
    ]
    let setsS = memes(questions8S, master[6].data, 'none')
    chartData.chartS.datasets[0].data = setsS[0]
    chartData.chartS.datasets[1].data = setsS[1]
    chartData.chartS.datasets[2].data = setsS[2]
    chartData.chartS.datasets[3].data = setsS[3]
    chartData.chartS.datasets[4].data = setsS[4]

    let setsLife = simplePie('Q10', master[6].data, 'none')
    chartData.chartLife.datasets[0].data = [
        setsLife[7] + setsLife[8] + setsLife[9] + setsLife[10],
        setsLife[5] + setsLife[6],
        setsLife[0] + setsLife[1] + setsLife[2] + setsLife[3] + setsLife[4]
    ]
    let setsFinance = simplePie('Q11', master[6].data, 'none')
    chartData.chartFinance.datasets[0].data = setsFinance
    var questions12 = [
        'Q12A',
        'Q12B',
        'Q12C',
        'Q12D',
        'Q12E',
    ]
    let setsExperiences = memes(questions12, master[6].data)
    //Combining 2 fields into one data point
    var newSetE = []
    for (let i = 0; i < setsExperiences[0].length; i++) {
        newSetE.push(setsExperiences[0][i] + setsExperiences[1][i])
    }
    chartData.chartExperiences.datasets[0].data = newSetE
    chartData.chartExperiences.datasets[1].data = setsExperiences[2]
    chartData.chartExperiences.datasets[2].data = setsExperiences[3]

    var questions13 = [
        'Q13A',
        'Q13B',
        'Q13C',
        'Q13D',
        'Q13E',
        'Q13F',
        'Q13G',
        'Q13H'
    ]
    let setsCOL = memes(questions13, master[6].data)
    chartData.chartCOL.datasets[0].data = setsCOL[0]
    chartData.chartCOL.datasets[1].data = setsCOL[1]
    chartData.chartCOL.datasets[2].data = setsCOL[2]
    chartData.chartCOL.datasets[3].data = setsCOL[3]
    chartData.chartCOL.datasets[4].data = setsCOL[4]

    let setsStatement = simplePie('Q14', master[6].data)
    chartData.chartStatement.datasets[0].data = [
        setsStatement[0] + setsStatement[1],
        setsStatement[2] + setsStatement[3],
        setsStatement[4]
    ]

    var questions15 = [
        'Q15A',
        'Q15B',
        'Q15C',
        'Q15D',
        'Q15E'
    ]
    let setsChallenges = memes(questions15, master[6].data)
    chartData.chartChallenges.datasets[0].data = setsChallenges[0]
    chartData.chartChallenges.datasets[1].data = setsChallenges[1]
    chartData.chartChallenges.datasets[2].data = setsChallenges[2]
    chartData.chartChallenges.datasets[3].data = setsChallenges[3]
    
    var questions16 = [
        'Q16A',
        'Q16B',
        'Q16C',
        'Q16D',
        'Q16E',
        'Q16F',
        'Q16G',
        'Q16H',
        'Q16I',
        'Q16J',
        'Q16K',
        'Q16L',
        'Q16M'
    ]
    let setsHealth = memes(questions16, master[6].data)

    //Combining 2 fields into one data point
    var newSetHealth = []
    for (let i = 0; i < setsHealth[0].length; i++) {
        newSetHealth.push(setsHealth[0][i] + setsHealth[1][i])
    }

    chartData.chartHealth.datasets[0].data = setsHealth[0]
    chartData.chartHealth.datasets[1].data = setsHealth[1]
    chartData.chartHealth.datasets[2].data = setsHealth[2]
    chartData.chartHealth.datasets[3].data = setsHealth[3]
    chartData.chartHealth.datasets[4].data = setsHealth[4]

    let setsCharity = simplePie('Q17', master[6].data)
    chartData.chartCharity.datasets[0].data = setsCharity
    let setsVolunteer = simplePie('Q18', master[6].data)
    chartData.chartVolunteer.datasets[0].data = setsVolunteer
    let setsDonations = simplePie('Q20', master[6].data)
    chartData.chartDonations.datasets[0].data = setsDonations

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
                        column="Q3"
                        masterDataset={master[6].data}
                        dataset={chartData.chartVotingPlans}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Would you vote yes or no on a 150 million dollar City of San Antonio bond for Affordable Housing Projects that includes rehabilitating, preserving and producing housing for homeownership or rent, and supportive services for people exiting homelessness?"
                        column="Q4"
                        masterDataset={master[6].data}
                        dataset={chartData.chartAHP}
                        options={pieOptions}
                        reshape="ahp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Some say these issues are problems in the greater San Antonio area. Do you think it's a serious problem, somewhat serious problem or not a serious problem?"
                        columns={questions7}
                        masterDataset={master[6].data}
                        dataset={chartData.chartProblems}
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
                        columns={questions8LP}
                        masterDataset={master[6].data}
                        dataset={chartData.chartLP}
                        options={barOptions_stacked}
                        reshape="lp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Federal Priorities"
                        columns={questions8FP}
                        masterDataset={master[6].data}
                        dataset={chartData.chartFP}
                        options={barOptions_stacked}
                        reshape="fp"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Split on which level of government should lead"
                        columns={questions8S}
                        masterDataset={master[6].data}
                        dataset={chartData.chartS}
                        options={barOptions_stacked}
                        reshape="s"
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="The Cantril Self-Anchoring Scale is a tool used to assess the well-being of a population by asking respondents to rate where their life stands now, and where they think it will be in five years, using a hypothetical ten-point “ladder” scale. By combining a respondents rating we are able able to identify if people feel they are Thriving, Struggling, or Suffering."
                        column="Q10"
                        masterDataset={master[6].data}
                        dataset={chartData.chartLife}
                        options={pieOptions}
                        reshape="life"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="How would you describe your current financial situation?"
                        column="Q11"
                        masterDataset={master[6].data}
                        dataset={chartData.chartFinance}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Have you experienced any of the following over the last 12 months?"
                        columns={questions12}
                        masterDataset={master[6].data}
                        dataset={chartData.chartExperiences}
                        options={barOptions_stacked}
                        reshape="experiences"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="Do you think these things contribute to the rising cost of living in Bexar County?"
                        columns={questions13}
                        masterDataset={master[6].data}
                        dataset={chartData.chartCOL}
                        options={barOptions_stacked}
                        reshape="lp"
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6} xs={12} className="w-100">
                    <PieChart
                        title='Do you agree or disagree with the following statement "Having reliable, high quality child care for young children is crucial for parents to be able to work?"'
                        column="Q11"
                        masterDataset={master[6].data}
                        dataset={chartData.chartStatement}
                        options={pieOptions}
                        reshape="statement"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="What do you think is a challenge when looking for a job?"
                        columns={questions15}
                        masterDataset={master[6].data}
                        dataset={chartData.chartChallenges}
                        options={barOptions_stacked}
                        reshape="challenges"
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <BarChart
                        title="How important do you think each of the following factors are to a person's health?"
                        columns={questions16}
                        masterDataset={master[6].data}
                        dataset={chartData.chartHealth}
                        options={barOptions_stacked}
                        reshape="health"
                    />
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you provided any monetary support to a charitable or non-profit organization in the last year?"
                        column="Q17"
                        masterDataset={master[6].data}
                        dataset={chartData.chartCharity}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you or anyone in your household provided volunteer support to a charitable or non-profit organization in the last year?"
                        column="Q18"
                        masterDataset={master[6].data}
                        dataset={chartData.chartVolunteer}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={6} xs={12} className="w-100">
                    <PieChart
                        title="Were some or all of your charitable donations in 2021 benefiting a community in Bexar County?"
                        column="Q20"
                        masterDataset={master[6].data}
                        dataset={chartData.chartDonations}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
        </Container>
    )
}