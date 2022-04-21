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

const onClickOfficials = (event) => {
    const { current: chart } = chartRefApprovals;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

export default function ElectedOfficials({master}) {
    
    const router = useRouter()
    const chartRefOfficials = useRef(null)

    const dataSets = {
        NIRENBERG: [], 
        WOLFF: [], 
        ABBOT: [],
    }

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

      var dataOfficials = {
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
        ],
      }

      const optionsOfficials = {
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

    return(
        <div className={styles.grid}>
            <div className={styles.card}>
                <h2>Local Government Infrastructure Approval Ratings</h2>
                <Chart 
                    ref={chartRefOfficials}
                    options={optionsOfficials}
                    type='line'
                    onClick={onClickOfficials}
                    data={dataOfficials} 
                    height={300}
                    width={600}
                />
            </div>
        </div>
    )

}
