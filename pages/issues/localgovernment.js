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

export default function LocalGov({master}) {
    const router = useRouter()
    //const {id} = router.query
    const chartRefBEXAR = useRef(null);
    const chartRefApprovals = useRef(null);


    const dataSets = {
        BEXAR: [],
        CC: [],
        COUNCIL: [],
        SAWS: [],
        CPS: [],
        VIA: []
    }

    master.forEach(sheet => {
        var coldata = getColumn(sheet.data, 'BEXAR')
        var counts = countUnique(coldata)
        dataSets.BEXAR.push(counts)
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

    var dataApprovals = {
        labels: ['Poll 1', 'Poll 2', 'Poll 3', 'Poll 4', 'Poll 5', 'Poll 6'],
        datasets: [
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
        ]
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

 const optionsApprovals = {
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
                <h2>Local Government Infrastructure Approval Ratings</h2>
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
        </div>
    )

}