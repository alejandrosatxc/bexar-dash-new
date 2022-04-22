import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { useEffect, useState, MouseEvent, useRef } from 'react'


import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import { getClientBuildManifest } from 'next/dist/client/route-loader';


export async function getStaticProps() {
    const master = await getMaster()
    return({props: {master}})
}

export function countUnique(arr) {
    const counts = {};
     for (var i = 0; i < arr.length; i++) {
        counts[arr[i]] = 1 + (counts[arr[i]] || 0);
     };
     return counts;
  }
  
export function getColumn(dataArr, colName) {
    const cols = []
    dataArr.forEach(row => {
      cols.push(row[colName])
    })
    return cols
}

const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(data.datasets[datasetIndex].label);
};

  const printElementAtEvent = (element) => {
    if (!element.length) return;
    const { datasetIndex, index } = element[0];
    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
};

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;
    console.log(elements.length);
};

const memes = (arrQuestions, dataSheet) => {
    var cols = []
    arrQuestions.forEach(q => {
        cols.push(getColumn(dataSheet, q)) //get data from poll 7
    })
    var counts = []
    cols.forEach(col => {
        counts.push(countUnique(col)) //array of objects
    })
    var sets = [...Array(counts.length)].map(e => Array(counts[0].length))
    for(let i = 0; i < counts.length; i++) {
        let k = 0
        let total = 0
        for(let key in counts[i]) {
            total = total + counts[i][key]
        }
        if('' in counts[i]) {
            total = total - counts[i]['']
        }
        for(let key in counts[i]) {
            sets[k][i] = (counts[i][key] / total) * 100
            k = k + 1
        }
    }
    return sets
}

const simplePie = (question, datasheet) => {
    let set = []
    let col = getColumn(datasheet, question)
    let counts = countUnique(col)
    var total = 0
    for(let key in counts) {
        total = total + counts[key]
    }
    if('' in counts) {
        total = total - counts['']
    }
    var i = 0
    for(let key in counts) {
        set[i] = (counts[key] / total) * 100
        i = i + 1
    }

    return set
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

  const onClickProblems = (event) => {
    const { current: chart } = chartRefProblems;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickVotingPlans = (event) => {
    const { current: chart } = chartRefVotingPlans;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const onClickAHP = (event) => {
    const { current: chart } = chartRefAHP;
    if (!chart) {
      return;
    }
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

 
    let setsVotingPlans = simplePie('Q3', master[6].data)
    let setsAHP = simplePie('Q4', master[6].data)
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
    let setsProblems = memes(questions7, master[6].data)   
    // var questions8LP = [
    //     'Q8C',
    //     'Q8E',
    //     'Q8K',
    //     'Q8L',
    //     'Q8O',
    //     'Q8P',
    // ]
    // let setsLocalPriorities = memes(questions8LP, master[6].data)
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
            'In perosn, on the day of the election',
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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(100, 100, 100)',
                    'rgb(0, 0, 0)',
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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(0, 0, 0)'
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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(0, 0, 0)'
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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(100, 100, 100)',
                    'rgb(0, 0, 0)',
                ]
            }
        ]
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
                label: 'Extremly Serious',
                data: setsProblems[0],
                backgroundColor: "rgba(255, 0, 0, 0.8)",
            },
            {
              label: 'Very Serious',
              data: setsProblems[1],
              backgroundColor: "rgba(0, 0, 255, 0.8)",
            },
            {
              label: 'Somewhat Serious',
              data: setsProblems[2],
              backgroundColor: "rgba(0, 255, 0, 0.8)",
          },
          {
              label: 'Not Serious',
              data: setsProblems[3],
              backgroundColor: "rgba(0, 255, 255, 0.8)",
          },
          {
            label: 'I do not know',
            data: setsProblems[4],
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }
        ]
    }

    var dataExperiences = {
        labels: [
            'Skipped meals because you couldn’t afford food',
            'Postponed medical or dental care',
            ['Had to change your living arrangements', 'because you couldn’t afford your', 'rent or mortgage'],
            'Have looked for, but been unable to find affordable childcare',
            'Held off from making a large purchase such as a car or a home',
        ],
        datasets: [
            {
                label: 'Yes',
                data: setsExperiences[0],
                backgroundColor: "rgba(255, 0, 0, 0.8)",
            },
            {
              label: 'Yes, a family member or friend',
              data: setsExperiences[1],
              backgroundColor: "rgba(0, 0, 255, 0.8)",
            },
            {
              label: 'No',
              data: setsExperiences[2],
              backgroundColor: "rgba(0, 255, 0, 0.8)",
          },
          {
              label: 'I do not know',
              data: setsExperiences[3],
              backgroundColor: "rgba(0, 0, 0, 0.8)",
          }
        ]
    }

    var dataCOL = {
        labels: [
            'Landlords raising the price of rent to maximize profits',
            'Disruptions in the supply chain of materials and goods',
            'Forced closures of businesses during the COVID-19 pandemic the last two years',
            'A lack of high-paying jobs in the area',
            'Not enough affordable housing to meet the local demand',
            'Sanctions against Russia forbidding the import of crude oil and petroleum',
            'Price gouging from companies on essential goods',
            'Labor shortages'
        ],
        datasets: [
            {
                label: 'Major Reason',
                data: setsCOL[0],
                backgroundColor: "rgba(255, 0, 0, 0.8)",
            },
            {
              label: 'Minor Reason',
              data: setsCOL[1],
              backgroundColor: "rgba(0, 0, 255, 0.8)",
            },
            {
              label: 'Not much of a Reason',
              data: setsCOL[2],
              backgroundColor: "rgba(0, 255, 0, 0.8)",
          },
          {
            label: 'Not a Reason',
            data: setsCOL[3],
            backgroundColor: "rgba(0, 255, 255, 0.8)",
        },
          {
              label: 'I do not know',
              data: setsCOL[4],
              backgroundColor: "rgba(0, 0, 0, 0.8)",
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
                  backgroundColor: "rgba(255, 0, 0, 0.8)",
              },
              {
                label: 'Minor Challenge',
                data: setsChallenges[1],
                backgroundColor: "rgba(0, 0, 255, 0.8)",
              },
              {
                label: 'Not a Challenge',
                data: setsChallenges[2],
                backgroundColor: "rgba(0, 255, 0, 0.8)",
            },
            {
                label: 'I do not know',
                data: setsChallenges[3],
                backgroundColor: "rgba(0, 0, 0, 0.8)",
            }
          ]
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
                label: 'Extremly Important',
                data: setsHealth[0],
                backgroundColor: "rgba(255, 0, 0, 0.8)",
            },
            {
              label: 'Very Important',
              data: setsHealth[1],
              backgroundColor: "rgba(0, 0, 255, 0.8)",
            },
            {
              label: 'Somewhat Important',
              data: setsHealth[2],
              backgroundColor: "rgba(0, 255, 0, 0.8)",
          },
          {
              label: 'Not Too Important',
              data: setsHealth[3],
              backgroundColor: "rgba(0, 255, 255, 0.8)",
          },
          {
            label: 'Not At All Important',
            data: setsHealth[4],
            backgroundColor: "rgba(255, 0, 255, 0.8)",
          },
          {
            label: 'I do not know',
            data: setsHealth[5],
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }
        ]
    }

      var barOptions_stacked = {
        indexAxis: 'y',
        tooltips: {
            enabled: false
        },
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
                stacked: true
            }
        },
        legend:{
            display: true
        },
    }

    var pieOptions = {
        plugins: {
            title: {
                display: false
            }
        }
    }

    return(
        <div className={styles.grid}>
            <div className={styles.card}>
                <h2>Do you plan on voting in this year&apos;s election?</h2>
                <Chart 
                    ref={chartRefVotingPlans}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickVotingPlans}
                    data={dataVotingPlans} 
                    height={100}
                    width={100}
                />
            </div>
            <div className={styles.card}>
                <h2>Do you think you would vote yes or no on a 150 million dollar bond for Affordable Housing
Projects?</h2>
                <Chart 
                    ref={chartRefAHP}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickAHP}
                    data={dataAHP} 
                    height={100}
                    width={50}
                />
            </div>
            <div className={styles.card}>
                <h2>Do you feel you are Thriving, Struggling, or Suffering in where you are in life right now?</h2>
                <Chart 
                    ref={chartRefLife}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickLife}
                    data={dataLife} 
                    height={100}
                    width={50}
                />
            </div>
            <div className={styles.card}>
                <h2>How would you describe your current financial situation?</h2>
                <Chart 
                    ref={chartRefFinance}
                    options={pieOptions}
                    type='pie'
                    onClick={onClickFinance}
                    data={dataFinance} 
                    height={100}
                    width={50}
                />
            </div>
            <div className={styles.card}>
                <h2>What do you think are problems in the greater San Antonio Area?</h2>
                <Chart 
                    ref={chartRefProblems}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickProblems}
                    data={dataProblems} 
                    height={400}
                    width={800}
                />
            </div>
            <div className={styles.card}>
                <h2>Have you experienced any of the following?</h2>
                <Chart 
                    ref={chartRefExperiences}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickExperiences}
                    data={dataExperiences} 
                    height={400}
                    width={800}
                />
            </div>
            <div className={styles.card}>
                <h2>What do you think are reasons for the increasing cost of living in Bexar County?</h2>
                <Chart 
                    ref={chartRefCOL}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickCOL}
                    data={dataCOL} 
                    height={400}
                    width={800}
                />
            </div>
            <div className={styles.card}>
                <h2>What do you think is a challenge?</h2>
                <Chart 
                    ref={chartRefChallenges}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickChallenges}
                    data={dataChallenges} 
                    height={300}
                    width={800}
                />
            </div>
            <div className={styles.card}>
                <h2>How important do you think each of the following factors are to a person’s health?</h2>
                <Chart 
                    ref={chartRefHealth}
                    options={barOptions_stacked}
                    type='bar'
                    onClick={onClickHealth}
                    data={dataHealth} 
                    height={500}
                    width={800}
                />
            </div>
        </div>
    )


  }