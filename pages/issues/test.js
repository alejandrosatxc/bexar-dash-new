import styles from '../../styles/Home.module.css'
import getMaster from '../../lib/master'
import PieChart from '../../components/PieChart'
import { memes, simplePie, countUnique, getColumn, printDatasetAtEvent, printElementAtEvent, printElementsAtEvent} from '../../lib/myfuncs'


export async function getStaticProps() {
    const master = await getMaster()
    return({props: {master}})
}

export default function test({master}) {
    let setsVotingPlans = simplePie('Q3', master[6].data, 'none')
    let setsAHP = simplePie('Q4', master[6].data, 'none')


    var dataVotingPlans = {
        labels: [
            'In person, on the day of the election',
            'In person, before the day of the election',
            'By mail',
            'Do not plan on voting',
            'I do not know',
        ],
        datasets: [
            {
                label: "",
                data: setsVotingPlans,
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                    'rgb(233, 168, 34)',
                    'rgb(235, 223, 203)',
                  ]
            }
        ]
    }

    var dataAHP = {
        labels: [
            'Yes',
            'No',
            'I do not know'
        ],
        datasets: [ 
            {
                label: "",
                data: [
                    setsAHP[0] + setsAHP[1] + setsAHP[2],
                    setsAHP[3] + setsAHP[4] + setsAHP[5],
                    setsAHP[6]
                ],
                backgroundColor: [
                    'rgb(12, 38, 96)',
                    'rgb(196, 99, 0)',
                    'rgb(66, 116, 200)',
                ]
            }
        ]
    }

    var pieOptions = {
        responsive: true,
        // maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Click legend to interact!'
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function(context){
                      var data = context.dataset.data,
                          label = context.label,
                          currentValue = context.raw,
                          total = 0;
            
                    //   for( var i = 0; i < data.length; i++ ){
                    //     total += data[i];
                    //   }
                       var percentage = parseFloat((currentValue).toFixed(1));
            
                      return label + ": ("  + percentage + '%)';
                    }
                }
            
            },
            datalabels: {
                font: {
                    size: 20
                },
                display: function(context) {
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
            legend:{
                display: true,
                labels: {
                    font: {
                        size: 16
                    }
                }
            },
        },
    }


    return(
        <div className={styles.grid}>
            <PieChart
                title="How do you plan on voting in this year's elections?"
                column="Q3"
                masterDataset={master[6].data}
                dataset={dataVotingPlans}
                options={pieOptions}
            />   
             {/* <PieChart
                title="Would you vote yes or no on a 150 million dollar City of San Antonio bond for Affordable Housing Projects that includes rehabilitating, preserving and producing housing for homeownership or rent, and supportive services for people exiting homelessness?"
                column="Q4"
                masterDataset={master[6].data}
                dataset={dataAHP}
                options={pieOptions}
                dataFunction={() => {
                    
                }}
            />                 */}
        </div>
    )
}