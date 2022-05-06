import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { memes, simplePie, countUnique, getColumn, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent} from '../../lib/myfuncs'
import { useEffect, useState, MouseEvent, useRef } from 'react'
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getClientBuildManifest } from 'next/dist/client/route-loader';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'

export async function getStaticProps() {
    const master = await getMaster()
    return({props: {master}})
}
  
export default function Poll7({master}) {
    const router = useRouter()
    const chartRefChallenges = useRef(null)
    const chartRefHealth = useRef(null)
    const chartRefExperiences = useRef(null)
    const chartRefCOL = useRef(null)
    const chartRefProblems = useRef(null)
    const chartRefVotingPlans = useRef(null)
    const chartRefAHP = useRef(null)
    const chartRefLife = useRef(null)
    const chartRefFinance = useRef(null)
    const chartRefStatement = useRef(null)
    const chartRefCharity = useRef(null)
    const chartRefVolunteer = useRef(null)
    const chartRefDonations = useRef(null)
    const chartRefLP = useRef(null)
    const chartRefFP = useRef(null)
    const chartRefS = useRef(null)


const onClickChallenges = (event) => {
    const { current: chart } = chartRefChallenges;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickHealth = (event) => {
    const { current: chart } = chartRefHealth;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickExperiences = (event) => {
    const { current: chart } = chartRefExperiences;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickCOL = (event) => {
    const { current: chart } = chartRefCOL;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickProblems = (event, filter) => {
    const { current: chart } = chartRefProblems;
    if (!chart) {
      return;
    }
    let sets = memes(questions7, master[6].data, filter)
    //Combining Very Serious and Serious into one data point
    var newSet = []
    for(let i = 0; i < sets[0].length; i++) {
        newSet.push(sets[0][i] + sets[1][i])
    }

    chart.config.data.datasets[0].data = newSet
    chart.config.data.datasets[1].data = sets[2]
    chart.config.data.datasets[2].data = sets[3]
    chart.config.data.datasets[3].data = sets[4]



    console.log(chart.config.data.datasets[0].data)
    chart.update()
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickVotingPlans = (event, filter) => {
    const { current: chart } = chartRefVotingPlans;
    console.log(filter)
    if (!chart) {
      return;
    }
    chart.config.data.datasets[0].data = simplePie('Q3', master[6].data, filter)
    console.log(chart.config.data.datasets[0].data)
    chart.update()
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickAHP = (event, filter) => {
    const { current: chart } = chartRefAHP;
    if (!chart) {
      return;
    }
    let set = simplePie('Q4', master[6].data, filter)
    chart.config.data.datasets[0].data = [
        set[0] + set[1] + set[2],
        set[3] + set[4] + set[5],
        set[6]
    ]
    console.log(chart.config.data.datasets[0].data)
    chart.update()
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickLife = (event) => {
    const { current: chart } = chartRefLife;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickFinance = (event) => {
    const { current: chart } = chartRefFinance;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickStatement = (event) => {
    const { current: chart } = chartRefStatement;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickCharity = (event) => {
    const { current: chart } = chartRefCharity;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickVolunteer = (event) => {
    const { current: chart } = chartRefVolunteer;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickDonations = (event) => {
    const { current: chart } = chartRefDonations;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickLP = (event) => {
    const { current: chart } = chartRefLP;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickFP = (event) => {
    const { current: chart } = chartRefFP;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickS = (event) => {
    const { current: chart } = chartRefS;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  
  

 
    let setsVotingPlans = simplePie('Q3', master[6].data, 'none')
    let setsAHP = simplePie('Q4', master[6].data, 'none')
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
    let questions8LP = [
        'Q8C',
        'Q8E',
        'Q8K',
        'Q8L',
        'Q8O',
        'Q8P'
    ]
    let setsLP = memes(questions8LP, master[6].data)

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

    var dataVotingPlans = {
        labels: [
            'In person, on the day of the election',
            'In person, before the day of the election',
            'By mail',
            'Do not plan on voting',
            'I do not know',
        ],
        datasets: [
            {
                label: "",
                data: setsVotingPlans,
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

    var dataAHP = {
        labels: [
            'Yes',
            'No',
            'I do not know'
        ],
        datasets: [ 
            {
                label: "",
                data: [
                    setsAHP[0] + setsAHP[1] + setsAHP[2],
                    setsAHP[3] + setsAHP[4] + setsAHP[5],
                    setsAHP[6]
                ],
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var dataLife = {
        labels: [
            'Thriving',
            'Struggling',
            'Suffering'
        ],
        datasets: [
            {
                label: "",
                data: [47, 48, 5],
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
                data: [35, 35, 18, 11, 1],
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
                data: [84, 11, 5],
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
                data: [72, 26, 2],
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
                data: [54, 43, 4],
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
                data: [78, 16, 6],
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    //Combining Very Serious and Serious into one data point
    var newSet = []
    for(let i = 0; i < setsProblems[0].length; i++) {
        newSet.push(setsProblems[0][i] + setsProblems[1][i])
    }
    var dataProblems = {
        labels: [
            'The cost of housing for middle- and working-class families',
            'Increasing cost of living',
            'Inadequate public transit service options',
            'The cost of healthcare',
            'Homelessness',
            'A lack of high-quality child care options for working families',
            'Climate change',
            'Unemployment',
            'A lack of high-speed internet options in the area',
            'The rising price of gas',
            'The amount you pay in local property taxes',
            'An increase in property crimes, such as burglary and theft',
            'The affordability of high-speed internet in the area',
            'The rising price of food',
            'The amount you pay in local utility rates',
            'An increase in violent crimes'
        ],
        datasets: [
            {
              label: 'Serious',
              data: newSet,
              backgroundColor: 'rgb(12, 38, 96)',
            },
            {
              label: 'Somewhat Serious',
              data: setsProblems[2],
              backgroundColor: 'rgb(196, 99, 0)',
          },
          {
              label: 'Not Serious',
              data: setsProblems[3],
              backgroundColor: 'rgb(66, 116, 200)',
          },
          {
            label: 'I do not know',
            data: setsProblems[4],
            backgroundColor: 'rgb(233, 168, 34)'
          }
        ]
    }

    var dataLP = {
        labels: [
            'Inadequate public transit service options',
            'Homelessness',
            'The amount you pay in local property taxes',
            'An increase in property crimes, such as burglary and theft',
            'The amount you pay in local utility rates',
            'An increase in violent crimes'
        ],
        datasets: [
            {
                label: 'Local Governmnet',
                data: setsLP[0],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
              label: 'Texas Government',
              data: setsLP[1],
              backgroundColor: 'rgb(196, 99, 0)',
            },
            {
              label: 'Federal Government',
              data: setsLP[2],
              backgroundColor: 'rgb(66, 116, 200)',
          },
          {
              label: 'Not a Government Problem',
              data: setsLP[3],
              backgroundColor: 'rgb(233, 168, 34)',
          },
          {
            label: 'I do not know',
            data: setsLP[4],
            backgroundColor: 'rgb(235, 223, 203)',
          }
        ]
    }

    var dataFP = {
        labels: [
            'Increasing cost of living',
            'The cost of healthcare',
            'Climate change',
            'The rising price of gas',
            'The rising price of food',
        ],
        datasets: [
            {
                label: 'Local Governmnet',
                data: [16, 6, 6, 5, 11],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
              label: 'Texas Government',
              data: [28, 22, 12, 16, 21],
              backgroundColor: 'rgb(196, 99, 0)',
            },
            {
              label: 'Federal Government',
              data: [50, 66, 55, 73, 60],
              backgroundColor: 'rgb(66, 116, 200)',
          },
          {
              label: 'Not a Government Problem',
              data: [4, 4, 22, 3, 5],
              backgroundColor: 'rgb(233, 168, 34)',
          },
          {
            label: 'I do not know',
            data: [2, 2, 5, 3, 3],
            backgroundColor: 'rgb(235, 223, 203)',
          }
        ]
    }

    var dataS = {
        labels: [
            'The cost of housing for middle- and working-class families',
            'A lack of high-quality child care options for working families',
            'Unemployment',
            'A lack of high-speed internet options in the area',
            'The affordability of high-speed internet in the area'
        ],
        datasets: [
            {
                label: 'Local Governmnet',
                data: [31, 36, 23, 43, 38],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
              label: 'Texas Government',
              data: [36, 29, 41, 25, 24],
              backgroundColor: 'rgb(196, 99, 0)',
            },
            {
              label: 'Federal Government',
              data: [24, 18, 26, 10, 12],
              backgroundColor: 'rgb(66, 116, 200)',
          },
          {
              label: 'Not a Government Problem',
              data: [6, 11, 8, 18, 20],
              backgroundColor: 'rgb(233, 168, 34)',
          },
          {
            label: 'I do not know',
            data: [3, 6, 3, 5, 5],
            backgroundColor: 'rgb(235, 223, 203)',
          }
        ]
    }
    
    // var newSetExperiences = []
    // for(let i = 0; i < setsHealth[0].length; i++) {
    //     newSetExperiences.push(setsHealth[0][i] + setsHealth[1][i])
    // }
    var dataExperiences = {
        labels: [
            'Skipped meals because you couldn’t afford food',
            'Postponed medical or dental care',
            ['Had to change your living arrangements', 'because you couldn’t afford your', 'rent or mortgage'],
            'Have looked for, but been unable to find affordable childcare',
            ['Held off from making a large purchase', 'such as a car or a home']
        ],
        datasets: [
            {
                label: 'Yes',
                data: [20, 53, 29, 22, 57],
                backgroundColor: 'rgb(12, 38, 96)',
            },
            {
              label: 'No',
              data: [78, 45, 69, 66, 39],
              backgroundColor: 'rgb(196, 99, 0)',
          },
          {
              label: 'I do not know',
              data: [2,2,2,12,3],
              backgroundColor: 'rgb(66, 116, 200)',
          }
        ]
    }

    var dataCOL = {
        labels: [
            'Landlords raising the price of rent to maximize profits',
            'Disruptions in the supply chain of materials and goods',
            ['Forced closures of businesses during the','COVID-19 pandemic the last two years'],
            'A lack of high-paying jobs in the area',
            'Not enough affordable housing to meet the local demand',
            ['Sanctions against Russia forbidding', 'the import of crude oil and petroleum'],
            'Price gouging from companies on essential goods',
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
              'Finding a job that pays sufficiently or gives enough hours',
              'Receiving more in unemployment benefits than a job would pay',
              'A lack of good, mid-level jobs that are not starting positions',
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

    var newSetHealth = []
    for(let i = 0; i < setsHealth[0].length; i++) {
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
                backgroundColor:'rgb(12, 38, 96)',
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
                    font: {
                        size: 14
                    }
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
                    label: function(context){
                      var data = context.dataset.data,
                          label = context.label,
                          currentValue = context.raw,
                          total = 0;
            
                    //   for( var i = 0; i < data.length; i++ ){
                    //     total += data[i];
                    //   }
                       var percentage = parseFloat((currentValue).toFixed(1));
            
                      return label + ": ("  + percentage + '%)';
                    }
                }
            
            },
            datalabels: {
                display: function(context) {
                    return context.dataset.data[context.dataIndex] > 8;
                  },
                  formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value).toFixed(0)+"%";
                    return percentage;
                },                
                color: "white"
              },
            legend:{
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
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Click legend to interact!'
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context){
                      var data = context.dataset.data,
                          label = context.label,
                          currentValue = context.raw,
                          total = 0;
            
                    //   for( var i = 0; i < data.length; i++ ){
                    //     total += data[i];
                    //   }
                       var percentage = parseFloat((currentValue).toFixed(1));
            
                      return label + ": ("  + percentage + '%)';
                    }
                }
            
            },
            datalabels: {
                font: {
                    size: 20
                },
                display: function(context) {
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
            legend:{
                display: true,
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
        },
    }


    return(

        <div className={styles.grid}>
            <div className={styles.card}>
                <h3>How do you plan on voting in this year&apos;s elections?</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Demographics
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'none')}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Gender</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'male')}>Male</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'female')}>Female</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Race</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'hispanic')}>Hispanic</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'black')}>African American or Black</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickVotingPlans(e, 'white')}>Caucasian or White</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Chart
                    ref={chartRefVotingPlans}
                    options={pieOptions}
                    type='pie'
                    // onClick={onClickVotingPlans}
                    data={dataVotingPlans}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.card}>
                <h3>Would you vote yes or no on a 150 million dollar City of San Antonio bond for Affordable Housing Projects that includes rehabilitating, preserving and producing housing for homeownership or rent, and supportive services for people exiting homelessness?</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Demographics
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'none')}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Gender</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'male')}>Male</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'female')}>Female</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Race</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'hispanic')}>Hispanic</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'black')}>African American or Black</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickAHP(e, 'white')}>Caucasian or White</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Chart
                    ref={chartRefAHP}
                    options={pieOptions}
                    type='pie'
                    // onClick={onClickAHP}
                    data={dataAHP}
                    plugins={[ChartDataLabels]}
                />
            </div>
        
            <div className={styles.chart}>
                <h3>Some say these issues are problems in the greater San Antonio area. Do you think it&apos;s a serious problem, somewhat serious problem or not a serious problem?</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Demographics
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'none')}>All</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Gender</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'male')}>Male</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'female')}>Female</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Race</Dropdown.Header>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'hispanic')}>Hispanic</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'black')}>African American or Black</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => onClickProblems(e, 'white')}>Caucasian or White</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Chart 
                    ref={chartRefProblems}
                    options={barOptions_stacked}
                    type='bar'
                    // onClick={onClickProblems}
                    data={dataProblems} 
                    plugins={[ChartDataLabels]}

                />
            </div>
            <div>
                <h2>For the following 3 charts, respondents were asked:  Which government level do you think should take the lead in addressing the stated issue?</h2>
            </div>
            <div className={styles.chart}>
                <h3>Local Priorities</h3>
                <Chart 
                    ref={chartRefLP}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickLP}
                    data={dataLP} 
                    plugins={[ChartDataLabels]}

                />
            </div>
            <div className={styles.chart}>
                <h3>Federal Priorities</h3>
                <Chart 
                    ref={chartRefFP}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickFP}
                    data={dataFP} 
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.chart}>
                <h3>Split on which level of government should lead</h3>
                <Chart 
                    ref={chartRefS}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickS}
                    data={dataS}
                    plugins={[ChartDataLabels]}

                />
            </div>
            <div className={styles.card}>
                <h3>The Cantril Self-Anchoring Scale is a tool used to assess the well-being of a population by asking respondents to rate where their life stands now, and where they think it will be in five years, using a hypothetical ten-point “ladder” scale. By combining a respondents rating we are able able to identify if people feel they are Thriving, Struggling, or Suffering.</h3>
                <Chart 
                    ref={chartRefLife}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickLife}
                    data={dataLife}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.card}>
                <h3>How would you describe your current financial situation?</h3>
                <Chart 
                    ref={chartRefFinance}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickFinance}
                    data={dataFinance} 
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.chart}>
                <h3>Have you experienced any of the following over the last 12 months?</h3>
                <Chart 
                    ref={chartRefExperiences}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickExperiences}
                    data={dataExperiences}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.chart}>
                <h3>Do you think these things contribute to the rising cost of living in Bexar County?</h3>
                <Chart 
                    ref={chartRefCOL}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickCOL}
                    data={dataCOL}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.card}>
                <h3>Do you agree or disagree with the following statement &quot;Having reliable, high quality child care for young children is crucial for parents to be able to work?&quot;</h3>
                <Chart 
                    ref={chartRefStatement}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickStatement}
                    data={dataStatement} 
                    plugins={[ChartDataLabels]}

                />
            </div>
            <div className={styles.chart}>
                <h3>What do you think is a challenge when looking for a job?</h3>
                <Chart 
                    ref={chartRefChallenges}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickChallenges}
                    data={dataChallenges}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.chart}>
                <h3>How important do you think each of the following factors are to a person&apos;s health?</h3>
                <Chart 
                    ref={chartRefHealth}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickHealth}
                    data={dataHealth}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.card}>
                <h3>Have you provided any monetary support to a charitable or non-profit organization in the last year?</h3>
                <Chart 
                    ref={chartRefCharity}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickCharity}
                    data={dataCharity}
                    plugins={[ChartDataLabels]}
                />
            </div>
            <div className={styles.card}>
                <h3>Have you or anyone in your household provided volunteer support to a charitable or non-profit organization in the last year?</h3>
                <Chart 
                    ref={chartRefVolunteer}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickVolunteer}
                    data={dataVolunteer}
                    plugins={[ChartDataLabels]}

                />
            </div>
            <div className={styles.card}>
                <h3>Were some or all of your charitable donations in 2021 benefiting a community in Bexar County?</h3>
                <Chart 
                    ref={chartRefDonations}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickDonations}
                    data={dataDonations} 
                    plugins={[ChartDataLabels]}

                /> 
            </div>
        </div>
    )


  }