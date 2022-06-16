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
    let setsFinance = simplePie('Q11', master[6].data, 'none')
    var questions12 = [
        'Q12A',
        'Q12B',
        'Q12C',
        'Q12D',
        'Q12E',
    ]
    let setsExperiences = memes(questions12, master[6].data)
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
    let setsStatement = simplePie('Q14', master[6].data)
    var questions15 = [
        'Q15A',
        'Q15B',
        'Q15C',
        'Q15D',
        'Q15E'
    ]
    let setsChallenges = memes(questions15, master[6].data)
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
    let setsCharity = simplePie('Q17', master[6].data)
    let setsVolunteer = simplePie('Q18', master[6].data)
    let setsDonations = simplePie('Q20', master[6].data)

    var dataLife = {
        labels: [
            'Thriving',
            'Struggling',
            'Suffering'
        ],
        datasets: [
            {
                label: "",
                data: [
                    setsLife[7] + setsLife[8] + setsLife[9] + setsLife[10],
                    setsLife[5] + setsLife[6],
                    setsLife[0] + setsLife[1] + setsLife[2] + setsLife[3] + setsLife[4]
                ],
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var dataFinance = {
        labels: [
            'Living Comfortably',
            'Meeting living expenses',
            'Only just meeting living expenses',
            'Having trouble meeting expenses',
            'I do not know'
        ],
        datasets: [
            {
                label: "",
                data: setsFinance,
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                    'rgb(233, 168, 34)',
                    'rgb(235, 223, 203)',
                ]
            }
        ]
    }

    var dataStatement = {
        labels: [
            'Agree',
            'Disagree',
            'I do not know'
        ],
        datasets: [
            {
                label: "",
                data: [
                    setsStatement[0] + setsStatement[1],
                    setsStatement[2] + setsStatement[3],
                    setsStatement[4]
                ],
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var dataCharity = {
        labels: [
            'Yes',
            'No',
            'I do not know'
        ],
        datasets: [
            {
                label: "",
                data: setsCharity,
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var dataVolunteer = {
        labels: [
            'Yes',
            'No',
            'I do not know'
        ],
        datasets: [
            {
                label: "",
                data: setsVolunteer,
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var dataDonations = {
        labels: [
            'Yes',
            'No',
            'I do not know'
        ],
        datasets: [
            {
                label: "",
                data: setsDonations,
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    //Combining 2 fields into one data point
    var newSetE = []
    for (let i = 0; i < setsExperiences[0].length; i++) {
        newSetE.push(setsExperiences[0][i] + setsExperiences[1][i])
    }
    var dataExperiences = {
        labels: [
            ['Skipped meals because you', 'couldn’t afford food'],
            'Postponed medical or dental care',
            ['Had to change your living arrangements', 'because you couldn’t afford your', 'rent or mortgage'],
            ['Have looked for, but been unable', 'to find affordable childcare'],
            ['Held off from making a large purchase', 'such as a car or a home']
        ],
        datasets: [
            {
                label: 'Yes',
                data: newSetE,
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
                label: 'No',
                data: setsExperiences[2],
                backgroundColor: 'rgb(196, 99, 0)',
            },
            {
                label: 'I do not know',
                data: setsExperiences[3],
                backgroundColor: 'rgb(66, 116, 200)',
            }
        ]
    }

    var dataCOL = {
        labels: [
            ['Landlords raising the price', 'of rent to maximize profits'],
            ['Disruptions in the supply chain', 'of materials and goods'],
            ['Forced closures of businesses during the', 'COVID-19 pandemic the last two years'],
            'A lack of high-paying jobs in the area',
            ['Not enough affordable housing', 'to meet the local demand'],
            ['Sanctions against Russia forbidding', 'the import of crude oil and petroleum'],
            ['Price gouging from companies', 'on essential goods'],
            'Labor shortages'
        ],
        datasets: [
            {
                label: 'Major Reason',
                data: setsCOL[0],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
                label: 'Minor Reason',
                data: setsCOL[1],
                backgroundColor: 'rgb(196, 99, 0)',
            },
            {
                label: 'Not much of a Reason',
                data: setsCOL[2],
                backgroundColor: 'rgb(66, 116, 200)',
            },
            {
                label: 'Not a Reason',
                data: setsCOL[3],
                backgroundColor: 'rgb(233, 168, 34)'
            },
            {
                label: 'I do not know',
                data: setsCOL[4],
                backgroundColor: 'rgb(235, 223, 203)'
            }
        ]
    }

    var dataChallenges = {
        labels: [
            'Finding affordable childcare',
            ['Finding a job that pays sufficiently', 'or gives enough hours'],
            ['Receiving more in unemployment benefits', 'than a job would pay'],
            ['A lack of good, mid-level jobs', 'that are not starting positions'],
            'A lack of job training or skill-building programs',
        ],
        datasets: [
            {
                label: 'Major Challenge',
                data: setsChallenges[0],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
                label: 'Minor Challenge',
                data: setsChallenges[1],
                backgroundColor: 'rgb(196, 99, 0)',
            },
            {
                label: 'Not a Challenge',
                data: setsChallenges[2],
                backgroundColor: 'rgb(66, 116, 200)',
            },
            {
                label: 'I do not know',
                data: setsChallenges[3],
                backgroundColor: 'rgb(233, 168, 34)'
            }
        ]
    }
    //Combining 2 fields into one data point

    var newSetHealth = []
    for (let i = 0; i < setsHealth[0].length; i++) {
        newSetHealth.push(setsHealth[0][i] + setsHealth[1][i])
    }

    var dataHealth = {
        labels: [
            'Lack of access to high-quality medical care',
            'Having a low income',
            'High stress',
            'Lack of access to high-quality, healthy food',
            'Not having health insurance',
            'Smoking',
            'Personal behavioral choices',
            'Being exposed to air, water or chemical pollution',
            'Bad genes',
            'Poor neighborhood and housing conditions',
            'Not having enough opportunity for education',
            'Racism and discrimination',
            'Family violence',
        ],
        datasets: [
            {
                label: 'Important',
                data: newSetHealth,
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
                label: 'Somewhat Important',
                data: setsHealth[2],
                backgroundColor: 'rgb(196, 99, 0)',
            },
            {
                label: 'Not Too Important',
                data: setsHealth[3],
                backgroundColor: 'rgb(66, 116, 200)',
            },
            {
                label: 'Not At All Important',
                data: setsHealth[4],
                backgroundColor: 'rgb(233, 168, 34)'
            },
            {
                label: 'I do not know',
                data: setsHealth[5],
                backgroundColor: 'rgb(235, 223, 203)',
            }
        ]
    }

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
                        dataset={dataLife}
                        options={pieOptions}
                        reshape="life"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="How would you describe your current financial situation?"
                        column="Q11"
                        masterDataset={master[6].data}
                        dataset={dataFinance}
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
                        dataset={dataExperiences}
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
                        dataset={dataCOL}
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
                        dataset={dataStatement}
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
                        dataset={dataChallenges}
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
                        dataset={dataHealth}
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
                        dataset={dataCharity}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
                <Col lg={6} xs={12}>
                    <PieChart
                        title="Have you or anyone in your household provided volunteer support to a charitable or non-profit organization in the last year?"
                        column="Q18"
                        masterDataset={master[6].data}
                        dataset={dataVolunteer}
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
                        dataset={dataDonations}
                        options={pieOptions}
                        reshape="none"
                    />
                </Col>
            </Row>
        </Container>
    )
}