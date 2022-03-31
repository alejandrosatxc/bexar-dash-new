import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';
import ReactDOM from 'react-dom';

//import * as Plot from '@observablehq/plot'
//const Chart = require('chart.js');


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
      var row = {Q1A: row.Q1A, Q1B: row.Q1B, Q2A: row.Q2A, Q2B: row.Q2B, Q2C: row.Q2C}
      GSdata.push(row)
    })
    const sheetdata = { title : sheet.title, data: GSdata }
    master.push(sheetdata)
  // })
  }

  //console.log(GSdata) 
  return({ props: { master } })
}

export default function Home({ master }) {

  const [pollNum, setPollNum] = useState(0)

   useEffect(() => {
        const myChart = new Chart(
          document.getElementById("myChart"),
          config
        )

        const myChart2 = new Chart(
          document.getElementById("myChart2"),
          config2
        )

        const myChart3 = new Chart(
          document.getElementById("myChart3"),
          lineconfig
        )
   }, [])

  

  const dataSets = []
  master.forEach(sheet => {
    let RD = 0;
    let WT = 0;
    let DNK = 0;
    let M = 0;
    sheet.data.forEach(row => {
      switch(row.Q1A) {
        case '1': 
          RD += 1
          break;
        case '2': 
          WT += 1
          break;
        case '3':
          DNK += 1
          break;
        case '4': 
          M += 1
          break;
        default:
          DNK += 1 
      }
    })
    let dataSet1 = [RD, WT, DNK, M]
    RD = 0;
    WT = 0;
    DNK = 0;
    M = 0;

    sheet.data.forEach(row => {
      switch(row.Q1B) {
        case '1': 
          RD += 1
          break;
        case '2': 
          WT += 1
          break;
        case '3':
          DNK += 1
          break;
        case '4': 
          M += 1
          break;
        default:
          DNK += 1 
      }
    })
    let dataSet2 = [RD, WT, DNK, M]
    dataSets.push({title: sheet.title, dataset1 : dataSet1, dataset2: dataSet2})
  })

  const labels = [
    'Right Direction',
    'Wrong Track',
    'Do not know',
    'Mixed',
  ];

  const data1 = {
    labels: labels,
    datasets: [{
      label: 'Bexar County Approval',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 0, 0)'
      ],
      hoverOffset: 4,
      data: dataSets[0].dataset1,
    }]
  };

  const data2 = {
    labels: labels,
    datasets: [{
      label: 'San Antonio Approval',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(0, 0, 0)'
      ],
      hoverOffset: 4,
      data: dataSets[1].dataset2,
    }]
  };

  const config = {
    type: 'pie',
    data: data1,
    options: {
      plugins: {
          title: {
              display: true,
              text: dataSets[0].title,
              position: 'bottom'
          }
      }
    }
  };

  const config2 = {
    type: 'pie',
    data: data2,
    options: {
      plugins: {
          title: {
              display: true,
              text: dataSets[0].title,
              position: 'bottom'
          }
      }
    }
  };

const linedatasets1 = []
const linedatasets2 = []
const linedatasets3 = []

master.forEach(sheet => {
  let score = 0
  sheet.data.forEach(row => {
    score += Number(row.Q2A)
  })
  linedatasets1.push(score/3)
  //console.log(linedatasets)
})

master.forEach(sheet => {
  let score = 0
  sheet.data.forEach(row => {
    score += Number(row.Q2B)
  })
  linedatasets2.push(score/3)
  //console.log(linedatasets)
})

master.forEach(sheet => {
  let score = 0
  sheet.data.forEach(row => {
    score += Number(row.Q2C)
  })
  linedatasets3.push(score/3)
  //console.log(linedatasets)
})


//const DATA_COUNT = 4;
//const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 3000};

const linelabels = ['Q1 2020', 'Q2 2020', 'Q3 2020', 'Q4 2020', 'Q1 2021']

const linedata = {
  labels: linelabels,
  datasets: [
    {
      label: 'Greg Abbot',
      data: linedatasets1,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgb(12, 194, 200)',
      tension: 0.1
    },
    {
      label: 'Donald Trump',
      data: linedatasets2,
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgb(255, 0, 0)',
      tension: 0.1
    },
    {
      label: 'Judge Nelson Wolff',
      data: linedatasets3,
      borderColor: 'rgb(0, 0, 255)',
      backgroundColor: 'rgb(0, 0, 255)',
      tension: 0.1
    }
  ]
};

  const lineconfig = {
    type: 'line',
    data: linedata,
    options: {
 
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Approval Rating'
        }
      },
      scales: {
        y: {
        display: true, 
        min: 450,
        max: 700,
        ticks: {
          stepSize: 25 
        }
        }
      }
    },
  };
  //console.log(dataSets)
  //console.log(config)

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

        <div className={styles.grid}>

          <div className={styles.card}>
            <h2>Bexar County Governance Approval</h2>
            <canvas id="myChart"></canvas>
          </div>
          <div className={styles.card}>
            <h2>City of San Antonio Governance Approval</h2>
            <canvas id="myChart2"></canvas>
          </div>

        </div>

        {/* <div className={styles.card}>
         
        </div> */}

        <h2>Politician Approval</h2>
        <canvas id="myChart3"></canvas>
      

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
