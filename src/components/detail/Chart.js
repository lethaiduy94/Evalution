import React from 'react'
import styles from './chart.module.css'
import ChartDataLabels from 'chartjs-plugin-labels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
  );

export default function Chart({average, times}) {
    const labels = ['実装力','企画力','UIデザイン力','プレゼンテーション力','ビジネスマナー'];
    const options = {
        responsive: true,
        maintainAspectRatio:false,
        aspectRatio:0.5,
        scales: {
          y: {
            min: 1,
            max: 5,
          }
        },
        plugins: {
          legend:false,
          title: {
            display: false,
            text: `客項目の${times}回プレゼンテーション平均値`,
          },
          datalabels: {
            color: '#333',
            anchor:'end',
            font: {
              size: 18,
              weight:'bold',
            },
            // formatter: function(value) {
            //   return value + '%';
            // }
          }
        },
      };

      const data = {
        
        labels,
        datasets: [
          {
            label: '評価点',
            data: average,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    return (
        <div className={styles.container}>
            <Bar options={options} data={data} plugins={ChartDataLabels}/>
        </div>
    )
}
