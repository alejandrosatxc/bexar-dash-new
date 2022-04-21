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

const onClick = (event) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

export default function Crime({master}) {
    
    const router = useRouter()
    const chartRef = useRef(null)

    const dataSets = {
        CRIME: [],
    }

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

     const optionsProblems2 = {
        plugins: {
          title: {
            display: true,
            text: 'Poll 2'
          }
        }
      }

    return(
        <div className={styles.card}>
            <h2>Is Crime a problem?</h2>
            <Chart 
              ref={chartRef}
              options={optionsProblems2}
              type='pie'
              onClick={onClick}
              data={dataCrime} 
              height={100}
              width={100}
            />
        </div>
    )

}