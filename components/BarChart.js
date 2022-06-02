import { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { memes, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent} from '../lib/myfuncs'
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import styles from '../styles/Home.module.css'

const BarChart = (props) => {

    const [dropDownTitle, setDropDownTitle] = useState("Demographics: All")
    const chartRef = useRef(null)

    const renderChart = (e, filter) => {
        const { current: chart } = chartRef
        console.log(filter)
        if (!chart) {
          return;
        }
        //Access the chart's data object, and render a new chart using the filtered data.
        let sets = memes(props.columns, props.masterDataset, filter)
        switch(props.reshape) {
            case 'none':
                chart.config.data.datasets[0].data = memes(props.columns, props.masterDataset, filter)
                break;
            case 'problems':
                var newSet = []
                for(let i = 0; i < sets[0].length; i++) {
                    newSet.push(sets[0][i] + sets[1][i])
                }
                chart.config.data.datasets[0].data = newSet
                chart.config.data.datasets[1].data = sets[2]
                chart.config.data.datasets[2].data = sets[3]
                chart.config.data.datasets[3].data = sets[4]
                break;
            case 'experiences':
                var newSet = []
                for(let i = 0; i < sets[0].length; i++) {
                    newSet.push(sets[0][i] + sets[1][i])
                }
                chart.config.data.datasets[0].data = newSet
                chart.config.data.datasets[1].data = sets[2]
                chart.config.data.datasets[2].data = sets[3]
                break;
            case 'challenges':
                chart.config.data.datasets[0].data = sets[0]
                chart.config.data.datasets[1].data = sets[1]
                chart.config.data.datasets[2].data = sets[2]
                chart.config.data.datasets[3].data = sets[3]
                break;
            case 'lp':
            case 'fp':
            case 's':
                chart.config.data.datasets[0].data = sets[0]
                chart.config.data.datasets[1].data = sets[1]
                chart.config.data.datasets[2].data = sets[2]
                chart.config.data.datasets[3].data = sets[3]
                chart.config.data.datasets[4].data = sets[4]
                break;
            case 'health':
                var newSet = []
                for(let i = 0; i < sets[0].length; i++) {
                    newSet.push(sets[0][i] + sets[1][i])
                }
                chart.config.data.datasets[0].data = newSet
                chart.config.data.datasets[1].data = sets[2]
                chart.config.data.datasets[2].data = sets[3]
                chart.config.data.datasets[3].data = sets[4]
                chart.config.data.datasets[4].data = sets[5]
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

    return(
        <div className={styles.bar}>
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
            <div>
            <Chart
                ref={chartRef}
                options={props.options}
                type='bar'
                data={props.dataset}
                plugins={[ChartDataLabels]}
            />
            </div>
        </div>
    )

}

export default BarChart