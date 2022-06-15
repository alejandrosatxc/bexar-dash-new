import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import { Container, Row, Col } from 'react-bootstrap'
import {
  memes, simplePie, countUnique, getColumn,
  printDatasetAtEvent,
  printElementAtEvent,
  printElementsAtEvent
} from '../../lib/myfuncs'
import { useEffect, useState, MouseEvent, useRef } from 'react'
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export async function getStaticProps() {
  const master = await getMaster()
  return ({ props: { master } })
}

export default function LocalGov({ master }) {
  const router = useRouter()
  //const {id} = router.query
  const chartRefBEXAR = useRef(null)
  const chartRefApprovals = useRef(null)
  const chartRefCOSA = useRef(null)

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

  const onClickCOSA = (event) => {
    const { current: chart } = chartRefCOSA;
    if (!chart) {
      return;
    }
    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };


  const dataSets = {
    BEXAR: [],
    CC: [],
    COUNCIL: [],
    SAWS: [],
    CPS: [],
    VIA: [],
    COSA: [],
  }

  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'COSA')
    var counts = countUnique(coldata)
    //convert data to percentages
    var total = 0;
    for (let key in counts) {
      total = total + counts[key]
    }
    //Check for no answer, subtract from total 
    if ('' in counts) {
      total = total - counts['']
    }
    for (let key in counts) {
      counts[key] = (counts[key] / total) * 100
    }
    dataSets.COSA.push(counts)
  })

  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'BEXAR')
    var counts = countUnique(coldata)
    //convert data to percentages
    var total = 0;
    for (let key in counts) {
      total = total + counts[key]
    }
    //Check for no answer, subtract from total 
    if ('' in counts) {
      total = total - counts['']
    }
    for (let key in counts) {
      counts[key] = (counts[key] / total) * 100
    }
    dataSets.BEXAR.push(counts)
  })

  master.forEach(sheet => {
    var coldata = getColumn(sheet.data, 'CC')
    var counts = countUnique(coldata)
    var total = 0
    for (let key in counts) {
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
    for (let key in counts) {
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
    for (let key in counts) {
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
    for (let key in counts) {
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
    for (let key in counts) {
      total = total + counts[key]
    }
    var approve = counts['1'] + counts['2']
    // console.log("approve: " + approve + " total: " + total)
    var rating = approve / total
    dataSets.VIA.push(rating * 100)
  })

  var dataCOSA = {
    labels: ['Right Track', 'Wrong Direction', 'Mixed', 'Do not know'],
    datasets: [
      {
        label: 'Poll 1',
        data: Object.values(dataSets['COSA'][0]),
        backgroundColor: [
          'rgb(12, 38, 96)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 2',
        data: Object.values(dataSets['COSA'][1]),
        backgroundColor: [
          'rgb(196, 99, 0)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 3',
        data: Object.values(dataSets['COSA'][2]),
        backgroundColor: [
          'rgb(66, 116, 200)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 4',
        data: Object.values(dataSets['COSA'][3]),
        backgroundColor: [
          'rgb(233, 168, 34)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 5',
        data: Object.values(dataSets['COSA'][4]),
        backgroundColor: [
          'rgb(4, 15, 39)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 6',
        data: Object.values(dataSets['COSA'][5]),
        backgroundColor: [
          'rgb(235, 223, 203)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 7',
        data: Object.values(dataSets['COSA'][6]),
        backgroundColor: [
          'rgb(0, 0, 0)',
        ],
        borderWidth: 1,
      },

    ],
  };

  var dataApprovals = {
    labels: ['Poll 1', 'Poll 2', 'Poll 3', 'Poll 4', 'Poll 5', 'Poll 6', 'Poll 7'],
    datasets: [
      {
        label: 'City Council',
        data: Object.values(dataSets['COUNCIL']),
        backgroundColor: [
          'rgb(12, 38, 96)',
        ],
        borderColor: [
          'rgb(12, 38, 96)',
        ]
      },
      {
        label: 'Commissioners Court',
        data: Object.values(dataSets['CC']),
        backgroundColor: [
          'rgb(196, 99, 0)',
        ],
        borderColor: [
          'rgb(196, 99, 0)',
        ]
      },
      {
        label: 'SAWS',
        data: Object.values(dataSets['SAWS']),
        backgroundColor: [
          'rgb(66, 116, 200)',
        ],
        borderColor: [
          'rgb(66, 116, 200)',
        ]
      },
      {
        label: 'CPS',
        data: Object.values(dataSets['CPS']),
        backgroundColor: [
          'rgb(233, 168, 34)'
        ],
        borderColor: [
          'rgb(233, 168, 34)'
        ]
      },
      {
        label: 'VIA',
        data: Object.values(dataSets['VIA']),
        backgroundColor: [
          'rgb(4, 15, 39)',
        ],
        borderColor: [
          'rgb(4, 15, 39)',
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
          'rgb(12, 38, 96)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 2',
        data: Object.values(dataSets['BEXAR'][1]),
        backgroundColor: [
          'rgb(196, 99, 0)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 3',
        data: Object.values(dataSets['BEXAR'][2]),
        backgroundColor: [
          'rgb(66, 116, 200)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 4',
        data: Object.values(dataSets['BEXAR'][3]),
        backgroundColor: [
          'rgb(233, 168, 34)'
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 5',
        data: Object.values(dataSets['BEXAR'][4]),
        backgroundColor: [
          'rgb(4, 15, 39)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 6',
        data: Object.values(dataSets['BEXAR'][5]),
        backgroundColor: [
          'rgb(235, 223, 203)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Poll 7',
        data: Object.values(dataSets['BEXAR'][6]),
        backgroundColor: [
          'rgb(0, 0, 0)',
        ],
        borderWidth: 1,
      },

    ],
  };


  const options = {
    maintainAspectRatio: false,

    scales: {
      y: {
        min: 0,
        max: 60,
        ticks: {
          stepSize: 5,
        },
        title: {
          display: true,
          text: "Percentage"
        }
      },
      x: {
        ticks: {
          font: {
            size: 18
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
        labels: {
          font: {
            size: 16
          },
        },
      },
      title: {
        display: true,
        text: 'Click legend to interact!'
      }
    }
  }

  const optionsApprovals = {
    maintainAspectRatio: false,
    spanGaps: true,
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
          },
        },
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

  return (
    <Container fluid>
      <Row className="justify-content-sm-center">
        <Col xs={12} className="w-100">
          <div className={styles.vbar}>
            <h2>Would you say Bexar County policy is on the Right Track or going the Wrong direction?</h2>
            <div className={styles.vbarchart}>
              <Chart
                ref={chartRefBEXAR}
                type='bar'
                onClick={onClickBEXAR}
                options={options}
                data={dataBEXAR}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-sm-center">
        <Col xs={12} className="w-100">
          <div className={styles.vbar}>
            <h2>Would you say City of San Antonio policy is on the Right Track or going the Wrong direction?</h2>
            <div className={styles.vbarchart}>
              <Chart
                ref={chartRefCOSA}
                type='bar'
                onClick={onClickCOSA}
                options={options}
                data={dataCOSA}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-sm-center">
        <Col xs={12} className="w-100">
          <div className={styles.line}>
            <h2>Do you approve or disapprove of the job they are doing?</h2>
            <div className={styles.linechart}>
              <Chart
                ref={chartRefApprovals}
                options={optionsApprovals}
                type='line'
                onClick={onClickApprovals}
                data={dataApprovals}
              />
            </div>
            <p> The gaps indicate that some local entities were not included in every poll.</p>
          </div>
        </Col>
      </Row>
    </Container>
  )

}