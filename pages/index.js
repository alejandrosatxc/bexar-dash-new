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
  combineDataPoints(chartData[1], generateChartDatasets(chartData[1].columns, master[6].data))


  const options = {
    "barOptions_stacked": {
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

    "pieOptions": {
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
      {/* <h2 className={styles.header}>Tap on a button above to see the relevant data</h2> */}
      <div className={styles.header}>
        When we equip our communities with knowledge, not only can we make better decisions,
        our voices become more effective and powerful. The data collected by Bexar Facts provided
        community insight into what our voting neighbors think:
        <ul>
          <li>Are the most serious problems facing our City </li>
          <li>About the direction of the City and County</li>
          <li>Regarding the approval of our local leaders, civic organizations and institutions</li>
          <li>Around police relations and reform</li>
          <li>About local government&apos;s response to the pandemic and the winter storm</li>
          <li>About labor challenges</li>
          <li>About the health disparities in our community</li>
        </ul>
      </div>
      <div style={{textAlign: 'center'}}>
        <h3>
          How can Bexar Facts impact public policy? Bexar Facts data creates opportunities to advocate for public
          policy by understanding and use of the data.
        </h3>
        <p>
          Our organization utilizes public opinion polling combined with independent
          demographic research to compile empirical data on issues, attitudes, and
          trends shaping the Greater San Antonio Area. Providing free and accessible
          data to our community and driving civic engagement and participation are cornerstones of our efforts.
        </p>
      </div>
      <div>
        <PieChart
          title={chartData[0].config.data.title}
          column={chartData[0].columns}
          masterDataset={master[6]}
          dataset={chartData[0].config.data}
          options={options.pieOptions}
        />
      </div>
      <div style={{textAlign: 'center'}}>
        <h3>Pandemic Impact on Mental Health</h3>
        <p>
          On May 11, the South Texas Trauma-Informed Care Consortium Honors
          Trauma-Informed Care Month with Events and Training to Support
          Healing From Trauma hosted a a press conference with the City of
          San Antonio, University Health, The Ecumenical Center, The Children&apos;s
          Shelter, Methodist Healthcare Ministries, and Voices for Children, to
          launch a summer awareness campaign to support resilience and trauma-informed
          practices. They specifically referenced a recent Bexar Facts poll, highlighting
          that half of Bexar County residents reported that the pandemic had adversely
          affected their mental health.
        </p>
        <p>
          We were able to amplify  the collective weight of the shared trauma
          of the pandemic that is beginning to be measured, more than a year
          after COVID-19 arrived in the San Antonio community.
        </p>
      </div>
      <div>
        <PieChart
          title={chartData[1].config.data.title}
          column={chartData[1].columns}
          masterDataset={master[6]}
          dataset={chartData[1].config.data}
          options={options.pieOptions}
        />
      </div>
    </div>
  )
}
