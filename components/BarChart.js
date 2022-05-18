import { useEffect, useState, MouseEvent, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { memes, simplePie, countUnique, getColumn, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent} from '../lib/myfuncs'
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
        <div className={styles.chart}>
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
                </DropdownButton>
                <Chart
                    ref={chartRef}
                    options={props.options}
                    type='bar'
                    // onClick={onClickVotingPlans}
                    data={props.dataset}
                    plugins={[ChartDataLabels]}
                />
        </div>
    )

}

export default BarChart