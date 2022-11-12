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
  import React, { useEffect, useState } from 'react'
import { getStats } from '../../services/orders';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  function Mychart() {
    const [data , setData] = useState(
      {
        labels : [],
        datasets: [
          {
            label: 'orders',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      }
    );
    const getData = async ()=>{
      const stats = await getStats();
      // setLabels(stats.map((stat)=> stat.date));
      // setData(stats.map((stat)=> stat.noOfOrders));
      console.log(stats);
      const labels = stats.map((stat)=> stat.date);
      console.log(labels);
      const compared = stats.map((stat)=> stat.noOfOrders);
      console.log(compared);
      setData({
        labels,
        datasets: [
          {
            label: 'orders',
            data: compared,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
      })
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'orders per day',
          },
        },
    };
    useEffect(()=>{
      getData();
    },[])
    return (
      <Bar options={options} data={data} />
    )
  }
  
  export default Mychart