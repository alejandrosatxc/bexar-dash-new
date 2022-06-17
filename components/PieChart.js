import { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { printDatasetAtEvent, printElementAtEvent, printElementsAtEvent, generateChartDatasets} from '../lib/myfuncs'
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../styles/Home.module.css'

const PieChart = (props) => {

    const [dropDownTitle, setDropDownTitle] = useState("Demographics: All")
    const chartRef = useRef(null)

    const renderChart = (e, filter) => {
        const { current: chart } = chartRef
        console.log(filter)
        if (!chart) {
          return;
        }
        //Access the chart's data object, and render a new chart using the filtered data.
        switch(props.reshape) {
            case 'none':
                chart.config.data.datasets[0].data = generateChartDatasets(props.column, props.masterDataset, filter)
                break;
            case 'ahp':
                var set = generateChartDatasets(props.column, props.masterDataset, filter)
                chart.config.data.datasets[0].data = [
                    set[0] + set[1] + set[2],
                    set[3] + set[4] + set[5],
                    set[6]
                ]
                break;
            case 'life':
                var set = generateChartDatasets(props.column, props.masterDataset, filter)
                chart.config.data.datasets[0].data = [
                    set[7] + set[8] + set[9] + set[10],
                    set[5] + set[6],
                    set[0] + set[1] + set[2] + set[3] + set[4]
                ]
                break;
            case 'statement':
                var set = generateChartDatasets(props.column, props.masterDataset, filter)
                chart.config.data.datasets[0].data = [
                    set[0] + set[1],
                    set[2] + set[3],
                    set[4]
                ]
                break;

        }
        setDropDownTitle("Demographics: " + e.target.textContent)
        chart.update()
    
        printDatasetAtEvent(getDatasetAtEvent(chart, e));
        printElementAtEvent(getElementAtEvent(chart, e));
        printElementsAtEvent(getElementsAtEvent(chart, e));
    }

    return(
        <div className={styles.pie}>
            <h3>{props.title}</h3>
            <style type="text/css">
            {`
                .dropdown-menu {
                    height: 350px;
                    overflow-y: scroll;
                }   
            `}
            </style>
            <DropdownButton id="dropdown-basic-button" title={dropDownTitle}>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'none')}}>All</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Gender</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'male')}}>Male</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'female')}}>Female</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Race</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'hispanic')}}>Hispanic</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'black')}}>African American or Black</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'white')}}>Caucasian or White</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Party</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'democrat')}}>Democrat</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'republican')}}>Republican</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'independent')}}>Independent</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Education</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'highschool')}}>High School Graduate or less</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'college_some')}}>Some College/vocational school</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'college_4')}}>College 4 years</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'postgrad')}}>Post-graduate work</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Income</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'lowerclass')}}>$60,000 and under</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'middleclass')}}>$60,001-$100,000</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'upperclass')}}>$100,000+</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Age</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'age_young')}}>18-34</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'age_adult')}}>35-49</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'age_old')}}>50-64</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'age_elder')}}>65+</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Employment</Dropdown.Header>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'employed')}}>Employed</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'unemployed')}}>Unemployed</Dropdown.Item>
                    <Dropdown.Item onClick={(e) => {renderChart(e, 'retired')}}>Retired</Dropdown.Item>
                </DropdownButton>
                <div className={styles.piechart}>
                    <Chart
                        ref={chartRef}
                        options={props.options}
                        type='pie'
                        data={props.dataset}
                        plugins={[ChartDataLabels]}
                    />
                </div>
        </div>
    )
}

export default PieChart