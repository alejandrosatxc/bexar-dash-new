import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState, MouseEvent, useRef } from 'react'
//import Chart from 'chart.js/auto';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Legend,
//   Tooltip,
//   ArcElement,
//   PieController,
// // } from 'chart.js';
import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'


// import { Pie } from 'react-chartjs-2';
 import {
   Chart,
   getDatasetAtEvent,
   getElementAtEvent,
   getElementsAtEvent,
 } from 'react-chartjs-2';

//  ChartJS.register(
//   LinearScale,
//   CategoryScale,
//   ArcElement,
//   PieController,
//   BarElement,
//   PointElement,
//   LineElement,
//   Legend,
//   Tooltip
// );

import 'chart.js/auto';
//import { Chart } from 'react-chartjs-2';

export const options = {
  scales: {
    y: {
      title: {
        display: true,
        text: "Number of Votes"
      }
    }
  },
  plugins: {
    title: {
      display: true,
      text: 'Click legend to interact!'
    }
  }
}

export const optionsProblems = {
  plugins: {
    title: {
      display: true,
      text: 'Poll 1'
    }
  }
}

export const optionsProblems2 = {
  plugins: {
    title: {
      display: true,
      text: 'Poll 2'
    }
  }
}

export const optionsApprovals = {
  scales: {      
    y: {
        min: 35,
        max: 85,
        title: {
          display: true,
          text: "Percentage"
        }
    }
  },
}



export async function getStaticProps() {
  require('dotenv').config()
  const { GoogleSpreadsheet } = require('google-spreadsheet')
  let key = process.env.SHEETS_API_KEY
  let buff = new Buffer(key, 'base64')
  let string = buff.toString('ascii')
  const creds = JSON.parse(string)
  //const creds = require('./client_secret.json')

  const doc = new GoogleSpreadsheet('1m1jRRUXQTYv8MdTaXmzqzNxYYuHlwaX3CAzKrxsTqes')

  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo(); // loads document properties and worksheets
  //console.log(doc.title);
  // const sheet = doc.sheetsByIndex[3]; // or use doc.sheetsById[id]
  // console.log(sheet.title);
  // console.log(sheet.rowCount);
  const master = []
  //console.log(doc.sheetsByIndex)

  // doc.sheetsByIndex.forEach(sheet => {
  for(const sheet of doc.sheetsByIndex) {
    const rows = await sheet.getRows({
      offset: 0
    })
    var GSdata = []
    rows.forEach(row => {
      var row = {
        BEXAR: row.BEXAR, 
        COSA: row.COSA, 
        NIRENBERG: row.NIRENBERG, 
        WOLFF: row.WOLFF,
        ABBOT: row.ABBOT,
        CC: row.CC,
        COUNCIL: row.COUNCIL,
        SAWS: row.SAWS,
        CPS: row.CPS,
        VIA: row.VIA,
        AGE: row.AGE,
        RACE: row.RACE,
        SEX: row.SEX,
        CRIME: row.CRIME,
        HOMELESSNESS: row.HOMELESSNESS,
        PROPERTY_TAXES: row.PROPERTY_TAXES
      }
      GSdata.push(row)
    })
    const sheetdata = { title : sheet.title, data: GSdata }
    master.push(sheetdata)
  // })
  }

  // console.log(GSdata) 
  return({ props: { master } })
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

export default function Home({ master }) {

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

  const chartRefBEXAR = useRef(null);
  const chartRefCOSA = useRef(null);
  const chartRefApprovals = useRef(null);
  const chartRefProblems = useRef(null);
  const chartRefCrime = useRef(null)

  const onClickBEXAR = (event) => {
    const { current: chart } = chartRefBEXAR;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickCOSA = (event) => {
    const { current: chart } = chartRefCOSA;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const onClickApprovals = (event) => {
    const { current: chart } = chartRefApprovals;
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


  const onClickProblems2 = (event) => {
    const { current: chart } = chartRefProblems;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const dataSets = { 
    BEXAR: [], 
    COSA: [], 
    NIRENBERG: [], 
    WOLFF: [], 
    ABBOT: [],
    CC: [],
    COUNCIL: [],
    SAWS: [],
    CPS: [],
    VIA: [],
    PROPERTY_TAXES: [],
    CRIME: [],
  }
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'BEXAR')
    var counts = countUnique(coldata)
    dataSets.BEXAR.push(counts)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'COSA')
    var counts = countUnique(coldata)
    dataSets.COSA.push(counts)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'NIRENBERG')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    var rating = approve / total
    // console.log("approve: " + approve + " total: " + total)
    dataSets.NIRENBERG.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'WOLFF')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.WOLFF.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'ABBOT')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.ABBOT.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'CC')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.CC.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'COUNCIL')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.COUNCIL.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'SAWS')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.SAWS.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'CPS')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.CPS.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'VIA')
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.VIA.push(rating * 100)
  })
  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'PROPERTY_TAXES')
    var racedata = getColumn(sheet.data, 'RACE')
    var racecounts = countUnique(racedata)
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var whites = 0
    var latino = 0
    var poc = 0
    for(let i = 0; i < coldata.length; i++) {
        if(racedata[i] === '1' && (coldata[i] === '1' || coldata[i] === '2')) {
          latino = latino + 1
        } else if(racedata[i] === '3' && (coldata[i] === '1' || coldata[i] === '2')) {
          whites = whites + 1
        } else if (coldata[i] === '1' || coldata[i] === '2') {
          poc = poc + 1
        }
    }
    var notproblem = total - (whites + latino + poc)
    var demo = [whites, latino, poc, notproblem]
    dataSets.PROPERTY_TAXES.push(demo)
  })

  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'CRIME')
    var racedata = getColumn(sheet.data, 'RACE')
    var racecounts = countUnique(racedata)
    var counts = countUnique(coldata)
    var total = 0
    for(let key in counts) {
      total = total + counts[key]
    }
    var whites = 0
    var latino = 0
    var poc = 0
    for(let i = 0; i < coldata.length; i++) {
        if(racedata[i] === '1' && (coldata[i] === '1' || coldata[i] === '2')) {
          latino = latino + 1
        } else if(racedata[i] === '3' && (coldata[i] === '1' || coldata[i] === '2')) {
          whites = whites + 1
        } else if (coldata[i] === '1' || coldata[i] === '2') {
          poc = poc + 1
        }
    }
    var notproblem = total - (whites + latino + poc)
    var demo = [whites, latino, poc, notproblem]
    dataSets.CRIME.push(demo)
  })

  var dataCrime = {
    labels: ['Whites', 'Latinos','All Voters of Color', 'Not a problem'],
    datasets: [
      {
        label: "Poll 1",
        data: Object.values(dataSets['CRIME'][1]),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(0, 0, 0)'
        ]
      }
    ]
  }

  var dataPropertyTaxes = {
    labels: ['Whites', 'Latinos','All Voters of Color', 'Not a problem'],
    datasets: [
      {
        label: "Poll 1",
        data: Object.values(dataSets['PROPERTY_TAXES'][0]),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(0, 0, 0)'
        ]
      }
    ]
  }

  var dataApprovals = {
    labels: ['Poll 1', 'Poll 2', 'Poll 3', 'Poll 4', 'Poll 5', 'Poll 6'],
    datasets: [
      {
        label: 'Ron Nirenberg',
        data: Object.values(dataSets['NIRENBERG']),
        backgroundColor: [
          'rgb(255, 99, 132)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
        ]
      },
      {
        label: 'Judge Wolff',
        data: Object.values(dataSets['WOLFF']),
        backgroundColor: [
          'rgb(0, 99, 132)',
        ],
        borderColor: [
          'rgb(0, 99, 132)',
        ]
      },
      {
        label: 'Greg Abbot',
        data: Object.values(dataSets['ABBOT']),
        backgroundColor: [
          'rgb(0, 0, 132)',
        ],
        borderColor: [
          'rgb(0, 0, 132)',
        ]
      },
      {
        label: 'City Council',
        data: Object.values(dataSets['COUNCIL']),
        backgroundColor: [
          'rgb(100, 100, 100)',
        ],
        borderColor: [
          'rgb(100, 100, 100)',
        ]
      },
      {
        label: 'Commissioners Court',
        data: Object.values(dataSets['CC']),
        backgroundColor: [
          'rgb(200, 200, 200)',
        ],
        borderColor: [
          'rgb(200, 200, 200)',
        ]
      },
      {
        label: 'SAWS',
        data: Object.values(dataSets['SAWS']),
        backgroundColor: [
          'rgb(50, 50, 50)',
        ],
        borderColor: [
          'rgb(50, 50, 50)',
        ]
      },
      {
        label: 'CPS',
        data: Object.values(dataSets['CPS']),
        backgroundColor: [
          'rgb(30, 100, 200)',
        ],
        borderColor: [
          'rgb(30, 100, 200)',
        ]
      },
      {
        label: 'VIA',
        data: Object.values(dataSets['VIA']),
        backgroundColor: [
          'rgb(200, 100, 132)',
        ],
        borderColor: [
          'rgb(200, 100, 132)',
        ]
      },
    ],
  }


  var dataBEXAR = {
    labels: ['Right Track', 'Wrong Direction', 'Mixed', 'Do not know'],
    datasets: [
      {
        label: 'Poll 1',
        data: Object.values(dataSets['BEXAR'][0]),
        backgroundColor: [
          'rgb(255, 99, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 2',
        data: Object.values(dataSets['BEXAR'][1]),
        backgroundColor: [
          'rgb(0, 99, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 3',
        data: Object.values(dataSets['BEXAR'][2]),
        backgroundColor: [
          'rgb(0, 0, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 4',
        data: Object.values(dataSets['BEXAR'][3]),
        backgroundColor: [
          'rgb(100, 0, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 5',
        data: Object.values(dataSets['BEXAR'][4]),
        backgroundColor: [
          'rgb(0, 99, 0)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 6',
        data: Object.values(dataSets['BEXAR'][5]),
        backgroundColor: [
          'rgb(255, 255, 0)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      
    ],
  };

  var dataCOSA = {
    labels: ['Right Track', 'Wrong Direction', 'Mixed', 'Do not know'],
    datasets: [
      {
        label: 'Poll 1',
        data: Object.values(dataSets['COSA'][0]),
        backgroundColor: [
          'rgb(255, 99, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 2',
        data: Object.values(dataSets['COSA'][1]),
        backgroundColor: [
          'rgb(0, 99, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 3',
        data: Object.values(dataSets['COSA'][2]),
        backgroundColor: [
          'rgb(0, 0, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 4',
        data: Object.values(dataSets['COSA'][3]),
        backgroundColor: [
          'rgb(100, 0, 132)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 5',
        data: Object.values(dataSets['COSA'][4]),
        backgroundColor: [
          'rgb(0, 99, 0)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 6',
        data: Object.values(dataSets['COSA'][5]),
        backgroundColor: [
          'rgb(255, 255, 0)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      
    ],
  };
 
   

  return (
    <div className={styles.container}>
      <Head>
        <title>Bexar Dash</title>
        <meta name="description" content="Bexar Facts' Data Dashboard!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Bexar-Dash!
        </h1>

        <p className={styles.description}>
          Visualize polling data in Bexar County!
        </p>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Browse Issues
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Approval Ratings</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Homelessness</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Crime</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Policy Direction</Dropdown.Item>

          </Dropdown.Menu>
        </Dropdown>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Would you say Bexar County policy is on the Right Track or going the Wrong direction</h2>
            <Chart 
              ref={chartRefBEXAR}
              type='bar'
              onClick={onClickBEXAR}
              options={options} 
              data={dataBEXAR} 
            />
          </div>
          <div className={styles.card}>
            <h2>Would you say City of San Antonio policy is on the Right Track or going the Wrong direction</h2>
            <Chart 
              ref={chartRefCOSA}
              type='bar'
              onClick={onClickCOSA}
              options={options} 
              data={dataCOSA} 
            />
          </div>
          <div className={styles.card}>
            <h2>Elected Officials and Infrastructure Approval Ratings</h2>
            <Chart 
              ref={chartRefApprovals}
              options={optionsApprovals}
              type='line'
              onClick={onClickApprovals}
              data={dataApprovals} 
              height={300}
              width={600}
            />
          </div>
          <div className={styles.card}>
            <h2>Is Homelessness a problem?</h2>
            <Chart 
              ref={chartRefProblems}
              options={optionsProblems}
              type='pie'
              onClick={onClickProblems}
              data={dataPropertyTaxes} 
              height={100}
              width={100}
            />
          </div>
          <div className={styles.card}>
            <h2>Is Crime a serious problem?</h2>
            <Chart 
              ref={chartRefCrime}
              options={optionsProblems2}
              type='pie'
              onClick={onClickProblems2}
              data={dataCrime} 
              height={100}
              width={100}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://bexarfacts.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/bf-1.png" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
