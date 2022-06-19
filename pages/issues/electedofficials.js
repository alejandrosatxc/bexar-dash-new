import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { countUnique, getColumn, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent } from '../../lib/myfuncs'
import { useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import LineChart from '../../components/LineChart'

export async function getStaticProps() {
  const master = await getMaster()
  return ({ props: { master } })
}

export default function ElectedOfficials({ master }) {

  const dataSets = {
    NIRENBERG: [],
    WOLFF: [],
    ABBOT: [],
  }

  const columns = [
    'NIRENBERG',
    'WOLFF',
    'ABBOT'
  ]

  columns.forEach(col => {
    master.forEach(sheet => {
      var coldata = getColumn(sheet.data, col, 'none')
      var counts = countUnique(coldata)
      var total = 0
      for (let key in counts) {
        total = total + counts[key]
      }
      var approve = counts['1'] + counts['2']
      var rating = approve / total
      dataSets[col].push(rating * 100)
    })
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
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
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
          label: function (context) {
            var data = context.dataset.data,
              label = context.label,
              currentValue = context.raw,
              total = 0;

            //   for( var i = 0; i < data.length; i++ ){
            //     total += data[i];
            //   }
            var percentage = parseFloat((currentValue).toFixed(1));

            return label + ": (" + percentage + '%)';
          }
        }

      },
      legend: {
        display: true,
          font: {
            size: 16
          }
        }
      }
    }
  

  return (
    <Container>
      <Row className="justify-content-sm-center">
        <Col className="w-100">
            <LineChart
            title="Do you approve or disapprove of the job they are doing?"
            columns={columns}
            masterDataset={master}
            dataset={dataOfficials}
            options={optionsOfficials}
            reshape='none'
            />
        </Col>
      </Row>
    </Container>
  )

}
