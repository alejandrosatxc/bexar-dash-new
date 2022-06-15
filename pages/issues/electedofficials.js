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


export async function getStaticProps() {
    const master = await getMaster()
    return({props: {master}})
}

export default function ElectedOfficials({master}) {

    const router = useRouter()
    const chartRefOfficials = useRef(null)


const onClickOfficials = (event) => {
  const { current: chart } = chartRefOfficials;
  if (!chart) {
    return;
  }
  printDatasetAtEvent(getDatasetAtEvent(chart, event));
  printElementAtEvent(getElementAtEvent(chart, event));
  printElementsAtEvent(getElementsAtEvent(chart, event));
};

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
        labels: ['Poll 1', 'Poll 2', 'Poll 3', 'Poll 4', 'Poll 5', 'Poll 6', 'Poll 7'],
        datasets: [
          {
            label: 'Governor Greg Abbott',
            data: Object.values(dataSets['ABBOT']),
            backgroundColor: [
              'rgb(12, 38, 96)',
            ],
            borderColor: [
              'rgb(12, 38, 96)',
            ]
          },
          {
            label: 'San Antonio Mayor Ron Nirenberg',
            data: Object.values(dataSets['NIRENBERG']),
            backgroundColor: [
              'rgb(196, 99, 0)',
            ],
            borderColor: [
              'rgb(196, 99, 0)',
            ]
          },
          {
            label: 'Bexar County Judge Nelson Wolff',
            data: Object.values(dataSets['WOLFF']),
            backgroundColor: [
              'rgb(66, 116, 200)',
            ],
            borderColor: [
              'rgb(66, 116, 200)',
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
          },
          x: {
            ticks: {
              font: {
                size: 16
              }
            }
          }
        },
        plugins: {
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
          legend: {
            display: true,
            labels: {
              font: {
                size: 16
              }
            }
          }
        }
      }

    return(
        <div className={styles.grid}>
            <div className={styles.line}>
                <h2>Do you approve or disapprove of the job they are doing?</h2>
                <Chart 
                    ref={chartRefOfficials}
                    options={optionsOfficials}
                    type='line'
                    onClick={onClickOfficials}
                    data={dataOfficials}
                />
            </div>
        </div>
    )

}
