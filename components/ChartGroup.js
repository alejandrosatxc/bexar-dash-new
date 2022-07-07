const ChartGroup = (props) => {

    const charts = props.charts //Array of chart objects

    return (
        <div>
            <h2>{props.title}</h2>
            {
                charts.map(chart => {
                    return renderChart(chart, props.data)
                })
            }
        </div>
    )
}

export default ChartGroup