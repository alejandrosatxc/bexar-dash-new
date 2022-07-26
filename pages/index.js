import styles from '../styles/Home.module.css'
import PieChart from '../components/PieChart'
import getMaster from '../lib/master'
import 'chart.js/auto';
import { generateChartDatasets, combineDataPoints } from '../lib/myfuncs'

export async function getStaticProps() {
  const master = await getMaster()
  return ({ props: { master } })
}



export default function Home({ master }) {


  let chartData = require('/keyless.json')
  combineDataPoints(chartData[0], generateChartDatasets(chartData[0].columns, master[6].data))

const options = {
        "barOptions_stacked" : {
            //responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: "Percentage"
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 16
                        },
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Click legend to interact!'
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            var data = context.dataset.data,
                                label = context.dataset.label,
                                currentValue = context.raw
                            var percentage = parseFloat((currentValue).toFixed(1));

                            return label + ": (" + percentage + '%)';
                        }
                    }

                },
                datalabels: {
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 8;
                    },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => {
                            sum += data;
                        });
                        let percentage = (value).toFixed(0) + "%";
                        return percentage;
                    },
                    color: "white"
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
            },
        },

        "pieOptions" : {
            //responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Click legend to interact!'
                },
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
                datalabels: {
                    font: {
                        size: 20
                    },
                    display: function (context) {
                        return context.dataset.data[context.dataIndex] > 4;
                    },
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = Math.round((value / sum) * 100) + "%";
                            return percentage;
                        } else {
                            return percentage;
                        }
                    },
                    color: "white"
                },
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
            },
        }
    }


  return (
    <div className={styles.wrapper}>
        <h2 className={styles.header}>Tap on a button above to see the relevant data</h2>
          <div className={styles.box1}>BexarDash-BOX1</div>
          <div>
            Box222-Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet et vitae omnis, iusto cupiditate commodi
            debitis sunt praesentium quis. Repellendus tenetur expedita eius. Et quos provident architecto numquam vitae
            cumque voluptatem quaerat, delectus recusandae officia nesciunt quod tempore harum dolores nobis neque
            veniam est eveniet dolore assumenda eos culpa! Pariatur, iste nobis, corrupti doloribus optio numquam, eum
            nihil reiciendis deleniti maxime explicabo a harum. Architecto unde vitae pariatur tempora ab veniam
            asperiores, facere quod beatae, sint vero aut dolorem quis.
            Box2-Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet et vitae omnis, iusto cupiditate commodi
            debitis sunt praesentium quis. Repellendus tenetur expedita eius. Et quos provident architecto numquam vitae
            cumque voluptatem quaerat, delectus recusandae officia nesciunt quod tempore harum dolores nobis neque
            veniam est eveniet dolore assumenda eos culpa! Pariatur, iste nobis, corrupti doloribus optio numquam, eum
            nihil reiciendis deleniti maxime explicabo a harum. Architecto unde vitae pariatur tempora ab veniam
            asperiores, facere quod beatae, sint vero aut dolorem quis.</div>
          <div>  <PieChart
                    title={chartData[0].config.data.title}
                    column={chartData[0].columns}
                    masterDataset={master[6]}
                    dataset={chartData[0].config.data}
                    options={options.pieOptions}
                /></div>
          <div > <PieChart
                    title={chartData[0].config.data.title}
                    column={chartData[0].columns}
                    masterDataset={master[6]}
                    dataset={chartData[0].config.data}
                    options={options.pieOptions}
                /></div>
          <div >Box5-Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nam dicta molestiae quo, placeat sapiente
            soluta ducimus aspernatur qui magni distinctio sint nostrum repellendus id rerum, eligendi similique eum
            enim tempora. Asperiores, perspiciatis ex sit inventore maiores deleniti sed in corrupti numquam pariatur
            ipsum mollitia impedit molestias modi nesciunt illo sint vitae tempora sequi id totam voluptate soluta nihil
            explicabo. Quae, eos eaque dolorum ad assumenda, esse eum deserunt nihil tempore debitis autem doloribus
            quas natus pariatur maxime cum unde!
            Box2-Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet et vitae omnis, iusto cupiditate commodi
            debitis sunt praesentium quis. Repellendus tenetur expedita eius. Et quos provident architecto numquam vitae
            cumque voluptatem quaerat, delectus recusandae officia nesciunt quod tempore harum dolores nobis neque
            veniam est eveniet dolore assumenda eos culpa! Pariatur, iste nobis, corrupti doloribus optio numquam, eum
            nihil reiciendis deleniti maxime explicabo a harum. Architecto unde vitae pariatur tempora ab veniam
            asperiores, facere quod beatae, sint vero aut dolorem quis.</div>
    </div>
  )
}
