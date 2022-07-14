import { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { printDatasetAtEvent, printElementAtEvent, printElementsAtEvent, generateChartDatasets, getColumn, countUnique } from '../lib/myfuncs'
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../styles/Home.module.css'

const LineChart = (props) => {
  const [dropDownTitle, setDropDownTitle] = useState("Demographics: All")
  const chartRef = useRef(null)

  const renderChart = (e, filter) => {
    const { current: chart } = chartRef
    console.log(filter)
    if (!chart) {
      return;
    }

    let j = 0

    //Access the chart's data object, and render a new chart using the filtered data.
    switch (props.reshape) {
      case 'none':
        const dataSets = {
          NIRENBERG: [],
          WOLFF: [],
          ABBOT: [],
        }

        props.columns.forEach(col => {
          props.masterDataset.forEach(sheet => {
            var coldata = getColumn(sheet.data, col, filter)
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

        chart.config.data.datasets[0].data = Object.values(dataSets['ABBOT'])
        chart.config.data.datasets[1].data = Object.values(dataSets['NIRENBERG'])
        chart.config.data.datasets[2].data = Object.values(dataSets['WOLFF'])
        break;
      case 'entity':
        const dataSets2 = {
          CC: [],
          COUNCIL: [],
          SAWS: [],
          CPS: [],
          VIA: [],
        }

        props.columns.forEach(col => {
          props.masterDataset.forEach(sheet => {
            var coldata = getColumn(sheet.data, col, filter)
            var counts = countUnique(coldata)
            var total = 0
            for (let key in counts) {
              total = total + counts[key]
            }
            var approve = counts['1'] + counts['2']
            var rating = approve / total
            dataSets2[col].push(rating * 100)
          })
        })
        chart.config.data.datasets[0].data = Object.values(dataSets2['COUNCIL'])
        chart.config.data.datasets[1].data = Object.values(dataSets2['CC'])
        chart.config.data.datasets[2].data = Object.values(dataSets2['SAWS'])
        chart.config.data.datasets[3].data = Object.values(dataSets2['CPS'])
        chart.config.data.datasets[4].data = Object.values(dataSets2['VIA'])
        break;

      case 'county':
        var datasets3 = {
          BEXAR: []
        }
        props.masterDataset.forEach(sheet => {
          var coldata = getColumn(sheet.data, 'BEXAR', filter)
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
          datasets3.BEXAR.push(counts)
        })

        let BEXARDataset = [...Array(datasets3.BEXAR.length)].map(e => Array(datasets3.BEXAR.length))
        j = 0
        datasets3.BEXAR.forEach(set => {
            let i = 0
            for(let key in set) {
                BEXARDataset[i][j] = set[key]
                i = i + 1
            }
            j = j + 1
        })
        chart.config.data.datasets[0].data = Object.values(BEXARDataset[0])
        chart.config.data.datasets[1].data = Object.values(BEXARDataset[1])
        chart.config.data.datasets[2].data = Object.values(BEXARDataset[2])
        chart.config.data.datasets[3].data = Object.values(BEXARDataset[3])
        break;
      case 'city':
        var datasets4 = {
          COSA: []
        }
        props.masterDataset.forEach(sheet => {
          var coldata = getColumn(sheet.data, 'COSA', filter) //Get a column in a sheet
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
          datasets4.COSA.push(counts)
        })

        let COSADataset = [...Array(datasets4.COSA.length)].map(e => Array(datasets4.COSA.length))
        j = 0
        datasets4.COSA.forEach(set => {
            let i = 0
            console.log(set)
            for(let key in set) {
                COSADataset[i][j] = set[key]
                i = i + 1
            }
            j = j + 1
        })
        chart.config.data.datasets[0].data = Object.values(COSADataset[0])
        chart.config.data.datasets[1].data = Object.values(COSADataset[1])
        chart.config.data.datasets[2].data = Object.values(COSADataset[2])
        chart.config.data.datasets[3].data = Object.values(COSADataset[3])

        break;
      default:
        break;

    }
    setDropDownTitle("Demographics: " + e.target.textContent)
    chart.update()

    printDatasetAtEvent(getDatasetAtEvent(chart, e));
    printElementAtEvent(getElementAtEvent(chart, e));
    printElementsAtEvent(getElementsAtEvent(chart, e));
  }

  return (
    <div className={styles.line}>
      <style type="text/css">
        {`
          .dropdown-menu {
            height: 350px;
            overflow-y: scroll;
          }   
        `}
      </style>
      <h3>{props.title}</h3>
      <DropdownButton id="dropdown-basic-button" title={dropDownTitle}>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'none') }}>All</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Gender</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'male') }}>Male</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'female') }}>Female</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Race</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'hispanic') }}>Hispanic</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'black') }}>African American or Black</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'white') }}>Caucasian or White</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Party</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'democrat') }}>Democrat</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'republican') }}>Republican</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'independent') }}>Independent</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Education</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'highschool') }}>High School Graduate or less</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'college_some') }}>Some College/vocational school</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'college_4') }}>College 4 years</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'postgrad') }}>Post-graduate work</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Income</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'lowerclass') }}>$60,000 and under</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'middleclass') }}>$60,001-$100,000</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'upperclass') }}>$100,000+</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Age</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'age_young') }}>18-34</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'age_adult') }}>35-49</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'age_old') }}>50-64</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'age_elder') }}>65+</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Employment</Dropdown.Header>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'employed') }}>Employed</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'unemployed') }}>Unemployed</Dropdown.Item>
        <Dropdown.Item onClick={(e) => { renderChart(e, 'retired') }}>Retired</Dropdown.Item>
      </DropdownButton>

      <div className={styles.linechart}>
        <Chart
          ref={chartRef}
          options={props.options}
          type='line'
          data={props.dataset}
        />
      </div>
    </div>

  )
}


export default LineChart