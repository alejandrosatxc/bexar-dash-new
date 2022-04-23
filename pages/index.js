import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import getMaster from '../lib/master'
import { useEffect, useState, MouseEvent, useRef } from 'react'
import ReactDOM from 'react-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';

export const optionsProblems = {
  plugins: {
    title: {
      display: true,
      text: 'Poll 1'
    }
  }
}
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

export default function Home({master}) {

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

  //const chartRefBEXAR = useRef(null);
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
    COSA: [], 
    PROPERTY_TAXES: [],
  }
  // master.forEach(sheet => {
  //   var coldata = getColumn(sheet.data, 'COSA')
  //   var counts = countUnique(coldata)
  //   dataSets.COSA.push(counts)
  // })
  
  
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
      {
        label: 'Poll 7',
        data: Object.values(dataSets['COSA'][6]),
        backgroundColor: [
          'rgb(200, 100, 50)',
          // 'rgb(54, 162, 235)',
          // 'rgb(255, 206, 86)',
          // 'rgb(75, 192, 192)'
        ],
        borderWidth: 1,
      },
      
    ],
  };

  const options = {
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
 
   

  return (
    // <div className={styles.container}>
      
        <div className={styles.grid}>
          
          
        </div>
  )
}
