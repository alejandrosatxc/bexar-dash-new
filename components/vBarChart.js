import { memes, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent } from '../lib/myfuncs'
import {
    Chart,
    getDatasetAtEvent,
    getElementAtEvent,
    getElementsAtEvent,
} from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const VBarChart = (props) => {

    const chartRef = useRef(null)

    const renderChart = (e, filter) => {

        const { current: chart } = chartRef
        console.log(filter)
        if (!chart) {
            return;
        }

        // let sets = memes(props.columns, props.masterDataset, filter)
        switch (props.reshape) {
            case 'county':
                break;
            case 'city':
                break;
            default:
                break;
        }
        chart.update()

        printDatasetAtEvent(getDatasetAtEvent(chart, e));
        printElementAtEvent(getElementAtEvent(chart, e));
        printElementsAtEvent(getElementsAtEvent(chart, e));
    }



    return (
        <div className={styles.vbar}>
            <h2>{props.title}</h2>
            <div className={styles.vbarchart}>
                <Chart
                    ref={chartRef}
                    options={props.options}
                    type='bar'
                    // onClick={props.dataset}
                    data={props.dataset}
                />
            </div>
        </div>
    )
}

export default VBarchart
