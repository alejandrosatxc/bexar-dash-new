import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';

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
  console.log(doc.title);

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
      var row = {Q1A: row.Q1A, Q1B: row.Q1B}
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
    const dataSets = []
    master.forEach(sheet => {
      let RD = 0;
      let WT = 0;
      let DNK = 0;
      let M = 0;
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
      let dataSet = [RD, WT, DNK, M]
      dataSets.push({title: sheet.title, dataset : dataSet})
    })

    const labels = [
      'Right Direction',
      'Wrong Track',
      'Do not know',
      'Mixed',
    ];
  
    const data = {
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
        data: dataSets[0].dataset,
      }]
    };
  
    const config = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
            title: {
                display: true,
                text: dataSets.title,
                position: 'bottom'
            }
        }
      }
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    )

  }, [pollNum])

 

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

        <div className={styles.card}>
          <h2>Bexar County Governance Approval</h2>
          <canvas id="myChart"></canvas>
          <button onClick={() => {setPollNum(pollNum - 1)}}>prev</button>
          <button onClick={() => {setPollNum(pollNum + 1)}}>next</button>
        </div>
       

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
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
