import { useState, useRef } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { simplePie, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent} from '../lib/myfuncs'
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
                chart.config.data.datasets[0].data = simplePie(props.column, props.masterDataset, filter)
                break;
            case 'ahp':
                var set = simplePie(props.column, props.masterDataset, filter)
                chart.config.data.datasets[0].data = [
                    set[0] + set[1] + set[2],
                    set[3] + set[4] + set[5],
                    set[6]
                ]
                break;
            case 'life':
                var set = simplePie(props.column, props.masterDataset, filter)
                chart.config.data.datasets[0].data = [
                    set[7] + set[8] + set[9] + set[10],
                    set[5] + set[6],
                    set[0] + set[1] + set[2] + set[3] + set[4]
                ]
                break;
            case 'statement':
                var set = simplePie(props.column, props.masterDataset, filter)
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
        <div className={styles.card}>
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
                </DropdownButton>
                <Chart
                    ref={chartRef}
                    options={props.options}
                    type='pie'
                    data={props.dataset}
                    plugins={[ChartDataLabels]}
                />
        </div>
    )

}

export default PieChart