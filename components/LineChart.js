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
const[dropDownTitle, setDropDownTitle] = useState("Demographics: All")
const chartRef = useRef(null)

    const renderChart = (e, filter) => {
        const { current: chart } = chartRef
        console.log(filter)
        if (!chart) {
            return;
        }


        
        //Access the chart's data object, and render a new chart using the filtered data.
        switch (props.reshape) {
            case 'none':
                const dataSets = {
                    NIRENBERG: [],
                    WOLFF: [],
                    ABBOT: [],
                  }
                
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'NIRENBERG', filter)
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    var rating = approve / total
                    // console.log("approve: " + approve + " total: " + total)
                    dataSets.NIRENBERG.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'WOLFF', filter)
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets.WOLFF.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'ABBOT', filter)
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets.ABBOT.push(rating * 100)
                  })
                chart.config.data.datasets[0].data =Object.values(dataSets['ABBOT'])
                chart.config.data.datasets[1].data =Object.values(dataSets['NIRENBERG'])
                chart.config.data.datasets[2].data =Object.values(dataSets['WOLFF'])
                break;
            case 'entity':
                console.log("hello")
                const dataSets2 = {
                    CC: [],
                    COUNCIL: [],
                    SAWS: [],
                    CPS: [],
                    VIA: [],
                  }

                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'CC')
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets2.CC.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'COUNCIL')
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets2.COUNCIL.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'SAWS')
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets2.SAWS.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'CPS')
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets2.CPS.push(rating * 100)
                  })
                  props.masterDataset.forEach(sheet => {
                    var coldata = getColumn(sheet.data, 'VIA')
                    var counts = countUnique(coldata)
                    var total = 0
                    for (let key in counts) {
                      total = total + counts[key]
                    }
                    var approve = counts['1'] + counts['2']
                    // console.log("approve: " + approve + " total: " + total)
                    var rating = approve / total
                    dataSets2.VIA.push(rating * 100)
                  })
                    console.log(dataSets2)
                  chart.config.data.datasets[0].data =Object.values(dataSets2['COUNCIL'])
                  chart.config.data.datasets[1].data =Object.values(dataSets2['CC'])
                  chart.config.data.datasets[2].data =Object.values(dataSets2['SAWS'])
                  chart.config.data.datasets[3].data =Object.values(dataSets2['CPS'])
                  chart.config.data.datasets[4].data =Object.values(dataSets2['VIA'])
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
            </div></div>
          
    )
}


export default LineChart