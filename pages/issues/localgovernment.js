import { useRouter } from 'next/router'
import getMaster from '../../lib/master'
import { Container, Row, Col } from 'react-bootstrap'
import { countUnique, getColumn } from '../../lib/myfuncs'

import 'chart.js/auto';
import VBarChart from '../../components/vBarChart'
import LineChart from '../../components/LineChart'

export async function getStaticProps() {
  const master = await getMaster()
  return ({ props: { master } })
}

export default function LocalGov({ master }) {
  const router = useRouter()

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
    var coldata = getColumn(sheet.data, 'COSA') //Get a column in a sheet
    var counts = countUnique(coldata)           //Count unique values
    //convert data to percentages
    var total = 0;
    for (let key in counts) {
      total = total + counts[key]
    }
    //Check for no answer, subtract from total 
    if ('' in counts) {
      total = total - counts['']
    }
    //
    for (let key in counts) {
      counts[key] = (counts[key] / total) * 100
    }
    dataSets.COSA.push(counts)
  })

  let COSADataset = [...Array(dataSets['COSA'].length)].map(e => Array(dataSets['COSA'].length))
  let j = 0
  console.log(dataSets['COSA'])
  dataSets['COSA'].forEach(set => {
      let i = 0
      console.log(set)
      for(let key in set) {
          COSADataset[i][j] = set[key]
          i = i + 1
      }
      j = j + 1
  })
  console.log(COSADataset)

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

  let BEXARDataset = [...Array(dataSets['BEXAR'].length)].map(e => Array(dataSets['BEXAR'].length))
  j = 0
  console.log(dataSets['BEXAR'])
  dataSets['BEXAR'].forEach(set => {
      let i = 0
      console.log(set)
      for(let key in set) {
          BEXARDataset[i][j] = set[key]
          i = i + 1
      }
      j = j + 1
  })

  const columns = [
    'COUNCIL',
    'CC',
    'SAWS',
    'CPS',
    'VIA',
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


  var dataCOSA = {
    labels: ['20/Q1', '20/Q2', '20/Q3', '20/Q4' , '21/Q1', '21/Q3', '22/Q1'],
    datasets: [
      {
        label: 'Right Track',
        data: Object.values(COSADataset[0]),
        backgroundColor: [
          'rgb(12, 38, 96)',
        ],
        borderColor: [
          'rgb(12, 38, 96)',
        ]
      },
      {
        label: 'Wrong Direction',
        data: Object.values(COSADataset[1]),
        backgroundColor: [
          'rgb(196, 99, 0)',
        ],
        borderColor: [
          'rgb(196, 99, 0)',
        ]
      },
      {
        label: 'Mixed',
        data: Object.values(COSADataset[2]),
        backgroundColor: [
          'rgb(66, 116, 200)',
        ],
        borderColor: [
          'rgb(66, 116, 200)',
        ]     
      },
      {
        label: 'Do not know',
        data: Object.values(COSADataset[3]),
        backgroundColor: [
          'rgb(233, 168, 34)'
        ],
        borderColor: [
          'rgb(233, 168, 34)'
        ]      
      },
    ],
  };

  var dataApprovals = {
    labels: ['20/Q1', '20/Q2', '20/Q3', '20/Q4' , '21/Q1', '21/Q3', '22/Q1'],
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
    labels: ['20/Q1', '20/Q2', '20/Q3', '20/Q4' , '21/Q1', '21/Q3', '22/Q1'],
    datasets: [
      {
        label: 'Right Track',
        data: Object.values(BEXARDataset[0]),
        backgroundColor: [
          'rgb(12, 38, 96)',
        ],
        borderColor: [
          'rgb(12, 38, 96)',
        ]
      },
      {
        label: 'Wrong Direction',
        data: Object.values(BEXARDataset[1]),
        backgroundColor: [
          'rgb(196, 99, 0)',
        ],
        borderColor: [
          'rgb(196, 99, 0)',
        ]
      },
      {
        label: 'Mixed',
        data: Object.values(BEXARDataset[2]),
        backgroundColor: [
          'rgb(66, 116, 200)',
        ],
        borderColor: [
          'rgb(66, 116, 200)',
        ]
      },
      {
        label: 'Do not know',
        data: Object.values(BEXARDataset[3]),
        backgroundColor: [
          'rgb(233, 168, 34)'
        ],
        borderColor: [
          'rgb(233, 168, 34)'
        ]
      }
    ],
  };

  const optionsApprovals = {
    maintainAspectRatio: false,
    spanGaps: true,
    scales: {
      y: {
        min: 35,
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
            label = context.dataset.label,
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

  const optionsTrack = {
    maintainAspectRatio: false,
    spanGaps: true,
    scales: {
      y: {
        min: 0,
        max: 80,
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
            label = context.dataset.label,
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
          <LineChart
            title="Would you say Bexar County is on the Right Track or going the Wrong direction?"
            columns="BEXAR"
            masterDataset={master}
            dataset={dataBEXAR}
            options={optionsTrack}
            reshape="county"
          />
        </Col>
      </Row>
      <Row className="justify-content-sm-center">
        <Col xs={12} className="w-100">
          <LineChart
            title="Would you say City of San Antonio is on the Right Track or going the Wrong direction?"
            columns="COSA"
            masterDataset={master}
            dataset={dataCOSA}
            options={optionsTrack}
            reshape="city"
          />
        </Col>
      </Row>
      <Row className="justify-content-sm-center">
        <Col xs={12} className="w-100">
          <LineChart
            title="Do you approve or disapprove of the job they are doing?"
            columns={columns}
            masterDataset={master}
            dataset={dataApprovals}
            options={optionsApprovals}
            reshape='entity'
          />
        </Col>
      </Row>
    </Container>
  )

}